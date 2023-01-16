function getUsers(){
    const users = localStorage.getItem('users') ?? [];
    return (users.length > 0) ? JSON.parse(users) : []
}

const users = getUsers();

function userExists(email){
    if(users.length === 0) return false;
    const user = users.filter(user => user.email === email)
    return (user === 0) ? false : true
}


export function signup(user){
    if(userExists(user.email)) return false

    localStorage.setItem('users', JSON.stringify([...users, user]))
    return true
}


export function login(data){
    let user = users.filter(user => user.email === data.email)

    if(user === 0) return false

    user = user[0];
    
    if((user.email === data.email) && (user.password === data.password))
        return true

    return false
}