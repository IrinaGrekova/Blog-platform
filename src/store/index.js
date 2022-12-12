import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import articlesReducer from './article-slice';

export default configureStore({
    reducer: {
        user: userReducer,
        articles: articlesReducer,
    },
});