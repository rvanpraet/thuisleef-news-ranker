import React, { FunctionComponent, useEffect, useState } from 'react';
import { CircularProgress, Container, makeStyles, Typography, Grid, TextField, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Pagination from '@material-ui/lab/Pagination';
import { INewsPost } from '../../models/NewsPost';
import { NewsPost } from '../NewsPost/NewsPost';

export const NewsRanker: FunctionComponent = () => {

    const classes = useStyles();

    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<INewsPost[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [titleFilter, setTitleFilter] = useState('');
    const [page, setPage] = React.useState(0);

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/rvanpraet/thuisleef-news-ranker/newsposts')
            .then(res => res.json())
            .then(
                (result: INewsPost[]) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(true);
                }
            )
    }, []);

    const renderPosts = () => {
        let res;
        titleFilter.length > 0 ? res = items.filter(item => item.title.toLowerCase().includes(titleFilter.toLowerCase())) : res = items;
        res = res
            .sort((a, b) => b.likes - a.likes)
            .filter((item, index) => index >= itemsPerPage * page && index < itemsPerPage * page + itemsPerPage)
            .map(item =>
                <NewsPost
                    key={item.id}
                    data={item}
                    onLike={handleLike}
                    onDelete={handleDelete}>
                </NewsPost>
        );
        if (res.length === 0) return <Typography variant="h5" component="h5">Er zijn geen posts met deze titel.</Typography>;
        return res;
        
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
        setPage(value - 1);
    };

    const handleDelete = (id: number): void => {
        const newArr = items.filter(item => item.id !== id);
        setItems(newArr);
    };

    const handleLike = (e: INewsPost): void => {
        e.likes++;
        const newArr = [...items];
        setItems(newArr);
    };

    if (!isLoaded) {
        return (
            <Container>
                <CircularProgress color="secondary" />
            </Container>
        )
    }
    if (isLoaded && error) {
        return (
            <Container>
                <Typography variant="h2" component="h2">Oeps! Er ging wat mis bij het ophalen van de data.. Probeer het later nog eens.</Typography>
            </Container>
        )
    }
    if (isLoaded && !error && items?.length === 0) {
        return (
            <Container>
                <Typography variant="h2" component="h2">Er zijn geen posts.</Typography>
            </Container>
        )
    }
    if (isLoaded && !error && items?.length > 0) {
        return (
            <Container>
                <Box className={classes.search}>
                    <Box>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <SearchIcon color="disabled" />
                            </Grid>
                            <Grid item>
                                <TextField color="secondary" id="input-with-icon-grid" label="Zoek titel" onChange={(e) => {setTitleFilter(e.target.value)}}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box className={classes.content}>
                    {renderPosts()}
                </Box>
                <Pagination
                    className={classes.pagination}
                    color="secondary"
                    count={Math.floor(items.length / itemsPerPage) + (items.length % itemsPerPage === 0 ? 0 : 1)}
                    page={page + 1}
                    onChange={handlePageChange} />
            </Container>
        );
    }
    return (
        <></>
    )
}

const useStyles = makeStyles({
    content: {
        margin: '2rem 0'
    },
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }

});

