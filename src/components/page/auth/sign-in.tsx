import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async"
import { toast } from 'sonner'
import {useForm} from 'react-hook-form';
import { registry } from "zod/v4/core";
import {Link} from 'react-router-dom';
import {z} from 'zod';

const signInForm = z.object({
    email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>; //Passando a tipagem do zod para o Typescript

export function SignIn(){
    const {register, handleSubmit, formState: {isSubmitting}} = useForm<SignInForm>();

    async function handleSignIn(data: SignInForm){
        try {
            await new Promise(resolver => setTimeout(resolver, 2000));
            toast.success('Enviamos um link de autenticação para seu e-mail.', { action: {
                label: 'Reenviar',
                onClick: () => handleSignIn(data),
            }});
        }catch(err){
            toast.error('Erro na autenticação.');
        }
    }

    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <Button asChild variant="outline" className="absolute right-8 top-8 bg-black text-white">
                    <Link to="/sign-up">
                        Novo Estabelecimento
                    </Link>
                </Button>
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-center"> {/*tracking-tight - alinhamento das letras */}
                            Acessar Painel
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Acompanhar suas vendas pelo painel do parceiro!
                    </p>
                    </div>
                   <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register("email")}/>
                        </div>

                        <Button 
                            disabled={isSubmitting}
                            variant="default" 
                            className="w-full bg-muted bg-black text-white font-bold hover:bg-black/75" 
                            type="submit">
                                Acessar Painel
                            </Button>
                   </form>
                    
                </div>
            </div>
        </>
    );
}