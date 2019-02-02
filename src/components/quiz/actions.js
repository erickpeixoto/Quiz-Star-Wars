import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import {
        FETCH_PEOPLE
} from './constants'

export function getPeopleApi(){

    return (dispatch, getState) => {
               axios.get('https://swapi.co/api/people/')
                .then(resp => {
                  

                    let listPeople = []
                        resp.data.results.map((_result, i) => {
                            getImageApi(_result.name, (image) => {
                                _result.perfil = image
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


