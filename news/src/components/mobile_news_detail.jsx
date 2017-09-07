import React,{Component} from "react";
import {render} from "react-dom";
import axios from "axios";
import {BackTop} from "antd";
import NewsComments from "./news_comments";
export default class MobileNewsDetail extends Component{
  state={
    newsList:{}
  };
  //根据指定的ID地址，来确定展开新闻的详情
  componentDidMount(){
    const {uniquekey}=this.props.params;
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`;
    axios.get(url)
      .then(response => {
        const newsList=response.data;
        this.setState({newsList});
        console.log(newsList);
      })
  }
  render (){
    const {newsList}=this.state;
    const {uniquekey}=this.props.params;
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html:newsList.pagecontent}}></div>
        <BackTop />
        <NewsComments uniquekey={uniquekey}/>
      </div>
    )
  }
}