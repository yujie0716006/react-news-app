import React,{Component} from "react";
import {render} from "react-dom";
import {Link} from "react-router";
import logo from "./images/logo.png";
import axios from "axios";
import {Modal,Button,Icon,Form,Tabs,Input,message} from "antd";
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;
class MobileNewsHeader extends Component{
  state={
    username:null,
    visible:false,
    isRegister:""
  };
  //设置showModal的显示与隐藏
  showModal = (visible) => {
    this.setState({visible});
  };
  //获取用户的注册和登录信息
  componentDidMount(){
    const username=localStorage.getItem("username");
    this.setState({username});
  }
  //设置登录/注册的代码
  submit = (isRegister,event) => {
  //  取消默认行为
    event.preventDefault();
  //  设置登录或是注册的代码
    const {username,password,r_username,r_password,rr_password}=this.props.form.getFieldsValue;
    const action=isRegister ? "register" : "login";
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}
    &r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${rr_password}`;
    axios.get(url)
      .then(response => {
        const result = response.data;
        if (isRegister) {
          message.success('注册成功')
        } else {
          if (!result) { //登陆失败
            message.error('登陆失败')
          } else {
            message.success('登陆成功');
            const userId = result.UserId;
            const username = result.NickUserName;
            //更新状态
            this.setState({username});
            //保存到localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username)
          }
        }
      })
    this.showModal(false);
  };
  change = () => {
    this.props.form.resetFields();
  };

  render (){
    const {visible,username}=this.state;
    const {getFieldDecorator}=this.props.form;
    const icon=!username
          ? (<Icon type="setting" onClick={()=>this.showModal(true)}/>)
          :(
        <Link to='/user_center'>
          <Icon type="bars" />
        </Link>
      );

    return (
     <div id="mobileheader">
       <header>
         <Link to="/">
           <img src={logo} alt="logo"/>
           <span>新闻阅读</span>
         </Link>
         <i id="i">
           {icon}
         </i>
       </header>
       <Modal
         title="用户中心"
         visible={visible}
         onOk={this.showModal.bind(this,false)}
         onCancel={() =>this.showModal(false)}
         okText="关闭"
       >
         <Tabs type="card" onChange={this.change}>
           <TabPane tab="登录" key="1">
             <Form onSubmit={this.submit.bind(this,false)}>
               <FormItem label="用户名">
                 {
                    getFieldDecorator("username")(
                      <Input type='text' placeholder="请输入用户名"/>
                    )
                 }
               </FormItem>
               <FormItem label="密码">
                 {
                   getFieldDecorator("password")(
                     <Input type='password' placeholder="请输入用户密码"/>
                   )
                 }
               </FormItem>
               <Button type="primary" htmlType="submit">登录</Button>
             </Form>
           </TabPane>
           <TabPane tab="注册" key="2" >
             <Form onSubmit={this.submit.bind(this,true)}>
               <FormItem label="用户名">
                 {
                   getFieldDecorator("r_username")(
                     <Input type='text' placeholder="请输入用户名"/>
                   )
                 }
               </FormItem>
               <FormItem label="密码">
                 {
                   getFieldDecorator("r_password")(
                     <Input type='password' placeholder="请输入用户密码"/>
                   )
                 }
               </FormItem>
               <FormItem label="确定密码">
                 {
                   getFieldDecorator("rr_password")(
                     <Input type='password' placeholder="请输入确认密码"/>
                   )
                 }
               </FormItem>
               <Button type="primary" htmlType="submit">注册</Button>
             </Form>
           </TabPane>
         </Tabs>
       </Modal>
     </div>
    )
  }
}
export default Form.create()(MobileNewsHeader);