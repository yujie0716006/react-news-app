// 用来获取评论信息的
import React,{Component,PropTypes} from "react";
import {render} from "react-dom";
import {Form,Card,Input,Button,notification } from "antd";
import axios from "axios";
const FormItem=Form.Item;
class NewsComments extends Component{
  static propTypes={
    uniquekey:PropTypes.string.isRequired
  }
 // 初始化状态指定的是那一条新闻
  state={
    comments:[]
  };
 // 发动请求得到每条新闻的评论
componentDidMount(uniquekey){
   this.upComments(uniquekey);
};
upComments = (uniquekey) => {
  //根据传来的新闻的指定的ID号，可以确定是在哪一条新闻下面的
  // const {uniquekey}=this.props;
  const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`;
  axios.get(url)
    .then(response => {
      //获取到所有的评论信息并重新的更新页面的状态
      const comments=response.data;
      this.setState({comments});
    })
};
componentWillReceiveProps(newprops){
  // console.log(newprops);
  this.upComments(newprops.uniquekey);
};
 //设置提交表单的按钮
  handleSubmit = () => {
    const userId = localStorage.getItem('userId');//从缓存中获取数值，不能用解构赋值
    if(!userId){
      notification.error({
        message:"请先登录在评论"
      });
      return
    };
    const {uniquekey}=this.props;
    const {content}=this.props.form.getFieldsValue();
    console.log(content);
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`;
  axios.get(url)
    .then(response =>{
    //  url时，已经将评论的内容已经提交了,更新页面，将整个页面进行刷新,只更新状态不刷新页面，是没有办法看到新添加上的内容的
      this.componentDidMount();
    //  提示成功的信息
      notification.success({
        message:"成功提交评论"
      });
    //  将输入在文本框中的内容清除
      this.props.form.resetFields();
    })
  };
 //收藏文章的代码处理
  Collention = () => {
    const userId = localStorage.getItem('userId');
    if(!userId){
      notification.error({
        message:"请先登录在评论"
      });
      return
    };
    const {uniquekey}=this.props;
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`;
    axios.get(url)
      .then(response =>{
        //  提示成功的信息
        notification.success({
          message:"成功收藏文章"
        });
      });
  };

 render (){
  const commentsList=this.state.comments.map((comment,index) => (
    <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
      <p>{comment.Comments}</p>
    </Card>
  ));
  const {getFieldDecorator}=this.props.form;
   return (
     <div style={{padding:"10px"}}>
       {commentsList}
       <Form onSubmit={this.handleSubmit}>
         <FormItem label="您的评论">
           {
              getFieldDecorator("content")(
                <Input type="textarea" placeholder="请输入评论的内容："></Input>
              )
           }
         </FormItem>
         <Button type="primary" htmlType="submit">提交评论</Button>
         <Button type="primary" onClick={this.Collention}>收藏该文章</Button>
       </Form>
     </div>
   )
 }
}
export default Form.create()(NewsComments);