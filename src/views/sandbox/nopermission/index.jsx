import React from "react";
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

export default function Nopermission(props) {
  const history = useHistory();

  const backHome = () => {
    // props.history.push("/home");
    history.push("/home");
  };

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={backHome}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}
