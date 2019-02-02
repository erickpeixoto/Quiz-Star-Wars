import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import app from '../app/reducers'


const appReducer = combineReducers({
    settings: app,
    form: formReducer,
    toastr: toastrReducer
})


const initialState = appReducer({}, {})

const rootReducer = (state, action) => {

    // here, we can to implement action for Sign Out
    if (action.type === '__MODEL_SIGN_OUT__') {
        state = initialState
    }
 return appReducer(state, action)
}


export default rootReducer