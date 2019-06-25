import { combineReducers } from 'redux'

const INITIAL_STATE = {
    allPosts: [],
    // loadMorePosts: []
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
        // case 'FETCH_LOADED_POSTS':
        //     return {
        //         ...state,
        //         loadMorePosts: [...state.loadMorePosts, ...action.payload]
        //     }
        default: 
            return state
    }
}

export default combineReducers({
    posts: posts
})