import axios from "axios";

const API_URL = "https://conduit.productionready.io/api";

let token = null;
const authToken = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const encode = encodeURIComponent;

const handleResponse = res => res.body;

const userService = {
    post: (url, body) =>
        axios.post(`${API_URL}${url}`, { body }).then(handleResponse),
    get: url =>
        axios.get(`${API_URL}${url}`).then(handleResponse),
    delete: url =>
        axios.delete(`${API_URL}${url}`).then(handleResponse),
    put: (url, body) =>
        axios.put(`${API_URL}${url}`, body).then(handleResponse)
};

const userActions = {
    login: (email, password) =>
        userService.post("/users/login", { user: { email, password } }),
    currentUser: () =>
        userService.get('/user'),
    register: (username, email, password) =>
        userService.post('/users', { user: { username, email, password } }),
    save: user =>
        userService.put('/user', { user })
};

const Tags = {
    getAll: () => userService.get('/tags')
};

const Articles = {
    all: page =>
        userService.get(`/articles?${limit(10, page)}`),
    byAuthor: (author, page) =>
        userService.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
    byTag: (tag, page) =>
        userService.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
    delete: slug =>
        userService.delete(`/articles/${slug}`),
    favorite: slug =>
        userService.post(`/articles/${slug}/favorite`),
    favoritedBy: (author, page) =>
        userService.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
    feed: () =>
        userService.get('/articles/feed?limit=10&offset=0'),
    get: slug =>
        userService.get(`/articles/${slug}`),
    unfavorite: slug =>
        userService.delete(`/articles/${slug}/favorite`),
    update: article =>
        userService.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
    create: article =>
        userService.post('/articles', { article })
};

const Comments = {
    create: (slug, comment) =>
        userService.post(`/articles/${slug}/comments`, { comment }),
    delete: (slug, commentId) =>
        userService.delete(`/articles/${slug}/comments/${commentId}`),
    forArticle: slug =>
        userService.get(`/articles/${slug}/comments`)
};


const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined });

const Profile = {
    follow: username =>
        userService.post(`/profiles/${username}/follow`),
    get: username =>
        userService.get(`/profiles/${username}`),
    unfollow: username =>
        userService.del(`/profiles/${username}/follow`)
};

export default {
    Articles,
    userActions,
    Comments,
    Profile,
    Tags,
    setToken: _token => { token = _token; }
};
