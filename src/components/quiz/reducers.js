import {
        FETCH_PEOPLE,
        FETCH_PERSON,
        SET_ANSWER
} from './constants'

const INITIAL_STATE = {
        people: [],
        person: {},
        answers: [],
        visualizations: []
}
export default (state = INITIAL_STATE, action) => {

        switch (action.type) {
                case FETCH_PEOPLE:
                        return { ...state, people:  action.payload }
                case FETCH_PERSON:
                        return { ...state, person: action.payload }
                case SET_ANSWER:
                        return { ...state, answers: action.payload }
                
                default:
                        return state
        }
}
