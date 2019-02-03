import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Form from './form'

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <Button aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <Icon icon={home} />
                </Button>

            ) : null}
        </MuiDialogTitle>
    )
})

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions)

class Details extends Component {

    sum(obj) {
        let sum = 0
            obj.forEach(element => {
                sum += parseFloat(element.grade)
            })
        return sum
    }

    render() {

        const { answers } = this.props

        
        return (
            <div>

                <DialogTitle id="customized-dialog-title">
                    Quiz Finalizado!
                    </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        <Grid container spacing={24}>
                            <Grid item xs={12} className={'border-gray centerAlign finalized'}>
                                <big>{this.sum(answers)}</big>  Pontos
                            </Grid>
                            <Grid item xs={12} className={'border-gray centerAlign'}>
                                <Typography gutterBottom>
                                    Preencha o formulário com seus dados para salvar sua pontuação
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={'border-gray centerAlign'}>
                                <Form onSubmit={this.props.onSubmit} />
                            </Grid>
                        </Grid>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.props.onRequestClose}>
                        Fechar
                      </Button>
                </DialogActions>

            </div>
        )
    }
}

export default Details

