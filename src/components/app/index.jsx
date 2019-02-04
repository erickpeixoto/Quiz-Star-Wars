import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleHistory } from './actions'

import './public/styles/app.css'
import './public/styles/toastr.css'
import Helmet from 'react-helmet'
import Messages from './messages/toastr'

import { injectGlobal } from 'styled-components'
import mainFont from './public/fonts/Poiret_One/PoiretOne-Regular.ttf'
import fontComfortaa from './public/fonts/Comfortaa/Comfortaa-Regular.ttf'
import fontComfortaaBold from './public/fonts/Comfortaa/Comfortaa-Bold.ttf'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'



/* eslint no-unused-expressions: 0 */
injectGlobal`
    @font-face {
      font-family: 'Poiret One';
      src: url(${mainFont}) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
      @font-face {
      font-family: 'Comfortaa-Regular';
      src: url(${fontComfortaa}) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
      @font-face {
      font-family: 'Comfortaa-Bold';
      src: url(${fontComfortaaBold}) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
   `;

class App extends Component {

    componentWillMount() {
        console.warn('Montou')
        const { handleHistory } = this.props
        handleHistory(this.props.history)

      }

    render() {
        return (
            <section>
                <Grid container spacing={24}>
                    <Grid item xs={12} className={'centerAlign'}>
                        <Grid item xs={12}>
                            <span className="logo">Quiz Star Wars</span> 
                        </Grid>
                        <Grid item xs={12}>
                            <img src={require('./public/images/darth_vader.png')} alt="Quiz Star Wars"/>
                        </Grid>
                        <Grid item xs={12} className="box-instructions">
                            <p> Bem-Vindo ao <strong>Quiz</strong> sensação do momento. </p>
                            <p> Tente responder o nome do máximo de personagens, testando sua memória e a melhorando ao mesmo tempo :) </p>
                            <p><span className="show-me">Regras: </span></p>
                             <ul class="mdc-list">
                                <li class="mdc-list-item" tabindex="0">
                                    <span class="mdc-list-item__text"> * Você terá<span className="show-me">2 (dois)</span>minutos para responder o nome dos personagens</span>
                                </li>
                                <li class="mdc-list-item">
                                    <span class="mdc-list-item__text">* Para cada acerto, você receberá 10 pontos</span>
                                </li>
                                <li class="mdc-list-item">
                                    <span class="mdc-list-item__text">Caso você opte por uma ajudinha clicando em: <span className="show-me">"Detalhes"</span>, sua resposta correta passa a valer 5 pontos </span>
                                </li>
                                <li class="mdc-list-item">
                                    <span class="mdc-list-item__text">  E no final, você poderá salvar seu desempenho entrando pro nosso  <Link to={'/ranking'} className="link-ranking">Ranking</Link> </span>
                                </li>
                                <li class="mdc-list-item">
                                    <span class="mdc-list-item__text">   PRONTO pra se divertir?  Enjoy! </span>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to={'/playing'} className="play">jogar</Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Messages/>
                <Helmet
                    title="Quiz Star Wars"
                        style={[{
                            "cssText": `
                            body {
                                    min-height: 100%;
                                    background: #c3ddf4;
                                    padding: 15px;
                                    font-family: 'Comfortaa-Regular'
                                }
                                #root{
                                    padding: 7px;
                                    margin: 0px auto;
                                    box-shadow: -2px 11px 40px rgba(4, 0, 0, 0.22);
                                    background: #f2f4f8;
                              }
                          
                            `
                        }]}
            />
            </section>
        );
    }
}
const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => bindActionCreators({ handleHistory }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App)