import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }
    static defaultpropTypes = {
        country: 'in',
        category: 'general',
        pageSize: '15'
    }

    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResults:0
        }
    }

    async updatepage() {
        this.props.setProgress(10)
        this.setState({ loading: true })
        let data = (await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=95dc82df4409431aa25160e31d486799&page=${this.state.page}&pagesize=${this.props.pageSize}`))
        this.props.setProgress(30)
        let parseddata = await data.json()
        this.props.setProgress(60)
        this.setState({
            articles: parseddata.articles,
            loading: false,
            totalResults: parseddata.totalResults
        })
        this.props.setProgress(100)
    }
    async componentDidMount() {
        this.updatepage()
    }
    
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let data = (await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=95dc82df4409431aa25160e31d486799&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`))
        let parseddata = await data.json()
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalResults: parseddata.totalResults
        })
    }

    capitalise = (ele) => {
        return ele.charAt(0).toUpperCase() + ele.slice(1)
    }

    render() {
        return (
            <>

                <h1 className='my-3 text-center'>News Headlines</h1>
                <h3 className='my-3 text-center'>{this.capitalise(this.props.category)}</h3>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles?this.state.articles.length:0}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles?.length !== this.totalResults}
                    // loader={<Spinner />}
                >
                    <div className='container d-flex justify-content-center align-items-center my-3 mx-5'>
                        <div className='row'>
                            {this.state.articles?.map((element) => {
                                return <div key={element.url} className='col-md-3 my-4' >
                                        <NewsItem title={element.title ? element.title.slice(0, 43) : ''} description={element.description ? element.description.slice(0, 58) : ''} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name.slice(0, 7)} />
                                    </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
