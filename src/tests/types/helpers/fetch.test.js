import { fetchWithoutToken } from "../../../helpers/fetch"

describe('Test on helper fetch', () => {

    test('fetchWithoutToken should work', async () => {

        const resp = await fetchWithoutToken('auth/login', {email: '1111@test.com', password: '123123'}, 'POST')
        
        expect(resp instanceof Response).toBe(true);

        const body = await resp.json()

        expect(body.ok).toBe(true)
        
    })
    
})
