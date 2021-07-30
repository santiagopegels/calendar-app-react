import { fetchWithoutToken } from "../helpers/fetch"
import { types } from "../types/types"
import Swal from "sweetalert2"

export const startLogin = (email, password) => {
    return async (dispatch) => {

        const resp = await fetchWithoutToken('auth/login', { email, password }, 'POST')
        const body = await resp.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            dispatch(login({
                uid: body.user.uid,
                name: body.user.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }

    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {

        const resp = await fetchWithoutToken('auth/register', { email, password, name }, 'POST')
        const body = await resp.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            dispatch(login({
                uid: body.user.uid,
                name: body.user.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }

    }
}


const login = (user) => ({
    type: types.authLogin,
    payload: user
})
