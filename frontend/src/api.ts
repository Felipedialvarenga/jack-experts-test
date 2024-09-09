import { toast } from "react-toastify";
import { iTask} from "./interfaces";

const API_URL = "http://localhost:3000";

type LoginInfo = {
  email: string;
  password: string;
};

export const loginUser = async (loginInfo: LoginInfo) => {
  try {
    const response = await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    if(!response.ok){
      const parsedResponse = await response.json()
      const message = parsedResponse.message
      toast.error(message);
      return null
    }

    return response.json();
  } catch (error) {
    console.log(error)
    toast.error('Erro ao se conectar com o servidor');
    return null;
  }
};

export const createUser = async (loginInfo: LoginInfo) => {
  try {
    const response = await fetch(API_URL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    if(!response.ok){
      const parsedResponse = await response.json()
      const message = parsedResponse.message
      toast.error(message);
      return null
    }

    return response.json();
  } catch (error) {
    console.log(error);
    toast.error('Erro ao se conectar com o servidor');
    return null;
  }
};

export const getTasks = async (token: string) => {
  try {
    const response = await fetch(API_URL + "/users/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    });

    if(!response.ok){
      toast.error('Erro ao buscar tarefas');
      return []
    }

    return response.json();
  } catch (error) {
    console.log(error);
    toast.error('Erro ao se conectar com o servidor');
    return null;
  }
};


export const createTask = async (token: string, taskData: Partial<iTask>) => {
  try {
    const response = await fetch(API_URL + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({...taskData, completed: false})
    });

    if(!response.ok){
      toast.error('Erro ao criar tarefa');
      return null
    }

    return response.json();
  } catch (error) {
    console.log(error);
    toast.error('Erro ao se conectar com o servidor');
    return null;
  }
};

export const updateTask = async (token: string, taskId: number, taskData: Partial<iTask>) => {
  try {
    const response = await fetch(API_URL + "/tasks/" + taskId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({...taskData})
    });

    if(!response.ok){
      toast.error('Erro ao atualizar tarefa');
      return null
    }

    return response.json();
  } catch (error) {
    console.log(error);
    toast.error('Erro ao se conectar com o servidor');
    return null;
  }
};

export const deleteTask = async (token: string, taskId: number) => {
  try {
    const response = await fetch(API_URL + "/tasks/" + taskId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    });

    if(!response.ok){
      toast.error('Erro ao deletar tarefa');
      return null
    }

    return response.json();
  } catch (error) {
    console.log(error);
    toast.error('Erro ao se conectar com o servidor');
    return null;
  }
};
