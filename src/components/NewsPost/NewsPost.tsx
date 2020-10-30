import React, { FunctionComponent } from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { INewsPost } from '../../models/NewsPost';

interface NewsPostProps {
    data: INewsPost;
    onLike: (e: any) => void;
    onDelete: (e: any) => void;
}

export const NewsPost: FunctionComponent<NewsPostProps> = ({ data, onLike, onDelete }) => {

    // Set Styles
    const classes = useStyles();

    // Helper functions
    const handleLike = (): void => {
        onLike(data);
    };
    const handleDelete = (): void => {
        onDelete(data.id);
    };

    // JSX Return
    return (
        <Card
            className={classes.root}
        >
            <Box display="flex" className={classes.mediaBox}>
                <CardMedia
                    className={classes.media}
                    image={data.mediaUrl}>
                    
                </CardMedia>
            </Box>
            <CardContent
                className={classes.content}
            >
                <Typography gutterBottom variant="h4">
                    {data.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
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

// Styles
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        margin: '8px 0',
        position: 'relative',
        [theme.breakpoints.down("xs")]: {
            flexWrap: 'wrap',
        },
    },
    mediaBox: {
        flex: '0 0 80px',
        [theme.breakpoints.down("xs")]: {
            flex: '0 0 0',
            width: '100%'
        }
    },
    media: {
        height: 80,
        width: 80,
        margin: '1rem',
        [theme.breakpoints.down("xs")]: {
            margin: '1rem 0 0 1rem'
        }
    },
    content: {
        textAlign: 'left',
        width: 'calc(80% - 80px)',
        [theme.breakpoints.down("xs")]: {
            width: '100%',
        }
    },
    actions: {
        display: 'flex',
        width: 'auto',
        [theme.breakpoints.down("xs")]: {
            position: 'absolute',
            top: 0,
            right: 0
        }
    },
}));
