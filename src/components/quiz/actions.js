import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import {
        FETCH_PEOPLE,
        SET_ANSWER
} from './constants'


export function getPeopleApi(){

    return (dispatch, getState) => {
               axios.get('https://swapi.co/api/people/')
                .then(resp => {
                  

                    let listPeople = []
                        resp.data.results.map((_result, i) => {
                            getImageApi(_result.name, (image) => {
                                _result.perfil = image
                                _result.person = _result.url.split('/')[5]
                                 listPeople.push(_result)
                                 if ((resp.data.results.length) === (i+1)){
                                        dispatch({
                                            type: FETCH_PEOPLE,
                                            payload: listPeople
                                        })
                                    }
                            })
                        })

                 })
                .catch(e => {
                    toastr.error('Atenção', 'Falha durante o processamento das informações')
                })
    }
}

export function getImageApi(value, callback) {
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${value}`)
            .then(_resp => {
                callback(_resp.data.data[0].images.downsized.url)
            }).catch(e => {
                callback({error: e})
            })
}




export function getAnswer(value, people, form, callback) {

    
      // GET ANSWER
        Object.keys(form.values).map( (key, index) => {
            
            // COMPARING NUMBER AS PERSON
            if(value === key.split('_')[1]){
               callback(form.values[key])
            }
        })
        //CHECK ANSWER
        
        //THAN, WE'LL CHECK IF THERE IS A VISUALIZATION

   
}

export function setAnswer(value) {
    return (dispatch, getState) => {
        const { quiz: { people, answers }, form: { inputs } } = getState()
        getAnswer(value, people, inputs, (valueForm)=>{
            
            //ANSWERS OBJECT UPDATED
            answers.push({
                person: value,
                string: valueForm
            })

            //DISPATCHING WITH THUNK MIDDLEWARE
            dispatch([{
                type: SET_ANSWER,
                payload: answers
            },
            {
                type: FETCH_PEOPLE,
                payload: people
            }])
            
        })
       
    }
}
