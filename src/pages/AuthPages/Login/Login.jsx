import React from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "../socialLogin/SocialLogin";
import { Link } from "react-router";

const Login = () => {

const {register,handleSubmit, formState: { errors }} = useForm()

 const onSubmit = data =>{
    console.log(data);
 }



  return (
    <div className="card">
     <div className="card-body">
       <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset class="fieldset">

          <label class="label">Email</label>
          <input type="email" {...register('email')} class="input w-full" placeholder="Email" />


          <label class="label">Password</label>
          <input type="password"{...register('password',{required:true,
          minLength:6,
          
          })} 
          className="input w-full" placeholder="Password" />
            {
                errors.password?.type === "required" &&(<p
                className="text-xs text-red-500">password is required</p>)
            }
            {
                errors.password?.type === 'minLength' && (<p className="text-red-600 text-xm">Password must be 6 charecter</p>)
            }
           
          <div>
            <a class="link link-hover">Forgot password?</a>
          </div>
          <button class="btn btn-neutral mt-4 w-full">Login</button>
        </fieldset>
      </form>
      <SocialLogin ></SocialLogin>
     </div>
     <Link to='/register' className="text-center text-success underline">Sign Up</Link>
    </div>
  );
};

export default Login;
