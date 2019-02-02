import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import './public/styles/app.css'
import './public/styles/toastr.css'
import Helmet from 'react-helmet'
import Messages from './messages/toastr'

import { injectGlobal } from 'styled-components'
import mainFont from './public/fonts/Poiret_One/PoiretOne-Regular.ttf'
import fontComfortaa from './public/fonts/Comfortaa/Comfortaa-Regular.ttf'
import fontComfortaaBold from './public/fonts/Comfortaa/Comfortaa-Bold.ttf'




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
    
    
    render() {
        return (
            <section>
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
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App)