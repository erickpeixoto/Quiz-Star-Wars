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
import CardMedia from '@material-ui/core/CardMedia'

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
 
    render() {
        
        const { person } = this.props

        return (
            <div>
                
                <DialogTitle id="customized-dialog-title">
                        Detalhes: 
                    </DialogTitle>
                            <DialogContent>
                                <Typography gutterBottom>
                                     <Grid container spacing={24}>
                                        <Grid item xs={5} className={'border'}>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                className={'media-displaying'}
                                                height="140"
                                                image={person.details && person.details.perfil}
                                            />
                                        </Grid>
                                         <Grid item xs={7} className={'border'}>
                                            <Grid item xs={12} className={'border'}>
                                            
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                   </Typography>
                                <Typography gutterBottom>
                        { person.movies && person.movies.toString() }
                    </Typography>
                                <Typography gutterBottom>
                                     #text...
                    </Typography>
                            </DialogContent>
                    <DialogActions>
                    <Button onClick={this.props.onRequestClose} color="primary">
                            Fechar
                      </Button>
                  </DialogActions>
            
            </div>
        )
    }
}

export default Details