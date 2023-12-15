import React, { Component } from "react";
import { debounce } from "../../../../util/index";
import echarts from "../../../../util/echarts";
import { connect } from "react-redux";

class RaddarChart extends Component {
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
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      radar: {
        radius: "66%",
        center: ["50%", "42%"],
        splitNumber: 8,
        splitArea: {
          areaStyle: {
            color: "rgba(127,95,132,.3)",
            opacity: 1,
            shadowBlur: 45,
            shadowColor: "rgba(0,0,0,.5)",
            shadowOffsetX: 0,
            shadowOffsetY: 15,
          },
        },
        indicator: [
          { name: "Sales", max: 10000 },
          { name: "Administration", max: 20000 },
          { name: "Information Techology", max: 20000 },
          { name: "Customer Support", max: 20000 },
          { name: "Development", max: 20000 },
          { name: "Marketing", max: 20000 },
        ],
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Allocated Budget", "Expected Spending", "Actual Spending"],
      },
      series: [
        {
          type: "radar",
          symbolSize: 0,
          areaStyle: {
              shadowBlur: 13,
              shadowColor: "rgba(0,0,0,.2)",
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: "Allocated Budget",
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: "Expected Spending",
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: "Actual Spending",
            },
          ],
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

export default connect(mapStateToProps)(RaddarChart);
