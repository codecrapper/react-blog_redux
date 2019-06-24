import { combineReducers } from 'redux'

const posts = (state = null, action) => {
    switch(action.type) {
        case 'GET_POSTS':
            return action.payload
        case 'DELETE_POST':
            let newPosts = state.filter(post => post !== action.payload)
            return [...newPosts]
        default: 
            return state
    }
}

export default combineReducers({
    posts: posts
})