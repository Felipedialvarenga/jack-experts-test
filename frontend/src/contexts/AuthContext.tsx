import { createContext, ReactNode, useState } from "react";

export type AuthContextType = {
    token: string;
    login: (receivedToken: string) => void;
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState('');

    const login = (receivedtoken: string) => setToken(receivedtoken);
    const logout = () => setToken('');

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}




