import React, { Component } from "react";
import { debounce } from "../../../../util/index";
import echarts from "../../../../util/echarts";
import { connect } from "react-redux";

class BarChart extends Component {
  constructor(props) {
    super(props);
  }
  // 获取dom元素
  myref = React.createRef();

  // 没有props的时候，会默认使用这个属性
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
      grid: {
        top: 10,
        left: "2%",
        right: "2%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "pageA",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration,
        },
        {
          name: "pageB",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration,
        },
        {
          name: "pageC",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: [30, 52, 200, 334, 390, 330, 220],
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
export default connect(mapStateToProps)(BarChart);
