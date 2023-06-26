export interface User{
    email:string,
    name:string,
    surname:string,
    username:string,
    password:string,
    birthDate:string,
    code:string
}

export interface InviteUser{
    email:string,
    name:string,
    surname:string,
    username:string,
    password:string,
    birthDate:string,
    inviterEmail:string
}