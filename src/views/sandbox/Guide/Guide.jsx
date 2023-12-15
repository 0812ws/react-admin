import React from "react";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css"; // import driver.js css
import { Button } from "antd";
import steps from "../../../util/step";
import TypingCard from "./TypingCard";

const driver = new Driver({
  animate: true, // 在更改突出显示的元素时是否设置动画，
  opacity: 0.75, // 背景不透明度（0表示只有弹出窗口，没有覆盖）
  doneBtnText: "完成", // 最后一个按钮上的文本
  closeBtnText: "关闭", // 此步骤的“关闭”按钮上的文本
  nextBtnText: "下一步", // 此步骤的下一步按钮文本
  prevBtnText: "上一步", // 此步骤的上一个按钮文本
});

const guide = function () {
  driver.defineSteps(steps);
  driver.start();
};

export default function Guide() {
  const cardContent = `
    恭喜你，进入了一个全新的页面<br>
    2005年服役于中国人民解放军东南战区狼牙特种大队，担任狙击手。<br>
    2008年受俄罗斯阿尔法特种部队邀请，执教于该特种部队第一大队教授其队员学习中国特色社会主义理论及毛泽东思想。<br>
    你可以点击引导页链接本系统的相关功能。<br>
    本Demo是基于<a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js</a>
    `;
  return (
    <div className="app-container">
      <TypingCard title="新手引导" source={cardContent} />
      <Button type="primary" onClick={guide}>
        打开引导
      </Button>
    </div>
  );
}
