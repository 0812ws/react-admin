// 面包屑
import React, {  useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import {  withRouter } from "react-router-dom";
// 模拟数组结构
const menuList = [
  {
    key: "/home",
    title: "首页",
  },
  {
    key: "/guide",
    title: "引导页",
  },
  {
    key: "/user-manage",
    title: "用户管理",
    children: [
      {
        key: "/user-manage/list",
        title: "用户列表",
      },
    ],
  },
  {
    key: "/right-manage",
    title: "权限管理",
    children: [
      {
        key: "/right-manage/role/list",
        title: "角色列表",
      },
      {
        key: "/right-manage/right/list",
        title: "权限列表",
      },
    ],
  },
];

const getPath = (menuList, pathname) => {
  let temppath = [];
  try {
    function getNodePath(node) {
      temppath.push(node);
      //找到符合条件的节点，通过throw终止掉递归
      if (node.key === pathname) {
        throw new Error("GOT IT!");
      }
      if (node.children && node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        temppath.pop();
      } else {
        //找到叶子节点时，删除路径当中的该叶子节点
        temppath.pop();
      }
    }
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i]);
    }
  } catch (e) {
    return temppath;
  }
  // 如果没有找到符合条件的节点，则返回空数组
  return [];
};

const BreadMenu = (props) => {
  const [path, setPath] = useState([]);
  useEffect(() => {
    const currentPath = getPath(menuList, props.location.pathname);
    if (currentPath.length > 0 && currentPath[0].title.trim() !== "首页") {
      currentPath.unshift({ key: "/home", title: "首页" });
    }
    // console.log("currentPath", currentPath);
    setPath(currentPath);
  }, [props.location.pathname]);

  return (
    <div style={{ padding: "16px 16px 0" }}>
      <Breadcrumb>
        {path &&
          path.map((item) =>
            item.title === "首页" ? (
              <Breadcrumb.Item key={item.key}>
                <a href={`#${item.key}`}>{item.title}</a>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={item.key}>{item.title}</Breadcrumb.Item>
            )
          )}
      </Breadcrumb>
    </div>
  );
};

export default withRouter(BreadMenu);
