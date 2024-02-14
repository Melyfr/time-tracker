import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import { tasksApi } from '../store/services/TasksApi'
import '../style/LogIn.css'
import { useState } from 'react'

export type SignupInputs = {
    login: string
    name: string
    pswrd: string
  }

const SignUp:React.FC = () => {
    const [errorText, setErrorText] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInputs>();
    const [signupUser, {}] = tasksApi.useSignupUserMutation();

    const onSubmit: SubmitHandler<SignupInputs> = async(inputs) => {
        try {
            await signupUser(inputs).unwrap();
            navigate("/login");
          } catch (error:any) {
            console.log(error.data);
            setErrorText(error.data);
          }
    }
   
    return (
        <div className="container">
            <section className="login">
                <div className="login__header">
                    <Link to='/login'><h2 className='login__title'>Log In</h2></Link>
                    <h2 className='login__title login__title-active'>Sign Up</h2>
                </div>
                <div className="login__body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className='login__label'>
                            Login:
                            <input {...register("login", { required: true })} className='login__input' type='text'/>
                        </label>
                        <label className='login__label'>
                            Name:
                            <input {...register("name", { required: true })} className='login__input' type='text'/>
                        </label>
                        <label className='login__label'>
                            Password:
                            <input {...register("pswrd", { required: true })} className='login__input'  type='password'/>
                        </label>
                        {errors.login && <div className='login__error'>This fields is required</div>}
                        {errorText && <div className='login__error'>{errorText}</div>}
                        <input type="submit" className='login__input login__submit' value='Sign Up'/>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default SignUp;