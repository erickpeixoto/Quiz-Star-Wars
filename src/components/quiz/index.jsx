import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
        getPeopleApi,
        setAnswer,
        setVisualization
       } from './actions'
import List from './list'
import Helmet from 'react-helmet'
import Grid from '@material-ui/core/Grid'
import ReactCountdownClock from 'react-countdown-clock'


class Quiz extends Component {
    
    componentDidMount() {
        this.props.getPeopleApi()
    }
    render() {
        return (
            <Grid container spacing={24}>
                <Grid container xs={12} className={'centerAlign border'}>
                    <Grid item xs={4} className={'centerAlign border'}>
                       <big>25</big> Pontos
                    </Grid>
                    <Grid item xs={4} className={'centerAlign border'}>
                        <h2>Star Wars Quiz</h2>
                    </Grid>
                    <Grid item xs={4} className={'alignRight border'}>
                        <ReactCountdownClock seconds={120}
                            color={'gray'}
                            alpha={0.9}
                            size={100}
                            pausedText={'||'}
                            paused={false}
                            onClick={() => console.info('cliked')}
                            onComplete={() => console.warn('concluído')} />
                    </Grid>
                  </Grid>   

                <Grid container xs={12} className={'container-list'}>
                     <List
                        setAnswer={this.props.setAnswer}
                        setVisualization={this.props.setVisualization}
                     />
                </Grid>


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
            </Grid>
        )
    }
}
const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => bindActionCreators({ getPeopleApi, 
                                                            setAnswer, 
                                                            setVisualization }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)