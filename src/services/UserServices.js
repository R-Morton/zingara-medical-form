const api = 'http://localhost:3001' //process.env.REACT_APP_BACKEND_URL;

export async function getUsers(){
    const response = await fetch(`${api}/users`)
    const json = await response.json()
    return json
}
