import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPersonApi, handleDataRanking } from '../actions'


import Dialog from '@material-ui/core/Dialog'
import Modal from './modal'

export class Result extends Component {


    constructor(props) {
        super(props)
        this.state = {
            modal: true
        }
    }

    handleClickOpen = () => {
        this.setState({ modal: true })
    }

    handleClose = () => {
        this.setState({ modal: false })
    }

   
    render() {

        const { people, person } = this.props.quiz

        return (
                <Dialog
                    modal={true}
                    open={this.state.modal}
                    className={'box-modal'}
                >
                    <Modal
                        onRequestClose={this.handleClose}
                        answers={this.props.quiz.answers}
                        onSubmit={this.props.handleDataRanking}
                    />      
                </Dialog>
        )
    }
}

const mapStateToProps = state => ({ quiz: state.quiz })
const mapDispatchToProps = dispatch => bindActionCreators({ getPersonApi, handleDataRanking }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Result)