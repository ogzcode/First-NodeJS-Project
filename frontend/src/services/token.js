export const getProjectToken = () => {
    return localStorage.getItem('project-x-token')
}

export const setProjectToken = (token) => {
    localStorage.setItem('project-x-token', token)
}

export const removeProjectToken = () => {
    localStorage.removeItem('project-x-token')
}

export const getProjectUser = () => {
    return JSON.parse(localStorage.getItem('project-x-user'))
}

export const setProjectUser = (user) => {
    localStorage.setItem('project-x-user', JSON.stringify(user))
}

export const removeProjectUser = () => {
    localStorage.removeItem('project-x-user')
}



