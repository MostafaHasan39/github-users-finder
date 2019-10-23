export default interface UserSearchResults{
    total_count:number,
    items:{
        id:number|string
        login:string,
        avatar_url:string
    }[]
}