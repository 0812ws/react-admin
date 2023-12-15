import React, { Component } from "react";
import { debounce } from "../../../../util/index";
import echarts from "../../../../util/echarts";
import { connect } from "react-redux";

class PieChart extends Component {
  // 获取dom元素
  myref = React.createRef();

  static defaultProps = {
    width: "100%",
    height: "300px",
    styles: {},
    className: "",
  };

  state = {
    chart: null,
  };

  setOptions() {
    const animationDuration = 1500;
    this.state.chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
      },
      calculable: true,
      series: [
        {
          name: "WEEKLY WRITE ARTICLES",
          type: "pie",
          roseType: "radius",
          radius: [15, 95],
          center: ["50%", "38%"],
          data: [
            { value: 320, name: "Industries" },
            { value: 240, name: "Technology" },
            { value: 149, name: "Forex" },
            { value: 100, name: "Gold" },
            { value: 59, name: "Forecasts" },
          ],
          animationEasing: "cubicOut",
          animationDuration,
        },
      ],
    });
  }

  componentDidMount() {
    debounce(this.initChart.bind(this), 300)();
    // 重置
    window.addEventListener("resize", () => this.resize());
  }

  // props改变执行的操作
  componentDidUpdate(nextProps) {
    if (nextProps.isCollapsed !== this.props.isCollapsed) {
      this.resize();
    }
  }

  resize() {
    const chart = this.state.chart;
    if (chart) {
      // 节流-延迟渲染
      debounce(chart.resize.bind(this), 300)();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.resize()); // 移除窗口，变化时重置图表
    this.setState({ chart: null });
  }

  initChart() {
    if (!this.myref.current) {
      return;
    }
    this.setState(
      { chart: echarts.init(this.myref.current, "macarons") },
      () => {
        this.setOptions();
      }
    );
  }

  render() {
    const { styles, width, height } = this.props;
    return <div ref={this.myref} style={{ ...styles, width, height }}></div>;
  }
}
const mapStateToProps = (state) => {
  return {
    isCollapsed: state.CollApsedReducer.isCollapsed,
    color: state.SetColorReducer.color,
  };
};

export default connect(mapStateToProps)(PieChart);
