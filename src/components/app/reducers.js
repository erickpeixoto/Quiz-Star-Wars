import {
        HANDLE_SIDEBAR,
        HANDLE_SUSPEND,
        HANDLE_HISTORY,
        HANDLE_API
} from './constants'

const INITIAL_STATE = {
        //   api: 'http://23.239.17.215:8787/api',
          api: 'http://localhost/api',
        history: {},
        services: {
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
        },
        gfsDefault: '2cbc66654704a231b6be54ecb1e739b1',
        sideBar: { open: false },
        suspend: { exec: false }
}
export default (state = INITIAL_STATE, action) => {

        switch (action.type) {
                case HANDLE_SIDEBAR:
                        return { ...state, sideBar: { open: action.payload } }
                case HANDLE_SUSPEND:
                        return { ...state, suspend: { exec: action.payload } }
                case HANDLE_HISTORY:
                        return { ...state, history: action.payload }
                case HANDLE_API:
                        return { ...state, api: action.payload }
                default:
                        return state
        }
}
