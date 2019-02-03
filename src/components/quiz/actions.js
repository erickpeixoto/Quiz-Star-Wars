import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import {
    FETCH_PEOPLE,
    FETCH_PERSON,
    SET_ANSWER,
    SET_VISUALIZATION
} from './constants'


export function getPeopleApi() {

    return (dispatch, getState) => {
        axios.get('https://swapi.co/api/people/')
            .then(resp => {
                let listPeople = []
                resp.data.results.map((_result, i) => {
                    getImageApi(_result.name, (image) => {
                        _result.perfil = image
                        _result.person = _result.url.split('/')[5]
                        listPeople.push(_result)
                        if ((resp.data.results.length) === (i + 1)) {
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

export function getPersonApi(value) {

    return (dispatch, getState) => {

        let person = {
            details: {},
            specie: {},
            planet: {},
            movies: [],
            vehicles: []
        }

        axios.all([
            axios.get(`https://swapi.co/api/people/${value}/`),
            axios.get(`https://swapi.co/api/species/${value}/`)
        ]).then(axios.spread((peopleRes, speciesRes) => {

            // SETTING DETAILS AND SPECIES DATA
            getImageApi(peopleRes.data.name, (image) => {
                peopleRes.data.perfil = image
            })
                person.details = peopleRes.data
                person.specie = speciesRes.data

            // GETTING DATA PLANET
            axios.get(person.details.homeworld)
                 .then((result) => {

                    person.planet = result.data

                    // GETTING FILMS
                    let promises = []
                    person.details.films.forEach((filmUri) => {
                        promises.push(axios.get(filmUri))
                    })

                    axios.all(promises)
                         .then((results) => {
                            results.forEach((response) => {
                                person.movies.push(response.data.title)
                            })
                    // GETTING VEHICLES
                    promises = []
                    person.details.vehicles.forEach((vehiclesUri) => {
                        promises.push(axios.get(vehiclesUri))
                    })
                    axios.all(promises)
                         .then((results) => {
                            results.forEach((response) => {
                                person.vehicles.push(response.data.name)
                            })
                        // DISPATCHING 
                        dispatch({
                                type: FETCH_PERSON,
                                payload: person
                            })
                })
                           
              })
           })

        }))
    }
}

export function getImageApi(value, callback) {
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${value}`)
        .then(_resp => {
            callback(_resp.data.data[0].images.downsized.url)
        }).catch(e => {
            callback({ error: e })
        })
}




export function getAnswer(value, people, form, callback) {


    // GET ANSWER
    Object.keys(form.values).map((key, index) => {

        // COMPARING NUMBER AS PERSON
        if (value === key.split('_')[1]) {
            callback(form.values[key])
        }
    })
    //CHECK ANSWER

    //THAN, WE'LL CHECK IF THERE IS A VISUALIZATION


}

export function setAnswer(value) {
    return (dispatch, getState) => {
        const { quiz: { people, answers }, form: { inputs } } = getState()
        getAnswer(value, people, inputs, (valueForm) => {

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


export function setVisualization(value) {
    return (dispatch, getState) => {
        const { quiz: { people, visualizations }, form: { inputs } } = getState()
      

            //VISUZALIZATIONS OBJECT UPDATED
            visualizations.push({
                person: value,
                visualized: true
            })

            //DISPATCHING WITH THUNK MIDDLEWARE
            dispatch([{
                type: SET_VISUALIZATION,
                payload: visualizations
            },
            {
                type: FETCH_PEOPLE,
                payload: people
            }])

        

    }
}
