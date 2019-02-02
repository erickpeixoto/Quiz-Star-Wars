import {
        FETCH_PEOPLE
} from './constants'

const INITIAL_STATE = {
        apis: {
                cnpj: {
                        host: 'http://ws.hubdodesenvolvedor.com.br/v2/cnpj/?cnpj=',
                        token: '14141415cQqpibrHoC25531896'
                },
                cep: {
                        host: 'http://ws.hubdodesenvolvedor.com.br/v2/cep/?cep=',
                        token: '14141415cQqpibrHoC25531896'
                },
                crowler: {
                        host: 'http://177.190.150.208/bigua_api/search?query=',
                        token: localStorage.getItem('_t')
                }    
        }
}
        
export default (state = INITIAL_STATE, action) => {

        switch (action.type) {
                default:
                        return state
        }
}
