// 侧边栏
import React, { useEffect, useState, useCallback } from "react";
import { Layout, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import "./index.scss";
import logo from "../../assets/images/logo.svg";

import {
  UserOutlined,
  InboxOutlined,
  ShoppingOutlined,
  ReadOutlined,
  VideoCameraOutlined,
  SendOutlined,
  CompassOutlined 
} from "@ant-design/icons";
import axios from "axios";
import { connect } from "react-redux";
const { Sider } = Layout;
const { SubMenu } = Menu;

// 模拟数组结构
const menuList = [
  {
    key: "/home",
    title: "首页",
    icon: <UserOutlined />,
  },
  {
    key: "/user-manage",
    title: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user-manage/list",
        title: "用户列表",
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: "/right-manage",
    title: "权限管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/right-manage/role/list",
        title: "角色列表",
        icon: <UserOutlined />,
      },
      {
        key: "/right-manage/right/list",
        title: "权限列表",
        icon: <UserOutlined />,
      },
    ],
  },
];

const iconList = {
  "/home": <InboxOutlined />,
  "/guide": <CompassOutlined />,
  "/user-manage": <UserOutlined />,
  "/right-manage": <ShoppingOutlined />,
  "/news-manage": <ReadOutlined />,
  "/audit-manage": <VideoCameraOutlined />,
  "/publish-manage": <SendOutlined />,
};

// pagepermission--页面权限

function SideMenu(props) {
  const [meun, setMeun] = useState([]);

  useEffect(() => {
    axios.get("/rights?_embed=children").then((res) => {
      setMeun(res.data);
      console.log("meun", meun,res.data);
      // console.log("iconList", iconList["/home"], props);
    });
  }, []);

  const checkPagePersmission = useCallback((item) => {
    // 判断item中pagepermisson属性是否等于1=有权限，or=无权限-就无需渲染
    return item.pagepermisson === 1;
  }, []);

  const renderMenuItems = useCallback(
    (menuList) => {
      return menuList.map((item) => {
        // 此处加入是否渲染该路由-引入判断
        if (checkPagePersmission(item) && item.children?.length > 0) {
          return (
            <SubMenu
              icon={iconList[item.key]}
              key={item.key}
              title={item.title}
            >
              {/* 进行递归 */}
              {renderMenuItems(item.children)}
            </SubMenu>
          );
        }
        return (
          checkPagePersmission(item) && (
            <Menu.Item
              icon={iconList[item.key]}
              key={item.key}
              title={item.title}
            >
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          )
        );
      });
    },
    [meun]
  );

  const selectKeys = [props.location.pathname];
  // 如果刷新前，选中的是子路由，再次刷新时候不会高亮，需要选中其父路由
  const openKeys = ["/" + props.location.pathname.split("/")[1]];
  const sidebarStyle = {
    backgroundColor: props.color, // 侧边栏的背景颜色
  };
  return (
    <Sider
      style={sidebarStyle}
      trigger={null}
      collapsible
      collapsed={props.isCollapsed}
    >
      {/* 解决滚动条问题 */}
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="sidebar-logo-container">
          <img src={logo} className="sidebar-logo" alt="logo" />
          <h1 className="sidebar-title">守时先生</h1>
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            style={{ backgroundColor: "transparent" }}
            mode="inline"
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
            theme="dark"
          >
            {renderMenuItems(meun)}
          </Menu>
        </div>
      </div>
    </Sider>
  );
}

const mapStateToProps = (state) => {
  return {
    isCollapsed: state.CollApsedReducer.isCollapsed,
    color: state.SetColorReducer.color,
  };
};
// 携带两个参数,一个是属性值，一个是方法
export default connect(mapStateToProps, null)(withRouter(SideMenu));
