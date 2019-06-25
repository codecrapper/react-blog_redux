export const getPosts = (posts_data) => {
    return {
        type: 'GET_POSTS',
        payload: posts_data
    }
}

export const deletePost = (id) => {
    return {
        type: 'DELETE_POST',
        payload: id
    }
}

export const loadMorePostsAction = (data) => {
    return {
        type: 'LOAD_MORE_POSTS',
        payload: data
    }
}

export const deleteLoadMorePost = (post) => {
    return {
        type: 'DELETE_LOADED_POST',
        payload: post
    }
}
