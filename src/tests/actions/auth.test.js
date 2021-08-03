import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Swal from 'sweetalert2'

import '@testing-library/jest-dom'
import { startLogin, startRegister } from '../../actions/auth'
import { types } from '../../types/types'
import * as fecthModule from '../../helpers/fetch'


jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
let store = mockStore(initState)

Storage.prototype.setItem = jest.fn()

describe('Test on auth actions', () => {

    beforeEach(() => {
        store = mockStore(initState)
        jest.clearAllMocks()
    })

    test('should login correctly', async () => {

        await store.dispatch(startLogin('1111@test.com', '123123'))

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String))
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

    })

    test('should login incorrectly', async () => {
        await store.dispatch(startLogin('1111@test.com', 'incorrectly'))
        const actions = store.getActions()

        expect(actions).toEqual([])
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Correo o password incorrecto", "error")
    })

    test('startRegister', async () => {

        fecthModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    user: {
                        uid: '123',
                        name: 'Test',
                    },
                    token: 'ABC14124CDV',
                    ok: true
                }
            }
        }))

        await store.dispatch(startRegister('Test', 'test@gmail.com', '123123'))

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                    uid: '123',
                    name: 'Test'
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC14124CDV')
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

    })


})
