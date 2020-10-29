import React, { FunctionComponent } from 'react';
import './NewsPost.css';
import { Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

interface NewsPostProps {
    mediaUrl: string;
    title: string;
    content: string;
}

export const NewsPost: FunctionComponent<NewsPostProps> = ({ mediaUrl, title, content, }) => {

    const classes = useStyles();
    return (
        <Card
            className={classes.root}
        >
            <CardMedia
                className={classes.media}
                image={mediaUrl}>
                
            </CardMedia>
            <CardContent
                className={classes.content}
>
                <Typography gutterBottom align="left" variant="h4" component="h2">
                    {title}
                </Typography>
                <Typography align="left" variant="body2" color="textSecondary" component="p">
                    {content}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <IconButton aria-label="like" >
                    <ThumbUpAltOutlinedIcon color="action"/>
                </IconButton>
                <IconButton aria-label="delete">
                    <ClearOutlinedIcon />
                </IconButton>
            </CardActions>
        </Card>
  );
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center' 
    },
    media: {
        height: 80,
        width: 80,
        margin: '1rem'
    },
    content: {
        width: '70%'
    },
    actions: {
        display: 'flex',
        width: 'auto'
    },
})
