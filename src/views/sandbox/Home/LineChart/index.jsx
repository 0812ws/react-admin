import React, { Component } from "react";
import { debounce } from "../../../../util/index";
import echarts from "../../../../util/echarts";
import { connect } from "react-redux";

class LineChart extends Component {
  constructor(props) {
    super(props);
  }
  // 获取dom元素
  myref = React.createRef();

  // 没有props的时候，会默认使用这个属性
  static defaultProps = {
    width: "100%",
    height: "350px",
    styles: {},
    className: "",
  };

  state = {
    chart: null,
  };

  setOptions({ expectedData, actualData } = {}) {
    this.state.chart.setOption({
      backgroundColor: "#fff",
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        boundaryGap: false,
        axisTick: {
          show: true,
        },
        // min: 0,
        // max: 2000,
        // alignTicks: true,
       
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 10,
        top: 30,
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        padding: [5, 10],
      },
      yAxis: {
        axisTick: {
          show: false,
        },
      },
      legend: {
        data: ["expected", "actual"],
      },
      series: [
        {
          name: "expected",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(30, 144, 255, 1)", // 起始颜色
                },
                {
                  offset: 1,
                  color: "rgba(70, 130, 180, 0)", // 结束颜色
                },
              ],
              global: false, // 缺省为 false
            },
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowBlur: 10,
          },
          lineStyle: {
            color: "#FF005A",
            width: 2,
          },
          smooth: true,
          type: "line",
          data: expectedData,
          animationDuration: 1500,
          animationEasing: "cubicInOut",
        },
        {
          name: "actual",
          smooth: true,
          type: "line",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(30, 144, 255, 1)", // 起始颜色
                },
                {
                  offset: 1,
                  color: "rgba(70, 130, 180, 0)", // 结束颜色
                },
              ],
              global: false, // 缺省为 false
            },
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowBlur: 10,
          },
          areaStyle: {
            color: "#f3f8ff",
          },
          lineStyle: {
            color: "#3888fa",
            width: 2,
          },
          data: actualData,
          animationDuration: 1500,
          animationEasing: "quadraticOut",
        },
      ],
    });
  }

  componentDidMount() {
    debounce(this.initChart.bind(this), 300)();
    // 重置
    window.addEventListener("resize", () => this.resize());
  }

  // 是否需要更新该组件
  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      return true;
    }
    return false;
  }

  // props改变执行的操作
  componentDidUpdate(nextProps) {
    // console.log(nextProps, "nextProps");
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
        this.setOptions(this.props.chartData);
      }
    );
  }

  render() {
    console.log(this.props);
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
export default connect(mapStateToProps)(LineChart);
