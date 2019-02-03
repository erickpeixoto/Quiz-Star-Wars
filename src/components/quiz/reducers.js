import {
        FETCH_PEOPLE,
        FETCH_PERSON,
        SET_ANSWER,
        SET_VISUALIZATION,
        SET_FINISH
} from './constants'

const INITIAL_STATE = {
        people: [],
        person: {},
        answers: [],
        visualizations: [],
        finished: false
}

export default (state = INITIAL_STATE, action) => {

        switch (action.type) {
                case FETCH_PEOPLE:
                        return { ...state, people:  action.payload }
                case FETCH_PERSON:
                        return { ...state, person: action.payload }
                case SET_ANSWER:
                        return { ...state, answers: action.payload }
                case SET_VISUALIZATION:
                        return { ...state, visualizations: action.payload }
                case SET_FINISH:
                        return { ...state, finished: action.payload }
                default:
                        return state
        }
}
