import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import logo from '../image/Blogger-Logo.png'

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    margin-top: 50px;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.4);
`
const Image = styled('img')({
    width: 200,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button {
        margin-top: 20px;
    }
`
// const LoginButton = styled(Button)`
//     text-transform: none;
//     background: #FB641B;
//     color: #fff;
//     height: 48px;
//     border-radius: 2px;
// `;

// const SignupButton = styled(Button)`
//     text-transform: none;
//     background: #fff;
//     color: #2874f0;
//     height: 48px;
//     border-radius: 2px;
//     box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
// `;

// const Text = styled(Typography)`
//     color: #878787;
//     font-size: 12px;
// `;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitials = {
    username: '',
    password: ''
};

const signupInitials = {
    name: '',
    username: '',
    password: ''
}
const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitials);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitials);

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    useEffect(() => {
        showError(false);
    }, [login, signup])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value});
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        
        if (response.isSuccess) {
            showError('');
            
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            // setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitials);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    return (
        <Component>
            <Box>
                <Image src={logo} alt="blog" />
                {
                    account === 'login' ?
                    <Wrapper>
                        <TextField id="standard-basic" value={login.username} label="Enter username" onChange={(e) => onValueChange(e)} name='username' variant="standard" />
                        <TextField id="standard-basic" value={login.password} label="Enter password" onChange={(e) => onValueChange(e)} name='password' variant="standard" />
                        <Button variant="contained" onClick={() => loginUser()}>Login</Button>
                        <Button onClick={() => toggleAccount('signUp')}>Create Account</Button>
                    </Wrapper>
                :
                    <Wrapper>
                        <TextField id="standard-basic" value={signup.name} onChange={(e) => onInputChange(e)} name='name' label="Enter Name" variant="standard" />
                        <TextField id="standard-basic" value={signup.username} onChange={(e) => onInputChange(e)} name='username' label="Enter Username" variant="standard" />
                        <TextField id="standard-basic" value={signup.password} onChange={(e) => onInputChange(e)} name='password' label="Enter Password" variant="standard" />
                        { error && <Error>{error}</Error> }
                        <Button onClick={() => signupUser()} variant="contained">Signup</Button>
                        <Button onClick={() => toggleAccount('login')}>Already have an Account</Button>
                    </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;