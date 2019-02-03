import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
    TextField
} from 'redux-form-material-ui'


class Form extends Component {
    render() {
        const { handleSubmit, _key, disabled } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name={`input_${_key}`}
                    component={TextField}
                    hintText="Qual é o nome?"
                    floatingLabelText="Resposta"
                    disabled={disabled}
                />
            </form>
        )
    }
}

function validate(values) {

    const { name, registry } = values
    const errors = {}
    if (!name) {
        errors.name = 'Nome inválido'
    }
    if (!registry) {
        errors.registry = 'CNPJ inválido'
    }
    return errors
}
export default reduxForm({
    form: 'inputs',
    validate
})(Form)
