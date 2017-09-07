import React,{Component} from "react";
import {render} from "react-dom";
import axios from "axios";
import {Tabs,Card,Upload, Icon, Modal} from "antd";
import {Link} from "react-router";
const TabPane=Tabs.TabPane;

export default class MobileUserCenter extends Component{
  state={
    collection:null,
    comments:null,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]
  };
  componentDidMount(){
    const userId=localStorage.getItem("userId");
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
    //发动获取收藏列表的请求
    axios.get(url)
      .then(response => {
        const collection=response.data;
        this.setState({collection});
        console.log(collection);
      });
  //  发动评论列表的请求
    url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    axios.get(url)
      .then(response => {
        const comments=response.data;
        this.setState({comments});
        console.log(comments);
      });
  };
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
    const {collection,comments,previewVisible, previewImage, fileList}=this.state;
    let showCollection=!collection
            ? (<h3>还没有收藏的文章，赶快去收藏吧！</h3>)
            : (
              collection.map((collections,index) =>(
                <Card key={index} title={collections.uniquekey}  extra={<Link to={`/news_detail/${collections.uniquekey}`}>查看</Link>}>
                 <p> {collections.Title}</p>
                </Card>
              ))
      );
    let showComments=!comments
      ? <h3>还没有收藏的评论，赶快去收藏吧！</h3>
      : (
        comments.map((comments,index) =>(
          <Card key={index} title={comments.uniquekey} extra={<Link to={`/news_detail/${comments.uniquekey}`}>查看</Link>}>
            <p>{comments.Comments}</p>
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
        <Tabs >
          <TabPane tab="我的收藏列表" key="1">
            {showCollection}
          </TabPane>
          <TabPane tab="我的评论列表" key="2">
            {showComments}
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
      </div>
    )
  }
}