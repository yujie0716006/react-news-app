/**
 * 主文件
 */
import React from "react";
import {render} from "react-dom";
import {Router,Route,IndexRoute,hashHistory} from "react-router";
import NewsContainer from "./components/news_container";
import NewsDetail from "./components/news_detail";
import UserCenter from "./components/user_center";
import App from "./components/app";
import MobileApp from "./components/mobile_app.js";
import MobileNewsDetail from "./components/mobile_news_detail";
import MobileNewsContainer from "./components/mobile_news_container";
import MobileUserCenter from"./components/mobile_user_center";
import MediaQuery from "react-responsive";
//设置这个主文件的路由，并将其渲染到页面上面
render((
<div>
  <MediaQuery query='(min-device-width: 1224px)'>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={NewsContainer}/>
        <Route path="/user_center" component={UserCenter}/>
        <Route path="/news_detail/:uniquekey" component={NewsDetail}/>
      </Route>
    </Router>
  </MediaQuery>
  <MediaQuery query='(max-device-width: 1224px)'>
    <Router history={hashHistory}>
      <Route path="/" component={MobileApp}>
        <IndexRoute component={MobileNewsContainer} />
        <Route path="/user_center" component={MobileUserCenter} />
        <Route path="/news_detail/:uniquekey" component={MobileNewsDetail} />
      </Route>
    </Router>
  </MediaQuery>
</div>
),document.getElementById('root'));
