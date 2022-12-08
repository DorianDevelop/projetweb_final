import Axios from "./caller.service";
import router from '@/router'

let login = (credentials) => {
    return Axios.post("api/auth/signin", credentials)
}

let register = (credentials) => {
    return Axios.post("api/auth/signup", credentials)
}

let logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

let getUserId = () => {
    if(!isLogged()){
        return null
    }

    let tokenUser = localStorage.getItem('token')
    return Axios.post("api/auth", {token : tokenUser}).then(res => res.data.id)
}

let getThisUserData = async () => {
    let id  = await getUserId();

    return Axios.get("user/" + id).then(res => res.data.data)
}

let getAllUsers = async () => {
    if(await getUserId() != 0) return null

    return Axios.get("users").then(res => res.data.data)
}

let getOneUserDatas = (id) => {
    return Axios.get("user/" + id).then(res => res.data.data)
}

let edit = (id, user) => {
    return Axios.put("user/" + id, user)
}

let deleteUser = (id) => {
    return Axios.delete("user/" + id)
}



export const accountServices = {
    login, logout, saveToken, isLogged, getThisUserData, getUserId, register, getAllUsers, getOneUserDatas, edit, deleteUser
}