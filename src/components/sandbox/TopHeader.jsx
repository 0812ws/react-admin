// 头部
import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Avatar, message } from "antd";
import { SketchPicker } from "react-color";
import "./index.scss";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import avatr from "../../assets/images/avatr.jpg";
const { Header } = Layout;

function TopHeader(props) {
  // 动态显隐颜色版
  const [visible, setVisible] = useState(false);
  // 动态是否全屏
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleColorChange = (e) => {
    props.changeColor(e.hex);
  };

  const changeSideColor = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    console.log("visible", visible);
  }, []);

  const changeCollapsed = () => {
    props.changeCollapsed();
  };

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  // 全屏
  const toggleFullscreen = () => {
    console.log("toggleFullscreen");
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          超级管理员
        </a>
      ),
    },
    {
      key: "2",
      danger: true,
      label: "退出",
    },
  ];

  const computedStyle = () => {
    // let styles;
    // if (props.isCollapsed) {
    //   styles = {
    //     width: "calc(100% - 80px)",
    //   };
    // } else {
    //   styles = {
    //     width: "calc(100% - 200px)",
    //   };
    // }
  };

  return (
    <div >
      <Header
        style={{
          padding: "0 16px",
          background: "#fff",
          position: "relative",
        }}
      >
        {/* 控制侧边栏的折叠 */}
        <div className="hamburger-container" style={{ display: "inline" }}>
          {props.isCollapsed ? (
            <MenuUnfoldOutlined onClick={changeCollapsed} />
          ) : (
            <MenuFoldOutlined onClick={changeCollapsed} />
          )}
        </div>

        {/* 全屏 */}
        <div className="fullScreen" onClick={toggleFullscreen}>
          {isFullscreen ? (
            <FullscreenExitOutlined
              style={{ fontSize: "20px" }}
              onClick={() => setIsFullscreen(false)}
            />
          ) : (
            <FullscreenOutlined
              style={{ fontSize: "20px" }}
              onClick={() => setIsFullscreen(true)}
            />
          )}
        </div>

        {/* 下拉菜单 */}
        <div style={{ float: "right", marginRight: "70px" }}>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <Avatar size={40} src={avatr} />
          </Dropdown>
          <span style={{ marginLeft: "10px" }}> 欢迎王帅回来</span>
        </div>

        {/* 颜色取值板 */}
        <div className={`${"pickerColor"} ${visible ? "slide1" : "slide2"}`}>
          <div style={{ cursor: "pointer" }} onClick={changeSideColor}>
            <SettingOutlined style={{ fontSize: "20px" }} />
          </div>
          <div className="clear">
            <SketchPicker onChange={handleColorChange} />
          </div>
        </div>
      </Header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isCollapsed: state.CollApsedReducer.isCollapsed,
  };
};

const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: "change_collapsed",
    };
  },

  changeColor(color) {
    return {
      type: "change_color",
      payload: color,
    };
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopHeader));
