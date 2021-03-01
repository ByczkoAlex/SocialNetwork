import axios from "axios";
import {ProfileAPIType} from "../redux/profileReducer";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'f91d3aae-7736-4e39-ad7c-b286859887d2'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    ...settings
})



export const UsersAPI = {
    getUsers(currentPage: number, pageSize: number)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
            .then(
                response => response.data
            )
    },
    follow(userId: number) {
        return instance.post(`users?page=${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`users?page=${userId}`)
    },
    getProfile(userId: number) {
        return instance.get<ProfileAPIType>(`profile/` + userId)
    },
}

export const AuthAPI = {
    me() {
        return instance.get(`auth/me`, settings)
    }
}

