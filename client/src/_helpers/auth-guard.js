import router from "@/router"
import { accountServices } from '@/_services'

export async function authGuard(returnBoolean = false){
    let token = localStorage.getItem('token')


    if(token && token != "undefined") {
        if(await accountServices.getUserId() == 0){
            return true
        }
    }

    if(returnBoolean)
        return false
    
    router.push('/')
}