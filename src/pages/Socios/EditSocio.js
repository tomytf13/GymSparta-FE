import { Box, Breadcrumbs, Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { rootPath } from '../../App'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getSocioById, postNewSocio, updateSocio } from '../../api/SociosApiCalls.js/SociosApiCalls';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const EditSocio = () => {
    let { id } = useParams();
    const history = useHistory()
    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [Email, setEmail] = useState('');
    const [Domicilio, setDomicilio] = useState('');
    const [fechaNacimiento, setfechaNacimiento] = useState("");
    const [DNI, setDNI] = useState('');
    const [Celular, setCelular] = useState('');
    const [telFijo, settelFijo] = useState('');
    const [Edad, setEdad] = useState('');
    const [Alert, setAlert] = useState();
    const [AlertError, setAlertError] = useState()
    const [Error, setError] = useState()
    const [value, setValue] = React.useState("");
    
    useEffect(() => {
        console.log(id);
        getSocioById(id).then((response) => {
            console.log(response);
            setNombre(response.nombre)
            setApellido(response.apellido)
            setCelular(response.celular)
            setDNI(response.dni)
            setDomicilio(response.domicilio)
            setEdad(response.edad)
            setfechaNacimiento(response.fechaNacimiento)
            settelFijo(response.telFijo)
            setEmail(response.hotmail)
        }).catch((error) => {
            console.log(error);
        })
    }, []);

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

 

    function EditSocio() {
        setAlert(false);
        setAlertError(false);
        updateSocio(id,Nombre, Apellido, Email, Edad, Domicilio, fechaNacimiento, DNI, Celular, telFijo).then((response) => {
            setAlert(true);
            Swal.fire({
                title: "Socio editado con exito!",
                icon: 'success',
                willClose: () => {
                    // setTimeout(() => {
                        history.push(rootPath + '/Socios');
                    // }, 500);
                }
            })
            console.log(response);
        })

            .catch((error) => {
                setError(error, 'Error al editar un Socio.');
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
                <Typography color="text.primary">Editar Socio</Typography>
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




            <Stack spacing={2} sx={{ width: '100%' }}>
                <Button variant="contained" color='warning' onClick={EditSocio}>
                    Editar Socio
                </Button>

            </Stack>
        </Box>
    );
}

export default EditSocio;
