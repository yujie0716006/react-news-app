/**
 * 默认的页面显示
 */
import React,{Component} from "react";
import {render} from "react-dom";
import carousel_1 from "./images/carousel_1.jpg";
import carousel_2 from "./images/carousel_2.jpg";
import carousel_3 from "./images/carousel_3.jpg";
import carousel_4 from "./images/carousel_4.jpg";
import NewsBlock from "./news_block";
import NewsImageBlock from "./news_image_block";
import NewsProducts from "./news_products";

import {Row,Col,Carousel,Tabs } from "antd";
const TabPane=Tabs.TabPane;
export default class NewsContainer extends Component{
  render (){
    return(
     <div>
       <Row className="container">
         <Col key="1" span={1}></Col>
         <Col key="2" span={22}>
           <div className="leftContainer" style={{width:"35%"}}>
             <Carousel autoplay>
               <div><img src={carousel_1}/></div>
               <div><img src={carousel_2}/></div>
               <div><img src={carousel_3}/></div>
               <div><img src={carousel_4}/></div>
             </Carousel>
             <NewsImageBlock type="guoji" count={6}
             cardTitle="国际新闻" cardWidth="100%" imageWidth="112px"></NewsImageBlock>
           </div>
           <Tabs className='tabs_news' style={{width:"35%"}}>
             <TabPane tab="头条新闻" key="top">
               <NewsBlock type="top" count={21}></NewsBlock>
             </TabPane>
             <TabPane tab="国际新闻" key="guoji">
               <NewsBlock type="guoji" count={21}></NewsBlock>
             </TabPane>
           </Tabs>

           <Tabs style={{width:"30%"}}>
             <TabPane key="1" tab="React News产品">
               <NewsProducts></NewsProducts>
             </TabPane>
           </Tabs>

           <div>
             <NewsImageBlock type="guonei" count={8}
             cardTitle="国内新闻" cardWidth="100%" imageWidth="132px"></NewsImageBlock>
             <NewsImageBlock type="yule" count={16} cardTitle="娱乐新闻" cardWidth="100%" imageWidth='132px'></NewsImageBlock>
           </div>
         </Col>
         <Col key="3" span={1}></Col>
       </Row>
     </div>
    )
  }
}