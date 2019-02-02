import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPeopleApi } from './actions'
import List from './list'
import Helmet from 'react-helmet'



class Quiz extends Component {
    
    componentDidMount() {
        this.props.getPeopleApi()
    }
    render() {
        return (
            <section>
                 <div>
                     <h2>Quiz</h2>
                     <List/>

                </div>   
                <Helmet
                    title="Jogando... Star Wars"
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
        )
    }
}
const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => bindActionCreators({ getPeopleApi }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)