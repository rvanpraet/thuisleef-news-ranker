import { Container } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { NewsPost } from '../NewsPost/NewsPost';

export const NewsRanker: FunctionComponent = () => {

    return (
        <Container className="news-ranker-wrapper">
            <NewsPost
                mediaUrl={'https://picsum.photos/200'}
                title={'Lorem Ipsum'}
                content={'Lorem Drupsum'}>
            </NewsPost>
        </Container>
    );
}

