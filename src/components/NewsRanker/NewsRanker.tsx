import { Container } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { INewsPost } from '../../models/NewsPost';
import { NewsPost } from '../NewsPost/NewsPost';

export const NewsRanker: FunctionComponent = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<INewsPost[]>([]);
    const [page, setPage] = React.useState(1);

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
        setPage(value);
    };

    return (
        <Container className="news-ranker-wrapper">
            {items.map(item => (
                <NewsPost
                    key={item.id}
                    mediaUrl={item.mediaUrl}
                    title={item.title}
                    content={item.content}>
                </NewsPost>
            ))}
            <Pagination count={Math.floor(items.length / 3) + 1} page={page} onChange={handleChange} />
        </Container>
    );
}

