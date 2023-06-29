const api = 'http://localhost:3001';


export async function getUsers(){
    const response = await fetch(`${api}/users`)
    const json = await response.json()
    return json
}