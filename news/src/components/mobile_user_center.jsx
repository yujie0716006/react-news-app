import React,{Component} from "react";
import {render} from "react-dom";
import axios from "axios";
import {Tabs,Card} from "antd";
import {Link} from "react-router";
const TabPane=Tabs.TabPane;

export default class MobileUserCenter extends Component{
  state={
    collection:null,
    comments:null
  };
  componentDidMount(){
    const userId=localStorage.getItem("userId");
    console.log(userId);
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
    //发动获取收藏列表的请求
    axios.get(url)
      .then(response => {
        const collection=response.data;
        this.setState({collection});
      });
  //  发动评论列表的请求
    url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    axios.get(url)
      .then(response => {
        const comments=response.data;
        this.setState({comments});
      });
  }
  render (){
    const {collection,comments}=this.state;
    const showCollection=!collection
            ? <h3>还没有收藏的文章，赶快去收藏吧！</h3>
            : (
              collection.map((collections,index) =>{
                <Card key={index} extra={<Link to={`/news_detail/${collections.uniquekey}`}>查看</Link>}>
                  {collections.Title}
                </Card>
              })
      );
    const showComments=!comments
      ? <h3>还没有收藏的评论，赶快去收藏吧！</h3>
      : (
        comments.map((comments,index) =>{
          <Card key={index} extra={<Link to={`/news_detail/${comments.uniquekey}`}>查看</Link>}>
            {comments.Title}
          </Card>
        })
      );
    return (
      <div>
        <Tabs >
          <TabPane tab="我的收藏列表" key="1">
            {showCollection}
          </TabPane>
          <TabPane tab="我的评论列表" key="2">
            {showComments}
          </TabPane>
          <TabPane tab="头像设置" key="3"></TabPane>
        </Tabs>
      </div>
    )
  }
}