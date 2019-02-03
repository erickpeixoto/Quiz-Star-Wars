import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
    TextField
} from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

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
                        />
                    </Grid>
                    <Grid item xs={12} className={'centerAlign'}>
                        <Field
                            name={`email`}
                            component={TextField}
                            hintText="Digite..."
                            floatingLabelText="E-mail"
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
    form: 'ranking',
    validate
})(Form)
