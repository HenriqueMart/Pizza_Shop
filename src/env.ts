import {z} from 'zod'

const envSchema = z.object({
    VITE_API_URL:z.string().url(),
})

//parse valida ser o ser o env.local está seguindo o schema a cima 
export const env = envSchema.parse(import.meta.env)