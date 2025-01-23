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


export interface ChatMessageData {
  _id: string;           
  createdAt: string;        
  updatedAt: string;      
  message: string;         
  roomId: string;           
  senderId: string;   
  read:boolean      
}

export interface IChatMessageResponse {
  status:number,
  message:string,
  data:ChatMessageData[]
}