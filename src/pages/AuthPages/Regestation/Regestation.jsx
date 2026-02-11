import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";

const Regestation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {createUser} = UseAuth();

  const onSubmit = data => {
    console.log(data);
    createUser(data.email,data.password)
    .then(result =>{
      console.log(result.user);
    })
    .catch(err =>{
      console.error(err);
    })
  };

  return (
    <div className="card text-center lg:text-left">
      <h1 className="text-5xl font-bold">Create a New Account</h1>

      <div className='card-body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input w-full"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              type="password"
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600 text-xs">please enter your password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 text-xs">
                password must be 6 charecter
              </p>
            )}
            <button className="btn btn-success text-black mt-4">Register</button>
          </fieldset>

          <p>Already have a account ? <Link to='/login' className="text-primary">Sign In</Link></p>
        </form>
       
      </div>
    </div>
  );
};

export default Regestation;
