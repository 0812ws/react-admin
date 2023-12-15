import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Table,
  Tag,
  Modal,
  Popover,
  Switch,
  Tooltip,
  Space,
} from "antd";
const { confirm } = Modal;

export default function RightList() {
  const [dataSource, setdataSource] = useState([]);

  useEffect(() => {
    axios.get("/rights?_embed=children").then((res) => {
      console.log("权限；列表", res.data);
      res.data.forEach((item) => {
        if (item.children.length === 0) {
          delete item.children;
        }
      });

      setdataSource(res.data);
    });
    return () => {};
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      width: 150,
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "权限名称",
      dataIndex: "title",
      align: "center",
      width: 150,
    },
    {
      title: "权限路径",
      dataIndex: "key",
      align: "center",
      width: 150,
      render: (key) => {
        return <Tag color="orange">{key}</Tag>;
      },
    },
    {
      title: "操作",
      align: "center",
      render: (item) => {
        return (
          <div>
            <Space size={"small"}>
              <Tooltip title="删除">
                <Button
                  danger
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => confirmDelete(item)}
                />
              </Tooltip>
              <Popover
                content={
                  <div style={{ textAlign: "center" }}>
                    <Switch
                      checked={item.pagepermisson}
                      onChange={() => switchMethod(item)}
                    ></Switch>
                  </div>
                }
                title="页面配置项"
                trigger={item.pagepermisson === undefined ? "" : "click"}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  disabled={item.pagepermisson === undefined}
                />
              </Popover>
            </Space>
          </div>
        );
      },
    },
  ];

  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
    setdataSource([...dataSource]);
    if (item.grade === 1) {
      axios.patch(`/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    } else {
      axios.patch(`/children/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    }
  };

  const confirmDelete = (item) => {
    console.log(item);
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      content: "删除掉就无法恢复了哦",
      onOk() {
        deleteMethod(item);
      },
      onCancel() {},
    });
  };

  const deleteMethod = (item) => {
    setdataSource(dataSource.filter((data) => data.id !== item.id));
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        scroll={{
          y: "calc(100%-64px)",
        }}
      />
      <div className="watermark" style={{ top: "100px", left: "800px" }}>
        权限管理
      </div>
      <div className="watermark" style={{ top: "400px", left: "800px" }}>
        权限列表
      </div>
    </div>
  );
}
