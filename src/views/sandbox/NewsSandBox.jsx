import React, { useEffect } from "react";
import { Layout } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./NewsSandBox.css";
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import NewsRouter from "../../components/sandbox/NewsRouter";
import BreadMenu from "../../components/sandbox/BreadMenu";
const { Content } = Layout;

export default function NewsSandBox() {
  NProgress.start();
  useEffect(() => {
    NProgress.done();
  });
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout
        className="site-layout-background"
        style={{
          minHeight: 280,
          overflow: "auto",
        }}
      >
        <TopHeader></TopHeader>
        <BreadMenu></BreadMenu>
        <Content>
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout>
  );
}
