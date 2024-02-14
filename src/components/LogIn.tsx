import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import { tasksApi } from '../store/services/TasksApi'
import IUser from '../interfaces/IUser'
import '../style/LogIn.css'
import { useState } from 'react'

export type LoginInputs = {
    login: string
    pswrd: string
  }
  
const LogIn:React.FC = () => {
    const [errorText, setErrorText] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>();
    const [loginUser, {}] = tasksApi.useLoginUserMutation();

    const onSubmit: SubmitHandler<LoginInputs> = async(inputs) => {
        try {
            const payload:IUser = await loginUser(inputs).unwrap();
            if (payload.accessToken) {
                localStorage.setItem("user", JSON.stringify(payload));
                navigate("/");
            }
          } catch (error:any) {
            console.log(error.data);
            setErrorText(error.data);
          }
    }
   
    return (
        <div className="container">
            <section className="login">
                <div className="login__header">
                    <h2 className='login__title login__title-active'>Log In</h2>
                    <Link to='/signup'><h2 className='login__title'>Sign Up</h2></Link>
                </div>
                <div className="login__body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className='login__label'>
                            Login:
                            <input {...register("login", { required: true })} className='login__input' type='text'/>
                        </label>
                        <label className='login__label'>
                            Password:
                            <input {...register("pswrd", { required: true })} className='login__input' type='password'/>
                        </label>
                        {errors.login && <div className='login__error'>This fields is required</div>}
                        {errorText && <div className='login__error'>{errorText}</div>}
                        <input type="submit" className='login__input login__submit' value='Sign In'/>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LogIn;