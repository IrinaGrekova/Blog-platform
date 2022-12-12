import { useSelector } from 'react-redux';

const useStateUser = () => {
    const stateUsers = useSelector((state) => state.user);
    return stateUsers;
};

const useStateArticles = () => {
    const stateArticles = useSelector((state) => state.articles);
    return stateArticles;
};

export { useStateUser, useStateArticles };

