import React, { useEffect, useState } from 'react'
import { Alert, Avatar, Box, Button, CircularProgress, Grid, Paper, TextField } from '@mui/material';
import { Redirect } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

const Login = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const session=props.session;
    // const [succeed, setSucceed] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mayus, setMayus] = useState(false);

    const paperStyle = { padding: 20, height: '70vh', width: 300, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#041E42' }
    const scaniaImage = { backgroundImage: '#041E42' }
    const textfieldStyle = { margin: "10px auto" }
    const btnstyle = { margin: '8px 0' }



    useEffect(() => {
        const listener = (event) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                handleLogin();
                event.preventDefault();
            }
            document.addEventListener('keydown', function (event) {
                var mayus = event.getModifierState && event.getModifierState('CapsLock');
                if (mayus) setMayus(true);
                else setMayus(false);
            });
        };
        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [user, pass]); //only re-run the effect if user or password changes

    const handleLogin = () => {
        setLoading(true);
        if (user !== '' && pass !== '') {
            axios
                .post('http://artuiis0001/LoginAPI/login', {
                    UserName: user,
                    UserPass: pass,
                    Application: props.Application,
                })
                .then(function (response) {
                    if (response.data) {
                        const expireDay = new Date(new Date().getTime() + 4 * 60 * 60000);
                        const expireDayString = expireDay.toUTCString();
                        document.cookie = `session=${response.data.UserName}; expires=${expireDayString}; path=/;`;
                        document.cookie = `username=${user}; expires=${expireDayString}; path=/;`;
                        document.cookie = `token=${response.data.Token}; expires=${expireDayString}; path=/;`;
                        props.setSession(response.data.UserName);
                        // setSucceed(true);
                        setErrorMessage('');
                        setLoading(false);



                    }
                })
                .catch(function (error) {
                    // setSucceed(false);
                    if (error.response) {
                        setLoading(false);
                        console.log(error.response.status);
                        if (error.response.status === 404) setErrorMessage('Usuario no existente.');
                        if (error.response.status === 403) setErrorMessage('Usuario o contraseña incorrectos.');
                        if (error.response.status === 401) setErrorMessage('No tiene permisos para acceder a esta página.');
                        if (error.response.status === 500) {
                            setErrorMessage('Error interno del servidor. Excepción en consola');
                            console.log(error.response.data);
                        }
                    } else {
                        setLoading(false);
                        console.log(error);
                        setErrorMessage('Servidor rechazó la petición');
                        setErrorMessage(error.toString());
                    }
                });
        } else {
            setLoading(false);
            setErrorMessage('Debe ingresar usuario y contraseña!');
        }
    };
    const onChangeUser = (e) => {
        setUser(e.target.value);
    };
    const onChangePass = (e) => {
        setPass(e.target.value);
    };
    useEffect(() => {
        const listener = (event) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                handleLogin();
                event.preventDefault();
            }
            document.addEventListener('keydown', function (event) {
                var mayus = event.getModifierState && event.getModifierState('CapsLock');
                if (mayus) setMayus(true);
                else setMayus(false);
            });
        };
        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [user, pass]); //only re-run the effect if user or password changes

    // useEffect(()=>{console.log(succeed);},[succeed])
    return session == ''  ? (
        <Grid >
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
              
               
                <h1>SPARTA-GYM</h1>
                    <h2>Inicio de Sesión</h2>
                </Grid>
                <TextField onChange={onChangeUser} style={textfieldStyle} id="outlined-basic" label="Usuario" variant="outlined" placeholder='Enter username' fullWidth required />
                <TextField onChange={onChangePass} style={textfieldStyle} id="outlined-basic" label="Contraseña" variant="outlined" placeholder='Enter password' type='password' fullWidth required />
                <Button type='submit' onClick={handleLogin} color='primary' variant="contained" style={btnstyle} fullWidth> Iniciar Sesión </Button>
                {loading === true ?
                    (<>

                        <Grid align='center'><CircularProgress /></Grid>
                    </>
                    )
                    : (<></>)
                }
                { session ?
                    (
                        <>
                            <Alert severity="success">Se ha autenticado de forma exitosa!</Alert>
                        </>
                    ) : (<></>)
                }
                {errorMessage ?
                    (
                        <>
                            <Alert severity="error">{errorMessage}</Alert>
                        </>
                    ) : null
                }
                {mayus ?
                    (
                        <>
                            <Alert severity="warning">Mayusculas activadas!</Alert>
                        </>
                    ) : null
                }
                <Grid marginTop={5} align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon></LockOutlinedIcon></Avatar>
                
                </Grid>
            </Paper>
        </Grid>
    ) : (
        <Redirect to={'/Inicio'} push></Redirect>
    );
};
export default Login