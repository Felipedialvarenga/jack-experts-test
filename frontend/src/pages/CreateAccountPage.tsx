import { Navigate, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { useAuth } from "../hooks/useAuth";
import { createUser } from "../api";
import { iUserForm } from "../interfaces";
import { toast } from "react-toastify";

export default function CreateAccountPage() {
  const {token} = useAuth();
  const navigate = useNavigate();

  if(token){
    return <Navigate to='/tasks' />
  }

  const onSubmit = async ({email, password}: iUserForm) => {
    const createdUser = await createUser({email, password});
    if(createdUser){
      toast.success('Usuário criado com sucesso')
      navigate('/');
    } 
  }


  return (
    <div className="pt-24">
      <UserForm isLogin={false} onSubmitForm={onSubmit}/>
    </div>
  );
}
