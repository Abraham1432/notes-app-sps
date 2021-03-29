export interface httpApiEnvironments {

    url?:string
}

export interface httpApiResponse {

    code?:number,
    msg?:string
}

export interface note {

    title?:string,
    content?:string,
    date?:string,
    user?:string,
    _id?:string,
    state?:boolean

}

export interface user {

    name?:string,
    _id?:string,
    state?:boolean

}