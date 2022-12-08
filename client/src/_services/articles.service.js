import Axios from "./caller.service";
//import router from '@/router'

let addArticle = (credentials) => {
    return Axios.post("articles/add", credentials)
}

let getAllArticles = async () => {
    return Axios.get("articles").then(res => res.data.data)
}

let getAuthorArticles = async (id) => {
    return Axios.get("articles/author/" + id).then(res => res.data.data)
}

let deleteArticle = (id) => {
    return Axios.delete("articles/" + id)
}

let getOneArticleData = (id) => {
    return Axios.get("articles/" + id).then(res => res.data.data)
}

let edit = (id, article) => {
    return Axios.put("articles/" + id, article)
}

let getLikedArticleFrom = (id) => {
    return Axios.post("articles/liked", {"id" : id}).then(res => res.data.data)
}

let addLikedArticle = (credentials) => {
    return Axios.post("articles/like", credentials)
}

let deleteLikedArticle = (credentials) => {
    return Axios.post("articles/delete_like", credentials)
}

let getSearchedArticles = async (credentials) => {
    return Axios.post("articles/search", credentials).then(res => res.data.data)
}

export const articlesService = {
    addArticle, getAllArticles, deleteArticle, getOneArticleData, edit, getLikedArticleFrom, addLikedArticle, deleteLikedArticle, getAuthorArticles, getSearchedArticles
}