import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async"
import { toast } from 'sonner'
import {useForm} from 'react-hook-form';
import { registry } from "zod/v4/core";
import {z} from 'zod'
import { Link, useNavigate } from "react-router-dom";

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>; //Passando a tipagem do zod para o Typescript

export function SignUp(){
    const {register, handleSubmit, formState: {isSubmitting}} = useForm<SignUpForm>();

    const Navigate = useNavigate(); //Todas as vezes que eu precisar de redirecionar um usuário, utilizo esse Hook

    async function handleSignUp(data: SignUpForm){
        try {

            await new Promise(resolver => setTimeout(resolver, 2000));
            toast.success('Restaurante Cadastrado com Sucesso!', { action: {
                label: 'Login',
                onClick: () => Navigate('/sign-in'),
            }});
        }catch(err){
            toast.error('Erro ao Cadastrar Restaurante.');
        }
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">
                <Button asChild variant="outline" className="absolute right-8 top-8 bg-black text-white">
                    <Link to="/sign-in">
                        Fazer Login
                    </Link>
                </Button>
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-center"> {/*tracking-tight - alinhamento das letras */}
                            Criar conta Gratis
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Seja um parceiro e comece sua venda!
                    </p>
                    </div>
                   <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                            <Input id="restaurantName" type="text" {...register("restaurantName")}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="managerName">Seu Name</Label>
                            <Input id="managerName" type="text" {...register("managerName")}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Seu Telefone</Label>
                            <Input id="phone" type="text" {...register("phone")}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register("email")}/>
                        </div>

                        <Button 
                            disabled={isSubmitting}
                            variant="default" 
                            className="w-full bg-muted bg-black text-white font-bold hover:bg-black/75" 
                            type="submit">
                                Finalizar Cadastro
                        </Button>
                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você aceita nosso <a className="underline underline-offset-4" href="#">Termo de Serviço</a> e <a className="underline underline-offset-4" href="#">Políticas de Privacidade</a>.
                        </p>
                   </form>
                    
                </div>
            </div>
        </>
    );
}