class ApiService {
    baseStr = 'https://blog.kata.academy/api/';

    // получает конкретную статью
    async getArticleFull(slug, token) {
        const url = new URL(`${this.baseStr}/articles/${slug}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).catch((err) => err.message);

        return response.json();
    }

    // добавляет новую статью
    async postCreateArticle(newArticle, token) {
        const url = new URL(`${this.baseStr}/articles`);

        const body = {
            article: newArticle,
        };

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        }).catch((err) => err.message);

        return response.json();
    }

    // удаляет статью
    async deleteArticle(slug, token) {
        const url = new URL(`${this.baseStr}/articles/${slug}`);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).catch((err) => err.message);

        return response;
    }

    // обновляет статью
    async putArticleUpdate(slug, modifiedArticle, token) {
        const url = new URL(`${this.baseStr}/articles/${slug}`);

        const body = {
            article: modifiedArticle,
        };

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };

        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers,
        });

        return response.json();
    }

    // добавить в избранно (поставить лайк)
    async postAddFavorites(slug, token) {
        const url = new URL(`${this.baseStr}/articles/${slug}/favorite`);

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };

        const response = await fetch(url, {
            method: 'POST',
            headers,
        });

        return response.json();
    }

    // удалить из избранного (удалить лайк)
    async deleteFavorites(slug, token) {
        const url = new URL(`${this.baseStr}/articles/${slug}/favorite`);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).catch((err) => err.message);

        return response.json();
    }
}

const apiService = new ApiService();

export default apiService;