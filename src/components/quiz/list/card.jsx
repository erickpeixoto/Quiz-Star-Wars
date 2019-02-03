import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from './input'

const styles = {
    card: {
        maxWidth: 345,
        float: 'left',
        marginRight: 12

    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
        height: 199
    },
};


function ImgMediaCard(props) {
    const { classes, image, _key, setAnswers, answered } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="140"
                    image={image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Button size="small" color="primary" disabled={answered}>
                            Ver detalhes
                        </Button>
                  </Typography>
                    <Typography component="p">
                        Lembre-se, quando você verifica os detalhes, os acertos passam a valer <big>5 pontos</big>
                   </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                  <Input
                       _key={_key} 
                        disabled={answered}
                  />
                <Button size="small" color="primary" onClick={(input) => setAnswers(_key)} disabled={answered}>
                    
                    {!(answered) ? 'Responder' : 'Respondido' }
                </Button>
            </CardActions>
        </Card>
    );
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);