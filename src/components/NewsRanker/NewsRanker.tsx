import React, { FunctionComponent, useEffect, useState } from 'react';
import { CircularProgress, Container, makeStyles, Typography, Grid, TextField, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Pagination from '@material-ui/lab/Pagination';
import { INewsPost } from '../../models/NewsPost';
import { NewsPost } from '../NewsPost/NewsPost';

export const NewsRanker: FunctionComponent = () => {

    // Set Styles
    const classes = useStyles();

    // Loading state
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Data state
    const [items, setItems] = useState<INewsPost[]>([]);
    const [filteredItems, setFilteredItems] = useState<INewsPost[]>();

    // Filter state
    const [titleFilter, setTitleFilter] = useState('');

    // Pagination state
    const [itemsPerPage] = useState(3);
    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(0);


    // UseEffects 
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/rvanpraet/thuisleef-news-ranker/newsposts')
            .then(res => res.json())
            .then(
                (result: INewsPost[]) => {
                    setItems(result);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(true);
                    setIsLoaded(true);
                }
            )
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            let res;
            titleFilter.length > 0 ? res = items.filter(item => item.title.replace(/[^a-zA-Z ]/g, '').toLowerCase().includes(titleFilter.toLowerCase())) : res = items;
            setFilteredItems(res);
        }
    }, [items, titleFilter]);

    useEffect(() => {
        calcPageCount((filteredItems) ? filteredItems.length : items.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredItems]);

    useEffect(() => {
        if (pageCount < page) {
            setPage(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageCount]);


    // Helper functions
    const calcPageCount = (itemLength: number): void => {
        const count = Math.floor(itemLength / itemsPerPage) + (itemLength % itemsPerPage === 0 ? 0 : 1);
        setPageCount(count);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
        setPage(value);
    };

    const handleDelete = (id: number): void => {
        const newArr = items.filter(item => item.id !== id);
        setItems(newArr);
    };

    const handleLike = (e: INewsPost): void => {
        e.likes++;
        let newArr = [...items];
        setItems(newArr);
    };

    // Render Functions
    const renderPosts = () => {
        if (filteredItems) {
            return filteredItems
                .sort((a, b) => b.likes - a.likes)
                .filter((item, index) => index >= itemsPerPage * (page - 1)&& index < itemsPerPage * (page - 1) + itemsPerPage)
                .map(item =>
                    <NewsPost
                        key={item.id}
                        data={item}
                        onLike={handleLike}
                        onDelete={handleDelete}>
                    </NewsPost>
                );
        } else {
            return <></>;
        }
    };

    // JSX Return
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
    if (isLoaded && !error && items.length === 0) {
        return (
            <Container>
                <Typography variant="h2" component="h2">Er zijn geen posts.</Typography>
            </Container>
        )
    }
    if (isLoaded && !error && items.length > 0) {
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
                    {filteredItems && filteredItems.length === 0 && <Typography variant="h5" component="h5">Er zijn geen posts met deze titel.</Typography>}
                    {filteredItems && filteredItems.length > 0 && renderPosts()}
                </Box>
                {filteredItems && filteredItems.length > 0 &&
                <Pagination
                    className={classes.pagination}
                    color="secondary"
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange} />}
            </Container>
        );
    }
    return (
        <></>
    )
}

// Styles
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

