// import { z } from "zod";
// import { loginSchema, signupSchema } from "./auth.valdiation";
export interface TSignupResponse {
    
    email: string;
    password: string;
    
}
export interface TLoginResponse {
       username:string;
       
}

// export type  loginDTO = z.infer<typeof loginSchema.body>;
// export type  signupDTO = z.infer<typeof signupSchema.body>;

