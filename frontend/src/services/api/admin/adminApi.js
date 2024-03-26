import { request } from "../../config";

const url = {
    getAllUser: "/user/admin/getAllUser",
    deleteAllUser: "/user/admin/deleteAllUser",
    createUser: "/user/admin/createUser",
    deleteUserById: "/user/admin/deleteUserById",
}

export const getAllUsers = async () => {
    return await request.get(url.getAllUser);
}

export const deleteAllUser = async () => {
    return await request.delete(url.deleteAllUser);
}

export const createUser = async (data) => {
    return await request.post(url.createUser, data);
}

export const deleteUserById = async (id) => {
    return await request.delete(url.deleteUserById + `?id=${id}`);
}