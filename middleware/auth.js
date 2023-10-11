import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  const token=req.cookies.token
  if(!token){
    throw new UnAuthenticatedError("Authentication invalid")
  }
  try {
    const payload=jwt.verify(token,process.env.JWT_SECRET)
    console.log(payload)
    req.user={userId:payload.userId}
    next()
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
