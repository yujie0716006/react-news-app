/**
 * 页面的结尾组件
 */
import React,{Component} from "react";
import {render} from "react-dom";
import {Row,Col} from "antd";
export default class NewsFooter extends Component{
  render (){
    return (
      <Row>
        <Col span={1}></Col>
        <Col span={22} style={{textAlign:'center',padding:"20px" }}>
          2017新闻资讯
        </Col>
        <Col span={1}></Col>
      </Row>
    )
  }
}