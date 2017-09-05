/**
 * 页面中的主体显示，展现页面
 */
import React,{Component} from "react";
import {render} from "react-dom";
import NewsHeader from "./news_header";
import NewsFooter from "./news_footer";
import "../componentCss/pc.css";
export default class App extends Component{
  render (){
    return (
      <div>
        <NewsHeader/>
        {/*中间是显示新闻的主体部分，指代在APP路由下面的子路由*/}
        {this.props.children}
        <NewsFooter/>
      </div>
    )
  }
}
