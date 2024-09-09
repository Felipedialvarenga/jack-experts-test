import { Navigate} from "react-router-dom";
import UserForm from "../components/UserForm";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../api";
import { iUserForm } from "../interfaces";

export default function LoginPage() {
  const {token, login} = useAuth();

  if(token){
    return <Navigate to='/tasks' />
  }

  const onSubmit = async ({email, password}: iUserForm) => {
    const userToken = await loginUser({email, password})
    if(userToken){
      login(userToken.access_token)
    }  
  }

  return (
    <div className="pt-24">
      <UserForm isLogin={true} onSubmitForm={onSubmit} />
    </div>
  );
}
