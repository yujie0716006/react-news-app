import React,{Component,PropTypes} from "react";
import {render} from "react-dom";
import axios from "axios";
import {Card,Form,Button,Input} from "antd";
const FormItem=Form.Item;
 class MobileComments extends Component{
  static propTypes={
    uniquekey:PropTypes.number.isRequired
  };

  state={
    comments:[]
  };
  componentDidMount(){
    const {uniquekey}=this.props;
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`;
    axios.get(url)
      .then(response =>{
        const comments=response.data;
        this.setState({comments});
        console.log(comments);
      })
  };
   //设置提交评论
   upDate = () => {
     const {uniquekey,comment}=this.state;
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=512&uniquekey=${uniquekey}&commnet=testtest`
   };

  render (){
    const {comments}=this.state;
    const {getFieldDecorator}=this.props.form;
    return (
      <div>
        <div style={{padding:"10px"}}>
          {
            comments.map((comment,index) => (
              <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
                <p>{comment.Comments}</p>
              </Card>
            ))
          }
        </div>
        <Form>
          <FormItem label="你的评论">
            {
              getFieldDecorator("comment")(
                <Input type="textarea" placeholder="请输入评论的内容："/>
              )
            }
          </FormItem>
          <button type="primary" onClick={this.upDate}>提交</button> &nbsp; &nbsp;
          <button type="primary" onClick={this.collection}>收藏这篇文章</button>
        </Form>
      </div>

    )
  }
}
export default Form.create()(MobileComments);