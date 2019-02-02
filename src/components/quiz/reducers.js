import {
        FETCH_PEOPLE
} from './constants'

const INITIAL_STATE = {
        people: []
}
export default (state = INITIAL_STATE, action) => {

        switch (action.type) {
                case FETCH_PEOPLE:
                        return { ...state, people:  action.payload }
                default:
                        return state
        }
}
