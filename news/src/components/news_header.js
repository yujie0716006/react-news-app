/**
 * 页面的头部组件
 */
import React,{Component} from "react";
import {render} from "react-dom";
import {Link} from "react-router";
import logo from "./images/logo.png";
import axios from "axios";
//需要将从antd中使用的插件都引入其中
import {
  Row, // 行
  Col, // 列,
  Menu, //菜单
  Modal, // 确认框
  Icon, //图标
  Button, //按键
  Tabs, //页签
  Form, //表单
  Input, //输入框
  message, //消息
} from "antd";
// 菜单项组件
const MenuItem = Menu.Item
// 页签项
const TabPane = Tabs.TabPane
// 表单项
const FormItem = Form.Item;
 class NewsHeader extends Component{

  state={
    selectedKey:"top",
    visible:false,  //表示模态框的状态为关闭状态
    username:null
  }

  //当点击导航的时候，改变它的状态
  handleClick = ({key}) => {
    this.setState({
      selectedKey:key
    });
    if(key=="register"){
      this.setState({visible:true})
    }
  }

  //保存用户的信息
  componentDidMount(){
    const username=localStorage.getItem("username");
    this.setState({username});
  };

  //定义一个函数用来表示，模态框的状态变化
  changeModal = (visible) =>{
    this.setState({visible})
  };

  //出来登录/注册的请求,isLogin表示的是是登录还是注册的状态
   handleSubmit = (isLogin) => {
   //  手机标签中输入的数据
     const {username,password,r_userName,r_password,r_confirmPassword}=this.props.form.getFieldsValue();
   //准备url
     let url='http://newsapi.gugujiankong.com/Handler.ashx?';
     if(isLogin){  //表示的是登录的状态
       url+=`action=login&username=${username}&password=${password}`;
     }else{ //表示注册的状态
       url+=`action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
     }
     // 发请求
     axios.get(url)
       .then(response => {
         // 清除输入的数据
         this.props.form.resetFields()

         const result = response.data
         console.log(result);
         if(isLogin) { // 登陆的返回
           if(!result) { // 失败
             message.error('登陆失败, 重新登陆')
           } else { // 成功
             message.success('登陆成功')
             // 读取返回的username/userId
             const username = result.NickUserName
             const userId = result.UserId
             // 更新状态
             this.setState({username})
             // 保存username/userId
             localStorage.setItem('username', username)
             localStorage.setItem('userId', userId)
           }
         } else { // 注册的返回
           // 提示成功
           message.success('注册成功')
         }
       })
     this.setState({changeModal:false});
     }
   //  退出时的操作
   logout = () => {
     //  更新状态
     this.setState({username:null});
     //  清除用户保存的数据
     localStorage.removeItem("username");
     localStorage.removeItem("useId");

   }
  render (){
    const {selectedKey,username,visible}=this.state;
    //显示登录和注册的按钮的状态,他也是在导航菜单里面的
    const userShow=username ? (
      <MenuItem key="login" className="register">
        <Button type="primary">{username}</Button> &nbsp; &nbsp;
        <Link to="/user_center"><Button type="dashed">个人中心</Button></Link>  &nbsp; &nbsp;
        <Button onClick={this.logout}>退出</Button>
      </MenuItem>
    ) : (
      <MenuItem key="register" className="register">
        <Icon type="appstore"/>登录/注册
      </MenuItem>
    );
    const { getFieldDecorator} = this.props.form;
    return (
      //  头部是一行里面有导航
      <header>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <Link to="/" className="logo">
              <img src={logo} alt="logo"/>
              <span>新闻阅读</span>
            </Link>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal"
                  selectedKeys={[selectedKey]}
                  onClick={this.handleClick}
            >
              <MenuItem key="top">
                <Icon type="appstore" />头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore" />社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore" />国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore" />国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore" />娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore" />体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore" />科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore" />时尚
              </MenuItem>
              {/*显示登录注册的按钮信息*/}
              {userShow}
              {/*定义模态框*/}
                <Modal title="用户中心"
                visible={visible}
                onOk={this.changeModal.bind(this,false)}
                onCancel={() =>this.changeModal(false) }
                okText="关闭"
                >
                  {/*模态框中显示的是页签*/}
                  <Tabs type="card">
                    <TabPane tab="登录" key="1">
                      <Form onSubmit={this.handleSubmit.bind(this,true)}>
                        <FormItem label="用户名">
                          {
                            getFieldDecorator("username")(
                              <Input type="text" placeholder="请输入用户名"/>
                            )
                          }
                        </FormItem>
                          <FormItem label="密码">
                            {
                              getFieldDecorator("password")(
                                <Input type="password" placeholder="请输入密码"/>
                              )
                            }
                          </FormItem>
                        <Button type="primary" htmlType="submit">登录</Button>
                      </Form>
                    </TabPane>
                    <TabPane tab="注册" key="2">
                      <FormItem label="注册">
                        {
                          getFieldDecorator("r_userName")(
                            <Input type="text" placeholder="请输入用户名"/>
                          )
                        }
                      </FormItem>
                      <FormItem label="密码">
                        {
                          getFieldDecorator("r_password")(
                            <Input type="password" placeholder="请输入密码"/>
                          )
                        }
                      </FormItem>
                      <FormItem label="确认密码">
                        {
                          getFieldDecorator("r_confirmPassword")(
                            <Input type="password" placeholder="请输入确认密码"/>
                          )
                        }
                      </FormItem>
                      <Button type="primary" htmlType="submit">注册</Button>
                    </TabPane>
                  </Tabs>
                </Modal>
            </Menu>
          </Col>
          <Col span={1}>

          </Col>
        </Row>
      </header>
    )
  }

}
//只有先渲染上去，才会有this.props.form属性
export default Form.create()(NewsHeader);