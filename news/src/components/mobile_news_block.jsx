import React,{Component,PropTypes} from "react";
import {render} from "react-dom";
import {Card} from "antd";
import {Link} from "react-router";
import axios from "axios";
export default class MobileNewsBlock extends Component{
  static propTypes={
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
  };

  state={
    news:[]
  };
  componentDidMount(){
    const {type,count}=this.props;
  const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
  axios.get(url)
    .then(response => {
      const news=response.data;
      // console.log(news);
      this.setState({news});
    })
  };
  render (){
    const {news}=this.state;
    const newsList=!news
      ? <Card>没有任何新闻</Card>
      : (
        news.map((news,index) => (
          <Card key={index} className="m_article list-item special_section clearfix">
            <Link to={`news_detail/${news.uniquekey}`}>
              <div className="m_article_img">
                <img src={news.thumbnail_pic_s} alt={news.title} />
              </div>
              <div className="m_article_info">
                <div className="m_article_title">
                  <span>{news.title}</span>
                </div>
                <div className="m_article_desc clearfix">
                  <div className="m_article_desc_l">
                    <span className="m_article_channel">{news.realtype}</span>
                    <span className="m_article_time">{news.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))
      );
    return (
      <div>
        {newsList}
      </div>
    )
  }
}