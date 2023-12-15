import React, { forwardRef, useEffect, useState } from "react";
import { Form, Input, Select, Radio } from "antd";
const { Option } = Select;
// forwardRef它可以让你在父组件中获取到子组件中的DOM节点或实例引用(在父组件中可以使用子组件的方法)
// 例如setFieldsValue方法
const UserForm = forwardRef((props, ref) => {
  // console.log(props, "传递的表单数据");
  const [isDisabled, setisDisabled] = useState(false);

  useEffect(() => {
    setisDisabled(props.isUpdateDisabled);
  }, [props.isUpdateDisabled]);

  useEffect(() => {
    if (props.id) {
      console.log(ref.current?.getFieldsValue(), "获取");
    }
  }, [props.id]);

  let roleId = "";
  let region = "";
  // const {roleId,region}  = JSON.parse(JSON.stringify( localStorage.getItem("token")))
  const roleObj = {
    1: "superadmin",
    2: "admin",
    3: "editor",
  };
  const checkRegionDisabled = (item) => {
    if (props.isUpdate) {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return true;
      }
    } else {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return item.value !== region;
      }
    }
  };

  const checkRoleDisabled = (item) => {
    if (props.isUpdate) {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return true;
      }
    } else {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return roleObj[item.id] !== "editor";
      }
    }
  };

  return (
    <Form
      ref={ref}
      layout="vertical"
      onValuesChange={(value) => {
        console.log(value, "value12");
      }}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: "请输入用户名!" }]}
      >
        <Input />
      </Form.Item>
      {/* 
      <Form.Item name="id" label="测试" initialValue={props.id}>
        <Input />
      </Form.Item> */}

      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="region"
        label="区域"
        rules={isDisabled ? [] : [{ required: true, message: "请选择区域!" }]}
      >
        <Select disabled={isDisabled}>
          {props.regionList.map((item) => (
            <Option
              value={item.value}
              key={item.id}
              disabled={checkRegionDisabled(item)}
            >
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="roleId"
        label="角色"
        rules={[{ required: true, message: "请选择角色!" }]}
      >
        <Select
          onChange={(value) => {
            // console.log(value)
            if (value === 1) {
              setisDisabled(true);
              ref.current.setFieldsValue({
                region: "",
              });
            } else {
              setisDisabled(false);
            }
          }}
        >
          {props.roleList.map((item) => (
            <Option
              value={item.id}
              key={item.id}
              disabled={checkRoleDisabled(item)}
            >
              {item.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="accessLevel" label="是否生效">
        <Radio.Group>
          <Radio value={1}>生效{props.id}</Radio>
          <Radio value={2}>不生效</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
});
export default UserForm;
