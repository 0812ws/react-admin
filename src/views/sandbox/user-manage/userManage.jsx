import React, { useState, useEffect } from "react";
import { Map } from "react-amap";

export default function MapComponent() {
  const plugins = [
    "MapType",
    "Scale",
    "OverView",
    "ControlBar", // v1.1.0 新增
    {
      name: "ToolBar",
      options: {
        visible: true, // 不设置该属性默认就是 true
        onCreated(ins) {
          console.log(ins);
        },
      },
    },
  ];

  const pluginProps = {
    enableHighAccuracy: true,
    timeout: 10000,
    showButton: true,
  };

  const events = {
    created: (ins) => {
      console.log(ins, "ins");
    },
    click: () => {
      console.log("You Clicked The Map");
    },
  };
  useEffect(() => {}, []);
  return (
    <div style={{ width: "100%", height: "800px" }}>
      <Map
        viewMode="3D"
        amapkey={"4f2374a6f3a1bf4926da3402586e864a"}
        plugins={plugins}
        events={events}
      >
      </Map>
    </div>
  );
}
