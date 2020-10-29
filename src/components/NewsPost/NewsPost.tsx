import React, { FunctionComponent } from 'react';
import './NewsPost.css';
import { Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { INewsPost } from '../../models/NewsPost';

interface NewsPostProps {
    data: INewsPost;
    onLike: (e: any) => void;
    onDelete: (e: any) => void;
}

export const NewsPost: FunctionComponent<NewsPostProps> = ({ data, onLike, onDelete }) => {

    const classes = useStyles();
    const handleLike = () => {
        onLike(data);
    };
    const handleDelete = () => {
        onDelete(data.id);
    };

    return (
        <Card
            className={classes.root}
        >
            <CardMedia
                className={classes.media}
                image={data.mediaUrl}>
                
            </CardMedia>
            <CardContent
                className={classes.content}
            >
                <Typography gutterBottom align="left" variant="h4" component="h2">
                    {data.title}
                </Typography>
                <Typography align="left" variant="body2" color="textSecondary" component="p">
                    {data.content}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <div>
                    <IconButton aria-label="like" onClick={handleLike}>
                        <ThumbUpAltOutlinedIcon color="action" />
                    </IconButton>
                    <Typography variant="body2" color="textSecondary" component="p">{data.likes}</Typography>
                </div>

                <IconButton aria-label="delete" onClick={handleDelete}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CardActions>
        </Card>
  );
}

const useStyles = makeStyles({
    root: {
        alignItems: 'center',
        display: 'flex',
        margin: '8px 0'
    },
    media: {
        height: 80,
        width: 80,
        margin: '1rem'
    },
    content: {
        width: '80%'
    },
    actions: {
        display: 'flex',
        width: 'auto'
    },
});
