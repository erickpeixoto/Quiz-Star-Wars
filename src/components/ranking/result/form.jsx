import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
    TextField
} from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const required = value => (value == null ? '* Campo obrigatório' : undefined)
const email = value =>
    (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Email inválido'
        : undefined)

class Form extends Component {
    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit}>

                    <Grid item xs={12} className={'centerAlign'}>
                        <Field
                            name={`name`}
                            component={TextField}
                            hintText="Digite..."
                            floatingLabelText="Nome"
                            validate={required}
                        />
                    </Grid>
                    <Grid item xs={12} className={'centerAlign'}>
                        <Field
                            name={`email`}
                            component={TextField}
                            hintText="Digite..."
                            floatingLabelText="E-mail"
                            validate={[required, email]}
                        />
                    </Grid>
                    <Grid item xs={12} className={'centerAlign'}>
                        <Button size="small" type={'submit'}>
                                Salvar
                        </Button>    
                    </Grid>
            </form>
        )
    }
}

export default reduxForm({
    form: 'ranking'
})(Form)
