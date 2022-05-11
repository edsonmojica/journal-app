import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { error } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        name: 'Edgar Perez',
        email: 'ed@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            console.log('Formulario Correcto!');
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }

    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            //Swal.fire('Error', 'Name is required', 'error');
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is required'));
            //Swal.fire('Error', 'Email is required', 'error');
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('Password should be at least 5 characters and match with password'));
            //Swal.fire('Error', 'Password should be at least 5 characters and match with password', 'error');
            return false;
        }
        dispatch(removeError())
        return true;
    }


    return (
        <div>
            <h3 className='auth__title'>Register</h3>
            <form
                onSubmit={handleRegister}
                className='animate__animated animate__fadeIn animate__faster'
            >
                {
                    error &&
                    (
                        <div className='auth__alert-error'>
                            {error}
                        </div>
                    )
                }

                <input
                    type="text"
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    autoComplete='off'
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder='Confirm password'
                    name='password2'
                    className='auth__input'
                    autoComplete='off'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-5'>
                    Register
                </button>


                <Link to="/auth/login"
                    className='link mt-5'>
                    Already registered?
                </Link>
            </form>
        </div>
    )
}
