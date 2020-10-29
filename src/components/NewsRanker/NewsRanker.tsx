import { Container } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { INewsPost } from '../../models/NewsPost';
import { NewsPost } from '../NewsPost/NewsPost';

export const NewsRanker: FunctionComponent = () => {

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

    const sortPosts = (postA: INewsPost, postB: INewsPost) => {
        return postB.likes - postA.likes;
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    };

    return (
        <Container className="news-ranker-wrapper">
            {items
                .filter((item, index) => index >= itemsPerPage * page && index < itemsPerPage * page + itemsPerPage)
                .map(item =>
                    <NewsPost
                        key={item.id}
                        mediaUrl={item.mediaUrl}
                        title={item.title}
                        content={item.content}>
                    </NewsPost>
            )}
            <Pagination
                count={Math.floor(items.length / itemsPerPage) + (items.length % itemsPerPage === 0 ? 0 : 1)}
                page={page + 1}
                onChange={handleChange} />
        </Container>
    );
}

