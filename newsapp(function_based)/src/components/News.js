import React, {useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

   const [articles,setArticles] = useState([]);
   const [loading,setLoading] = useState(true);
   const [page,setPage] = useState(1)
   const [totalResults,setTotalResults] = useState(0)

   const updatepage = async () => {
        props.setProgress(10)
        setLoading(true)
        let data = (await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=95dc82df4409431aa25160e31d486799&page=${page}&pagesize=${props.pageSize}`))
        props.setProgress(30)
        let parseddata = await data.json()
        props.setProgress(60)
        setArticles(parseddata.articles)
        setLoading(false)
        setTotalResults(parseddata.totalResults)
        props.setProgress(100)
    }

    useEffect(() => {
        updatepage()
      }, []);

    
    const fetchMoreData = async () => {
        let data = (await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=95dc82df4409431aa25160e31d486799&page=${page + 1}&pagesize=${props.pageSize}`))
        setPage(page+1)
        let parseddata = await data.json()
        setArticles(articles.concat(parseddata.articles))
        setTotalResults(parseddata.totalResults)
    }

    const capitalise = (ele) => {
        return ele.charAt(0).toUpperCase() + ele.slice(1)
    }

        return (
            <>

                <h1 className='my-3 text-center'>News Headlines</h1>
                <h3 className='my-3 text-center'>{capitalise(props.category)}</h3>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles?articles.length:0}
                    next={fetchMoreData}
                    hasMore={articles?.length !== totalResults}
                    // loader={<Spinner />}
                >
                    <div className='container d-flex justify-content-center align-items-center my-3 mx-5'>
                        <div className='row'>
                            {articles?.map((element) => {
                                return <div key={element.url} className='col-md-4 my-4' >
                                        <NewsItem title={element.title ? element.title.slice(0, 43) : ''} description={element.description ? element.description.slice(0, 58) : ''} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name.slice(0, 7)} />
                                    </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
}

export default News

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
}
News.defaultpropTypes = {
    country: 'in',
    category: 'general',
    pageSize: '15'
}