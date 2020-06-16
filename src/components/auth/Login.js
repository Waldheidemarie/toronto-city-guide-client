import React, {useState} from 'react';
import { Container, Typography, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import axios from 'axios'

export default function Login () {
	const [userInfo, setUserInfo] = useState({
		username: '',
		password: ''
	});

	const handleLogin = async (e) => {
		e.preventDefault();
		const loginRes = await axios.post('http://localhost:5000/auth/login', userInfo);
    localStorage.setItem('auth-token', loginRes.data.token);
	}
	
    return (
        <div>
            <Container>
							<Typography variant='h2'>Login</Typography>
            	<form onSubmit={handleLogin}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input id="username" type="text" value={userInfo.username} onChange={e => setUserInfo({...userInfo, username: e.target.value})} /> 
                </FormControl>
								<FormControl fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" type="password" value={userInfo.password} onChange={e => setUserInfo({...userInfo, password: e.target.value})}/>  
                </FormControl>
								<Button variant='contained' type='submit'>Submit</Button>
              </form>
            </Container>
        </div>
    )
}