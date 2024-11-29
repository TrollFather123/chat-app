export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface IUserResponse {
    status:number,
    message:string,
    data:User[]
}


export interface UserLoginResponse {
  status: number;
  message: string;
  data: User;
  token: string;
}

export interface ILoginData {
  email: string;
  password: string;
}