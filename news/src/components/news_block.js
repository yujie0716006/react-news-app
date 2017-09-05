/**
 * 中间的新闻块
 */
import React, {Component, PropTypes} from 'react'
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'

export default class NewsBlock extends Component{
  static propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  };
  //表示中间的新闻块为空
  state = {
    newsArr: null
  };
  componentDidMount(){
    const {type,count}=this.props;
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
    axios.get(url)
      .then(response => {
        const newsArr = response.data.map(({uniquekey, title})=> ({uniquekey, title}));
        // 更新状态
        this.setState({newsArr});
      })
  };
  render () {
    const {newsArr} = this.state;
    const contentUI = !newsArr
      ? <h2>没有任何新闻</h2>
      : (
        <ul>
          {
            newsArr.map((news, index) => (
              <li key={index}>
                <Link to={`/news_detail/${news.uniquekey}`}>{news.title}</Link>
              </li>
            ))
          }
        </ul>
      );
    return (
      <Card className="topNewsList">
        {
          contentUI
        }
      </Card>
    )
  }
}