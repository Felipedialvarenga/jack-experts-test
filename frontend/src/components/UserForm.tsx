import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { iUserForm } from "../interfaces";

type Props = {
  isLogin: boolean;
  onSubmitForm: (userData: iUserForm) => void
}

export default function UserForm({isLogin, onSubmitForm}: Props) {

  const {register, handleSubmit} = useForm() 
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      onSubmitForm({email: data.email, password: data.password})
  }
  
  return (
    <div className=" flex flex-1 flex-col justify-center px-6 py-12 shadow-inner">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
        {isLogin ? 'Entrar' : 'Criar Conta'}  
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Email
            </label>
            <div className="mt-2">
              <input
              {...register("email")}
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Senha
            </label>
            <div className="mt-2">
              <input
              {...register("password")}
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                required
                minLength={5}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </div>
        </form>
        
        <p className="mt-10 text-center text-sm text-gray-500">
          {isLogin ? 'Não possui conta?' : 'Já possui conta?'}{" "}
          <span
            className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500 hover:cursor-pointer"
          >
            {isLogin ? <Link to='/create-account'>Realizar cadastro</Link> : <Link to='/'>Entrar na conta</Link>}
          </span>
        </p>
      </div>
    </div>
  );
}
