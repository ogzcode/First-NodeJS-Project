import { request } from "../config";

const authUrl = {
    login: "/auth/login",
    register: "/auth/register",
}

export const login = async (data) => {
    return await request.post(authUrl.login, data);
}

export const register = async (data) => {
    return await request.post(authUrl.register, data);
}