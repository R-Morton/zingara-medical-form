const api = 'http://localhost:3001';


export async function getUsers(){
    const response = await fetch(`${api}/users`)
    const json = await response.json()
    return json
}

export async function createUser(data){
    const response = await fetch(`${api}/users/signup`, {
        method: "POST",
        headers:{
            'Content-type':"application/json"
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    console.log(json)
    return json
}