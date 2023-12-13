
type Param = {
         username: string,
         password: string, 
         email: string,
         profile_picture: string
}
export const checkValue = (data : Param )=>{
     if(data.username && data.password && data.email && data.profile_picture && data){
         
     }
     else {
        return false;
     }
}