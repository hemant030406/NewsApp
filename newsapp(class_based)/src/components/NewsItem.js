import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imgUrl, newsUrl, author, date,source } = this.props
        return (
            <>
            <div>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={imgUrl ? imgUrl : "https://images.tijd.be/view?iid=dc:66572028&context=ONLINE&ratio=16/9&width=640&u=1464200700000"} className="card-img-top" alt="..." style={{ height: '12rem' }} />
                    <div className="card-body">
                        <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{left:'89%',top:'2%'}}>{source}..
                        </span>
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {author?author:'Unknown'}</small></p>
                        <p className="card-text"><small className="text-body-secondary">{new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} className="btn btn-primary">Read More...</a>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default NewsItem
