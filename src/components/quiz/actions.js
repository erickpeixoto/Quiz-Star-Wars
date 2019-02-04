import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import {
    FETCH_PEOPLE,
    FETCH_PERSON,
    SET_ANSWER,
    SET_VISUALIZATION,
    SET_FINISH
} from './constants'



export function getPeopleApi() {

    let ranking = (localStorage.getItem('ranking')) ? JSON.parse(localStorage.getItem('ranking')) : []
        localStorage.setItem('ranking', JSON.stringify((ranking.length) ? ranking : []))
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

    if (form.values){
            // GET ANSWER
            Object.keys(form.values).map((key, index) => {
        
                // COMPARING NUMBER AS PERSON
                if (value === key.split('_')[1]) {
                     people.map((person, i) => {
                        if(value === person.person){
                            callback({
                                person: person,    
                                value:form.values[key]
                            })
                        }
                    })
                }
            })

    }else{
        callback(false)
    }

}

export function setAnswer(value) {
    return (dispatch, getState) => {
        const { quiz: { people, answers, visualizations }, form: { inputs } } = getState()
   
        getAnswer(value, people, inputs, (respForm) => {

            if (respForm){
               
                //GRADE LOGIC
                const checkVisualizationExistence = personParam => visualizations.some(({ person }) => person === personParam)
                const wasVisualized = (checkVisualizationExistence(respForm.person.person)) ? 0.5 : 1
                const gradeBase = 10
                const gradeTest = respForm.person.name.toLowerCase().includes(respForm.value.toLowerCase())

                //ANSWERS OBJECT UPDATED
                answers.push({
                    person: value,
                    string: respForm.value,
                    grade: (gradeTest) ? (gradeBase * wasVisualized) : 0
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
            }else{
                console.error('alklaskdjalksdjalk')
                toastr.error('Atenção', 'Digite o nome corretamente')
            }
      
        })

    }
}


export function setVisualization(value) {
    return (dispatch, getState) => {
        const { quiz: { people, visualizations }, form: { inputs } } = getState()
        const checkVisualizationExistence = personParam => visualizations.some(({ person }) => person === personParam)
      
        //VISUZALIZATIONS OBJECT UPDATED
        if (!checkVisualizationExistence(value)){
            visualizations.push({
                person: value,
                visualized: true
            })
        }
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


export function setFinish(value) {
    return (dispatch, getState) => {
        const { quiz: { people } } = getState()
        
        //IS FINISHING 
        dispatch([{
            type: SET_FINISH,
            payload: true
        },
        {
            type: FETCH_PEOPLE,
            payload: people
        }])
    }
}

export function sum(obj) {
    let sum = 0
    obj.forEach(element => {
        sum += parseFloat(element.grade)
    })
    return sum
}

export function handleDataRanking(values) {
   
    return (dispatch, getState) => {
        
        const { quiz: { answers }, app } = getState()
        
        let ranking = JSON.parse(localStorage.getItem('ranking'))
        console.warn(ranking)
        ranking.push({
            name: values.name,
            email: values.email,
            grade: sum(answers)
        })
        dispatch([{
            type: SET_FINISH,
            payload: false
         },
        {
            type: SET_ANSWER,
            payload: []
        },
         {
            type: SET_VISUALIZATION,
            payload: []
        },
            getPeopleApi(),
            localStorage.setItem('ranking', JSON.stringify(ranking))

        ])
        app.history.push('/')
    }
}

export function resetValuesState() {

    return (dispatch, getState) => {
        dispatch([{
            type: FETCH_PERSON,
            payload: {}
        }
      ])
    }
}


