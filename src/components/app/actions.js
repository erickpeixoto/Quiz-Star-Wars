import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import {
        FETCH_PEOPLE
} from './constants'

export function getPeopleApi(value){

    return (dispatch, getState) => {
        // const { settings, supplier: { one }  } = getState(),
        //     url = `${settings.services.cnpj.host}${value}&token=${settings.services.cnpj.token}`
        // if (value.length === 18){
        //     axios.get(url)
        //         .then(resp => {
        //             if (resp.data.status){
        //                 dispatch([
        //                     initialize('access', {
        //                         registry: resp.data.result.numero_de_inscricao,
        //                         name: resp.data.result.fantasia,
        //                         perfil: one.perfil,
        //                         address: [{
        //                             zip: resp.data.result.cep,
        //                             street: `${resp.data.result.logradouro} - ${resp.data.result.complemento}`,
        //                             number: resp.data.result.numero,
        //                             city: resp.data.result.municipio,
        //                             neighborhood: resp.data.result.bairro,
        //                             state: resp.data.result.uf,

        //                         }]
        //                     })
        //                 ])
        //             }else{
        //                 toastr.error('Atenção', 'Parâmetro Inválido para o CNPJ')
        //             }
        //          })
        //         .catch(e => {
        //             toastr.error('Atenção', 'Falha durante o processamento das informações')
        //         })
        // }
      
    }
}


