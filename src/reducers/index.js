import { combineReducers } from 'redux'

const INITIAL_STATE = {
    postsToLoad: [4,5,6],
    allPosts: [],
    loadMorePosts: []
}

const posts = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                allPosts: [...action.payload]
            }
        case 'DELETE_POST':
            let newPosts = state.allPosts.filter(post => post.id !== action.payload)
            return {
                ...state,
                allPosts: [...newPosts]
            }
        case 'FETCH_LOADED_POSTS':
            return {
                ...state,
                loadMorePosts: [...state.loadMorePosts, ...action.payload]
            }
        case 'NEXT_POSTS_TO_LOAD':
            return {
                ...state,
                postsToLoad: [...action.payload]
            }
        case 'DELETE_LOADED_POST':
            let newLoadedPosts = state.loadMorePosts.filter(post => post.id !== action.payload)
            return {
                ...state,
                loadMorePosts: [...newLoadedPosts]
            }
        default: 
            return state
    }
}

export default combineReducers({
    posts: posts
})