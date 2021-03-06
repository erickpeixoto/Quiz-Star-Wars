import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import app from '../app/reducers'
import quiz from '../quiz/reducers'


const appReducer = combineReducers({
    app,
    quiz,
    form: formReducer,
    toastr: toastrReducer
})



const rootReducer = (state, action) => {
 return appReducer(state, action)
}


export default rootReducer