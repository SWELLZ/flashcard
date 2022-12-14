import { getAuth, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from '../../resources/google-logo-png-open-2000.png'
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const {createUser, redirectResult, signInWithGoogle} = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const provider = new GoogleAuthProvider();
    redirectResult(auth)

    const handleSignUp = async e => {
        e.preventDefault();
        if (password !== confirmPassword){
            setError('Passwords do not match');
            setTimeout(() => {
                setError('');
            }, 3000)
            return;
        }
        try {
            await createUser(email, password);
            const auth = getAuth();
            await sendEmailVerification(auth.currentUser);
            navigate('/profile')
        } catch (e) {
            console.error(e);
        }
    }

    const handleGoogleSignIn = async () => {
        await signInWithGoogle(auth, provider);
        navigate('/profile');
    }

    return (
        <div className='sign-in-container'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <div className='input-field'>
                    <label htmlFor='email'>Enter Email:</label>
                    <input
                        id='email'
                        type='email'
                        placeholder='Email...'
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Enter Password:</label>
                    <input
                        id='password'
                        type='password'
                        placeholder='Password...'
                        onChange={e => setPassword(e.target.value)}
                        min='3'
                        required
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor='confirm-password'>Confirm Password:</label>
                    <input
                        id='confirm-password'
                        type='password'
                        placeholder='Confirm Password...'
                        onChange={e => setConfirmPassword(e.target.value)}
                        min='3'
                        required
                    />
                </div>
                <div className='user-actions'>
                    <button type='submit' className='sign-in-btn'>Sign Up</button>
                    <button type='button' onClick={handleGoogleSignIn} className='google-sign-in'>
                        <img src={google} alt='google' />
                    </button>
                    <Link to='/sign-in' className='link-to-signup'>Already have an account? Sign In</Link>
                </div>
                {error && <p className='error-msg'>{error}</p>}
            </form>
        </div>
    )
}

export default SignUp