import { env } from '@/env';
import axios from 'axios';


export const api = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true, //Enviar automaticamente os cooke para o backend de autenticação
})

if(env.VITE_ENABLE_API_DELAY){
    //Toda vez que uma requisição for feita, vai esperar 2 segundos
    //interceptors é uma função que intercepta as requisições antes de serem enviadas para executar algum método ou modificação no corpo
    api.interceptors.request.use(async (config) => {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        return config;
    })
}