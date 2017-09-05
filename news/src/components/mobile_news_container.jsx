import React,{Component} from "react";
import {render} from "react-dom";
import {Tabs,Carousel} from "antd";
import carousel_1 from "./images/carousel_1.jpg";
import carousel_2 from "./images/carousel_2.jpg";
import carousel_3 from "./images/carousel_3.jpg";
import carousel_4 from "./images/carousel_4.jpg";
import MobileNewsBlock from "./mobile_news_block";
const TabPane=Tabs.TabPane;
export default class MobileNewsContainer extends Component{
  state={
    key:"top",
  };
//  更新选定的新闻的主题
changeState = (key) => {
  this.setState({key})
};
  render (){
    const {key}=this.state;
    return (
        <Tabs selectedKeys={[key]} onChange={this.changeState}>
          <TabPane tab="头条" key="top">
            <Carousel autoplay>
              <div><img src={carousel_1} alt="1"/></div>
              <div><img src={carousel_2} alt="1"/></div>
              <div><img src={carousel_3} alt="1"/></div>
              <div><img src={carousel_4} alt="1"/></div>
            </Carousel>
            <MobileNewsBlock type="top" count={21}/>
          </TabPane>
          <TabPane tab="社会" key="shehui">
            <MobileNewsBlock type="shehui" count={21}/>
          </TabPane>
          <TabPane tab="国内" key="guonei">
            <MobileNewsBlock type="guonei" count={21}/>
          </TabPane>
          <TabPane tab="国际" key="guoji">
            <MobileNewsBlock type="guoji" count={21}/>
          </TabPane>
          <TabPane tab="娱乐" key="yule">
            <MobileNewsBlock type="yule" count={21}/>
          </TabPane>
        </Tabs>
    )
  }
}