import { Box, Breadcrumbs, Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';
import { rootPath } from '../../App'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { postNewSocio } from '../../api/SociosApiCalls.js/SociosApiCalls';

const NewSocio = () => {

    const history = useHistory()
    const [Nombre, setNombre] = useState();
    const [Apellido, setApellido] = useState();
    const [Email, setEmail] = useState();
    const [Domicilio, setDomicilio] = useState();
    const [fechaNacimiento, setfechaNacimiento] = useState('');
    const [DNI, setDNI] = useState();
    const [Celular, setCelular] = useState();
    const [telFijo, settelFijo] = useState();
    const [Edad, setEdad] = useState();
    const [Alert, setAlert] = useState();
    const [AlertError, setAlertError] = useState()
    const [Error, setError] = useState()
    const [value, setValue] = React.useState("");

    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };
    const handleChangeDescripcion = (event) => {
        setApellido(event.target.value);
    };
    const handleChangeDomicilio = (event) => {
        setDomicilio(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    
    const handleChangeDNI = (event) => {
        setDNI(event.target.value);
    };
    const handleChangeCelular = (event) => {
        setCelular(event.target.value);
    };

    const handleChangeTelFijo = (event) => {
        settelFijo(event.target.value);
    };

    const handleChangeEdad = (event) => {
        setEdad(event.target.value);
    };





    function AddSocio() {
        setAlert(false);
        setAlertError(false);
        postNewSocio(Nombre,Apellido,Email,Edad,Domicilio,fechaNacimiento,DNI,Celular,telFijo,"ACTIVO").then((response) => {
          setAlert(true);
          Swal.fire({
            title: "Socio registrado con exito!",
            icon: 'success',
            willClose: () => {
              setTimeout(() => {
                history.push(rootPath + '/Socios');
              }, 1500);
            }
          })
          console.log(response);
        })

          .catch((error) => {
            setError(error, 'Error al registrar un Socio.');
            setAlertError(true);
            Swal.fire({
              title: error.response.data.message,
              icon: 'error',

            })
          });

    }
    function goToBack() {
        history.push(rootPath + '/Socios')
    }

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                <Link underline="hover" color="inherit" onClick={goToBack}>
                    Listado de Socios
                </Link>
                <Typography color="text.primary">Nuevo Socio</Typography>
            </Breadcrumbs>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField id="nombre" label="Nombre" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el nombre" value={Nombre} onChange={handleChangeNombre} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="descripcion" label="Apellido" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese apellido" variant="filled" value={Apellido} onChange={handleChangeDescripcion} />
                    </FormControl>
                </Grid>

            </Grid>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField id="hotmail" label="E-mail" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese el e-mail" value={Email} onChange={handleChangeEmail} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="domicilio" label="Domicilio"  sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese domicilio" variant="filled" value={Domicilio} onChange={handleChangeDomicilio} />
                    </FormControl>
                </Grid>

            </Grid>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de Nacimiento"
                                    value={fechaNacimiento}
                                    openTo='year'
                                    views={['year','month','day']}
                                    onChange={(newValue) => setfechaNacimiento(newValue)}
                                    format='DD/MM/YYYY'
                                    slotProps={{
                                        textField: {
                                          helperText: 'DD / MM / YYYY',
                                        },
                                      }}
                                />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                <Grid md={3} xs={10}  >
                    <FormControl >
                        <TextField id="dni" label="DNI" type={'number'} sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese DNI" variant="filled" value={DNI} onChange={handleChangeDNI} />
                    </FormControl>
                </Grid>
                    <FormControl >
                        <TextField id="edad"  type={'number'} label="Edad" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese Edad" variant="filled" value={Edad} onChange={handleChangeEdad} />
                    </FormControl>
            </Grid>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField id="celular" label="Celular" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese Nro. Celular" value={Celular} onChange={handleChangeCelular} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField id="telFijo" label="Tel. Fijo" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} helperText="Ingrese Tel. Fijo" variant="filled" value={telFijo} onChange={handleChangeTelFijo} />
                    </FormControl>
                </Grid>

            </Grid>




            <Stack spacing={2} sx={{ width: '100%' }}>
                <Button variant="contained" color='success' onClick={AddSocio}>
                    Registrar Socio
                </Button>

            </Stack>
        </Box>
    );
}

export default NewSocio;
