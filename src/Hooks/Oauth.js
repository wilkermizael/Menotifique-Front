import { signIn } from "../Service/authApi"

export default async function Oauth (username, password){

    const promise = await signIn(username, password)
    if(promise){
        return promise
    }else{
        console.log("algo deu errado")
    }
}