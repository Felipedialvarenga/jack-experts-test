import { ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom";

type Props = {
    children: ReactNode
}
// Rota para redirecionamento em caso de usuario nao autenticado
export default function ProtectedRoute({children}: Props) {
 const {token} = useAuth();

 if(!token){
    return <Navigate to='/' />
 }

 return children
}