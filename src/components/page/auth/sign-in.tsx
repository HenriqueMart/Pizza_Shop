import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async"

export function SignIn(){
    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-center"> {/*tracking-tight - alinhamento das letras */}
                            Acessar Painel
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Acompanhar suas vendas pelo painel do parceiro!
                    </p>
                    </div>
                   <form className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email">Seu e-mail</label>
                            <Input id="email" type="email" />
                        </div>

                        <Button variant="outline" className="w-full" type="submit">Acessar Painel</Button>
                   </form>
                    
                </div>
            </div>
        </>
    );
}