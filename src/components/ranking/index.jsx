import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
        getPeopleApi,
        setAnswer,
        setVisualization,
        setFinish
       } from './actions'
import List from './list'
import Helmet from 'react-helmet'
import Grid from '@material-ui/core/Grid'
import Messages from '../app/messages/toastr'
import { Icon } from 'react-icons-kit'
import { ic_stars } from 'react-icons-kit/md/ic_stars'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

class Quiz extends Component {
    
  
    componentDidMount() {
        this.props.getPeopleApi()
    }
    handleFinished() {
     this.props.setFinish(true)
    }   
    render() {
        const { finished } = this.props.quiz
        return (
            <Grid container spacing={24}>
                <Grid container xs={12} className={'centerAlign'}>
                    <Grid item xs={4} className={'alignLeft box-ranking'}>
                        <Link to={'/ranking'}>
                            <Button aria-label="Close">
                                <Icon icon={ic_stars} />
                                <span>Ranking</span>
                            </Button>
                        </Link>


                    </Grid>
                    <Grid item xs={4} className={'centerAlign'}>
                        <Link to={'/'}>
                            <img className="logo-app" src={require('../app/public/images/darth_vader.png')} size="50" alt="Quiz Star Wars" />
                        </Link>
                    </Grid>
                    <Grid item xs={4} className={'alignRight'}>
                      
                    </Grid>
                  </Grid>   

                <Grid container xs={12} className={'container-list'}>
                     <List
                        setAnswer={this.props.setAnswer}
                        setVisualization={this.props.setVisualization}
                     />
                </Grid>
                <Messages />
             
                <Helmet
                    title="Ranking Star Wars"
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
const mapStateToProps = state => ({ quiz: state.quiz })
const mapDispatchToProps = dispatch => bindActionCreators({ getPeopleApi, 
                                                            setAnswer, 
                                                            setVisualization,
                                                            setFinish }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)