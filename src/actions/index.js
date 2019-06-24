export const getPosts = (posts_data) => {
    return {
        type: 'GET_POSTS',
        payload: posts_data
    }
}

export const deletePost = (post) => {
    return {
        type: 'DELETE_POST',
        payload: post
    }
}
