import jwt from "jsonwebtoken";
export const  generateJwtToken=(payload)=>{
    const token=jwt.sign(payload,process.env.TOKEN_SECREAT_KEY)
    return token
} 