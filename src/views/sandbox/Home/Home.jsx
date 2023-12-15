import React, { useState } from "react";
import "./index.scss";
import { Row, Col } from "antd";
import PanelGroup from "./PanelGroup/index";
import LineChart from "./LineChart/index";
import RaddarChart from "./RaddarChart/index";
import PieChart from "./PieChart/index";
import BarChart from "./BarChart/index";
const lineChartDefaultData = {
  "New Visits": {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
};

export default function Home() {
  const handleSetLineChartData = (type) => {
    console.log(type, "type");
  };

  const [lineChartData, setLineChartData] = useState(
    lineChartDefaultData["New Visits"]
  );

  return (
    <div className="app-container">
      <PanelGroup handleSetLineChartData={handleSetLineChartData} />
      <LineChart
        chartData={lineChartData}
        styles={{
          padding: 12,
          backgroundColor: "#fff",
          marginBottom: "25px",
        }}
      />

      <Row gutter={22}>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <RaddarChart />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <PieChart />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <BarChart />
          </div>
        </Col>
      </Row>
    </div>
  );
}
