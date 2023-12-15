import React, { useState } from "react";
import { Row, Col } from "antd";
import CountUp from "react-countup";
import "./index.scss";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js", // 替换成你自己的图标字体链接
});

const chartList = [
  {
    type: "icon-tuichu",
    icon: "user",
    num: 102400,
    color: "#40c9c6",
  },
  {
    type: "icon-facebook",
    icon: "message",
    num: 81212,
    color: "#36a3f7",
  },
  {
    type: "icon-twitter",
    icon: "pay-circle",
    num: 9280,
    color: "#f4516c",
  },
  {
    type: "icon-twitter",
    icon: "shopping-cart",
    num: 13600,
    color: "#f6ab40",
  },
];

const PanelGroup = (props) => {
  return (
    <div className="panel-group-container">
      {/* 每个col之间的间隔为40 */}
      <Row gutter={30} className="panel-group">
        {chartList.map((chart, i) => (
          <Col
            key={i}
            lg={6}
            sm={12}
            xs={12}
            className="card-panel-col"
            onClick={() => props.handleSetLineChartData(chart.type)}
          >
            <div className="card-panel">
              <div className="card-panel-icon-wrapper">
                <IconFont
                  type={chart.type}
                  style={{ fontSize: 55, color: chart.color }}
                />
              </div>
              <div className="card-panel-description">
                <p className="card-panel-text">{chart.type}</p>
                <CountUp end={chart.num} start={0} className="card-panel-num" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PanelGroup;
