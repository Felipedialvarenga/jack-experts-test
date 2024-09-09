import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className="h-screen bg-zinc-800 text-zinc-100 font-sans">
      {!token ? (
        <div className="pt-5 px-7 text-center flex content-center justify-center ">
          <h1 className="text-4xl font-bold">Task Manager</h1>
        </div>
      ) : (
        <div className="pt-5 px-7 flex justify-between items-end">
          <h1 className="text-4xl font-bold">Task Manager</h1>
          <div onClick={onLogout} className="flex items-center leading-6 text-red-500 hover:text-red-400 hover:cursor-pointer">
            <p className="text-xl font-semibold pr-1">Sair</p>
            <ArrowRightIcon className="size-5" />
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
