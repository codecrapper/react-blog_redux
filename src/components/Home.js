import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts, deletePost } from '../actions'

const Home = ({ getPosts, deletePost, allPosts }) => {

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let request = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        let data = await request.json()
        getPosts(data)
    }

    const deleteClick = (post) => {
        deletePost(post)
    }

    const renderData = () => {
        if(allPosts) {
            return allPosts.map(post => {
                return (
                    <div className="post card" key={post.id}>
                        <div className="card-content">
                            <Link to={`/${post.id}`}><span className="card-title">{post.title}</span></Link>
                            <p>{post.body}</p>
                            <button
                                onClick={() => deleteClick(post)} 
                                style={{marginTop: "10px"}} 
                                className="btn waves-effect waves-light red"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })
        }
        return <div className="center">Loading...</div>
    }

    return (
        <div className="container">
            <h4 className="center">Home</h4>
            {renderData()}
            <button 
                style={{display: 'block',margin: 'auto'}} 
                className="btn waves-effect waves-light"
            >
                Load more
            </button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allPosts: state.posts
    }
}

export default connect(mapStateToProps, { getPosts, deletePost })(Home)