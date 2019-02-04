import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
    TextField
} from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'

class Form extends Component {
    render() {
        const { handleSubmit, _key, disabled, answered, setAnswers, invalid } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name={`input_${_key}`}
                    component={TextField}
                    hintText="Qual é o nome?"
                    floatingLabelText="Resposta"
                    disabled={disabled}
                />
                <Button size="small" type={'submit'} className={(answered) && 'answered'}  onClick={(input) => setAnswers(_key)} disabled={answered || invalid}>

                    {!(answered) ? 'Responder' : 'Respondido'}
                </Button>
            </form>
        )
    }
}

function validate(values) {

    const errors = {}
    Object.keys(values).map((key, index) => {
        if (values[key].length < 4) {
            errors[key] = 'Nome incompleto'
        }
    })
    
    return errors
    
}
export default reduxForm({
    form: 'inputs',
    validate
})(Form)
