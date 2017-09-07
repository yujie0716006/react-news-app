/**
 * 用户中心
 */
import React,{Component} from "react";
import {render} from "react-dom";
import {Row,Col,Tabs,Card,Upload, Icon, Modal} from "antd";
import axios from "axios";
import {Link} from "react-router";
const TabPane=Tabs.TabPane;

export default class UserCenter extends Component{
  state={
      isCollect:null,
      isComments:null,
      //上传图片的状态
      previewVisible: false,//图片是否预览
      previewImage: '',
      fileList: [{  //图片的路径及内容
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    };

componentDidMount(){
  //请求收藏的列表
  const userId=localStorage.getItem('userId');
  let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
  axios.get(url)
    .then(response =>{
    //  获取用户收藏的所有信息,这个API借口的作用就是发送请求，返回的值就是所有的信息对象
      const isCollect=response.data;
      console.log(isCollect);
      this.setState({isCollect});
    });
//  请求评论的列表
   url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
  axios.get(url)
    .then(response =>{
      //  获取用户收藏的所有信息,这个API借口的作用就是发送请求，返回的值就是所有的信息对象
      const isComments=response.data;
      console.log(isComments);
      this.setState({isComments});
    });
}
  //图片是否预加载的代码
  handleCancel = () => this.setState({ previewVisible: false });
  //寻找图片的路径并显示
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  handleChange = ({ fileList }) => this.setState({ fileList });
  render (){
    const {isCollect,isComments,previewVisible, previewImage, fileList}=this.state;
    const {uniquekey}=this.props.params;

    //指定收藏的列表
    const myCollection= !isCollect
      ? <h2>暂时还没有收藏，赶快去收藏吧</h2>
      : (
          isCollect.map((collectList,index) => (
            <Card key={index} title={collectList.uniquekey}
                  extra={<Link to={`/news_detail/${collectList.uniquekey}`}>查看</Link>}>
                  <p>{collectList.Title}</p>
            </Card>
          ))
      );
    //指定评论的列表
    const myComments= !isComments
      ? <h2>暂时还没有收藏的评论，赶快去评论吧</h2>
      : (
        isComments.map((commentList,index) => (
          <Card key={index} title={commentList.uniquekey}
                extra={<Link to={`/news_detail/${commentList.uniquekey}`}>查看</Link>}>
            <p>{commentList.Comments}</p>
          </Card>
        ))
      );
    //  显示图片的一些设置
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Row>
          <Col key="1" span={1}></Col>
          <Col key="2" span={22}>
            <Tabs>
              <TabPane tab="我的收藏的列表" key="1">
                {myCollection}
              </TabPane>
              <TabPane tab="我的评论的列表" key="2">
                {myComments}
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div>
                  <Upload
                    action="http://jsonplaceholder.typicode.com/photos"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col key="3" span={1}></Col>
        </Row>
      </div>
    )
  }
}