import { Box, Breadcrumbs, Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';
import { rootPath } from '../../App'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { postNewSocio } from '../../api/SociosApiCalls.js/SociosApiCalls';
import { MobileDatePicker } from '@mui/x-date-pickers';

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
    const [Image,setImage] = useState();

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

    const handleImage = (event) => {
        console.log(event.target.files);
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    };





    function AddSocio() {
        if (Nombre===undefined) {
            return Swal.fire({
                title: 'Por favor ingresar nombre del socio.',
                icon: 'error',

            })
        }
        if (Apellido===undefined) {
            return Swal.fire({
                title: 'Por favor ingresar apellido del socio.',
                icon: 'error',

            })
        }
        if (Domicilio===undefined) {
            return Swal.fire({
                title: 'Por favor ingresar domicilio del socio.',
                icon: 'error',

            })
        }
        if (Edad===undefined) {
            return Swal.fire({
                title: 'Por favor ingresar edad del socio.',
                icon: 'error',

            })
        }
   
        if (fechaNacimiento==='') {
            return Swal.fire({
                title: 'Por favor ingresar fecha de nacimiento del socio.',
                icon: 'error',

            })
        }
        if (DNI===undefined) {
            return Swal.fire({
                title: 'Por favor ingresar DNI del socio.',
                icon: 'error',

            })
        }
        postNewSocio(Nombre, Apellido, Email, Edad, Domicilio, fechaNacimiento, DNI, Celular, telFijo, "ACTIVO").then((response) => {
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
                        <TextField id="domicilio" label="Domicilio" sx={{
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
                        <MobileDatePicker
                                label="Fecha de Nacimiento"
                                openTo='year'
                                views={['year','month','day']}
                                value={fechaNacimiento}
                                onChange={(newValue) => {
                                    setfechaNacimiento(newValue);
                                }}
                                inputFormat='DD/MM/YYYY'
                                renderInput={(params) => <TextField {...params}  helperText='Ingrese fecha de nacimiento'/>}
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
                    <TextField id="edad" type={'number'} label="Edad" sx={{
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

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Foto del Socio
                        <input
                            onChange={handleImage}
                            type="file"
                            hidden
                        />
                    </Button>
                </Grid>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                <Typography>{Image? Image.name: null}</Typography>
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
