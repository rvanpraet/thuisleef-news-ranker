import { Container, makeStyles } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { INewsPost } from '../../models/NewsPost';
import { NewsPost } from '../NewsPost/NewsPost';

export const NewsRanker: FunctionComponent = () => {

    const classes = useStyles();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<INewsPost[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [page, setPage] = React.useState(0);

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/rvanpraet/thuisleef-news-ranker/newsposts')
            .then(res => res.json())
            .then(
                (result: INewsPost[]) => {
                    result.sort((a, b) => sortPosts(a, b));
                    console.log(result);
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    const sortPosts = (postA: INewsPost, postB: INewsPost): number => {
        return postB.likes - postA.likes;
    }
    

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
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

    return (
        <Container className="news-ranker-wrapper">
            {items
                .filter((item, index) => index >= itemsPerPage * page && index < itemsPerPage * page + itemsPerPage)
                .map(item =>
                    <NewsPost
                        key={item.id}
                        data={item}
                        onLike={handleLike}
                        onDelete={handleDelete}>
                    </NewsPost>
            )}
            <Pagination
                color="secondary"
                count={Math.floor(items.length / itemsPerPage) + (items.length % itemsPerPage === 0 ? 0 : 1)}
                page={page + 1}
                onChange={handlePageChange} />
        </Container>
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
        width: '80%'
    },
    actions: {
        display: 'flex',
        width: 'auto'
    },
});

