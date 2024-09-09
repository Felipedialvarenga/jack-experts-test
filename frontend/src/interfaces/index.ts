export interface iUserForm {
    email: string;
    password: string;
  }

export interface iTask {
  id: number;
  title: string;
  description: string;
  completed: boolean
  userId: number
}