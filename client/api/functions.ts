import { ILoginData, IUserResponse, UserLoginResponse } from "@/interface/common.all";
import { axiosInstance } from "./helper"

export const getUsers = async() =>{
    const res = await axiosInstance.get<IUserResponse>("/users");
    return res?.data
}

export const loginUser = async(data:ILoginData) =>{
    const res = await axiosInstance.post<UserLoginResponse>("/login-user",data);
    return res?.data
}



export const getRoomChats = async(roomId:string) =>{
    const res = await axiosInstance.get(`/chat/:${roomId}`);
    return res?.data
}
