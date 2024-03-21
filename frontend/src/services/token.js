export const getProjectToken = () => {
    return localStorage.getItem('project-x-token')
}

export const setProjectToken = (token) => {
    localStorage.setItem('project-x-token', token)
}

export const removeProjectToken = () => {
    localStorage.removeItem('project-x-token')
}

