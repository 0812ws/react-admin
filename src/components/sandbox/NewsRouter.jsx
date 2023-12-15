import React from "react";
import RightList from "../../views/sandbox/right-manage/RightList";
import Home from "../../views/sandbox/Home/Home";
import RoleList from "../../views/sandbox/right-manage/RoleList";
import Guide from "../../views/sandbox/Guide/Guide";
import Nopermission from "../../views/sandbox/nopermission/index";
import MapComponent from '../../views/sandbox/user-manage/userManage'
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./index.scss";
import { Spin } from "antd";

function NewsRouter(props) {
  return (
    <Spin size="large" spinning={props.isLoading}>
      <div
        style={{
          padding: 16,
        }}
      >
        <Switch>
          <Route path="/right-manage/role/list" component={RoleList}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/guide" component={Guide}></Route>
          <Route path="/right-manage/right/list" component={RightList}></Route>
          <Route path="/user-manage/list" component={MapComponent}></Route>
          <Redirect from="/" to="/home" exact />
          <Route path="*" component={Nopermission} />
        </Switch>
      </div>
    </Spin>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.LoadingReducer.isLoading,
  };
};

export default connect(mapStateToProps)(withRouter(NewsRouter));
