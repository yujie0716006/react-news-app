/**
 * 显示的新闻
 */
import React, {Component} from 'react'
import {Row,Col,BackTop} from "antd";
import axios from "axios";
import NewsImageBlock from "./news_image_block";
import NewsComments from "./news_comments";
export default class NewsDetail extends Component{
//  这是显示新闻详情的界面，首先要设置选中的是那条新闻的状态
  state={
    news:{}
  };
//  一渲染完页面，就发动ajax请求
  componentDidMount(){
    const {uniquekey}=this.props.params;
  this.sendAjax(uniquekey);
};
  sendAjax = (uniquekey) => {
    // const {uniquekey}=this.props.params;
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`;
//  发送ajax请求，获取新闻详情的信息
    axios.get(url)
      .then(response => {
        //获取到了点击的新闻事件，并要更新状态，将新闻的界面显示为点击的信息
        const news=response.data;
        // console.log(news);
        this.setState({news});
        document.title=news.title;
      })
  };
  //因为页面第一次进行渲染的时候，只发送一次AJAX请求，所以当我们点击其他的新闻的时候，属性值会有变化的此时用会有新的属性
  //这样就可以每次都调用发送ajax请求,其中newprop指代的就是this.props中的全部属性
  componentWillReceiveProps(newProp){
    console.log("----"+newProp);
    this.sendAjax(newProp.params.uniquekey);
  }
render (){
 const {news}=this.state;
 const {uniquekey}=this.props.params;
  return (
    <div>
      <Row>
        <Col key="1" span={1}></Col>
        <Col key="2" span={16}>
          <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
          <NewsComments uniquekey={uniquekey}></NewsComments>
        </Col>
        <Col key="3" span={6}>
          <NewsImageBlock type="top" count={40} cardTitle="相关新闻" cardWidth="100%" imageWidth='150PX'></NewsImageBlock>
        </Col>
        <Col key="4" span={1}></Col>
      </Row>
      <BackTop/>
    </div>
  )
}
}