import { Autocomplete, Box, Breadcrumbs, Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { rootPath } from '../../App'
import { getAllSocios, postNewPago } from '../../api/SociosApiCalls.js/SociosApiCalls';

const NewPago = () => {

    const history = useHistory()
    const [Socios, setSocios] = useState([]);
    const [Socio, setSocio] = useState();
    const [Nombre, setNombre] = useState("");
    const [Apellido, setApellido] = useState("");
    const [Email, setEmail] = useState("");
    const [Domicilio, setDomicilio] = useState("");
    const [DNI, setDNI] = useState("");
    const [Edad, setEdad] = useState("");
    const [Image, setImage] = useState();


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

    const handleChangeEdad = (event) => {
        setEdad(event.target.value);
    };

    const handleImage = (event) => {
        console.log(event.target.files);
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    };

    useEffect(() => {
        getAllSocios().then((response) => {
            console.log(response);
            const parsedData = response.map((Socio) => {
                return {
                    id: Socio._id,
                    nombre: Socio.nombre,
                    apellido: Socio.apellido,
                    dni: Socio.dni,
                    celular: Socio.celular,
                    hotmail: Socio.hotmail,
                    edad: Socio.edad,
                    domicilio: Socio.domicilio
                };
            });
            setSocios(parsedData);
        }).catch((error) => {   
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if(Socio!==undefined)
        {
            setApellido(Socio.apellido)
            setNombre(Socio.nombre)
            setEdad(Socio.edad)
            setEmail(Socio.hotmail)
            setDNI(Socio.dni)
            setDomicilio(Socio.domicilio)
        }
  
    }, [Socio]);





    function AddPago() {
        // postNewPago(Nombre, Apellido, Email, Edad, Domicilio, fechaNacimiento, DNI, Celular, telFijo, "ACTIVO").then((response) => {
        //     Swal.fire({
        //         title: "Socio registrado con exito!",
        //         icon: 'success',
        //         willClose: () => {
        //             setTimeout(() => {
        //                 history.push(rootPath + '/Socios');
        //             }, 1500);
        //         }
        //     })

        //     console.log(response);
        // })

        //     .catch((error) => {
        //         Swal.fire({
        //             title: error.response.data.message,
        //             icon: 'error',

        //         })
        //     });

    }
    function goToBack() {
        history.push(rootPath + '/Pagos')
    }

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                <Link underline="hover" color="inherit" onClick={goToBack}>
                    Listado de Pagos
                </Link>
                <Typography color="text.primary">Nuevo Pago</Typography>
            </Breadcrumbs>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={Socios}
                        value={Socio}
                        onChange={(event, newValue) => {
                          setSocio(newValue);
                        }}
                        sx={{ width: 300 }}
                        getOptionLabel={(option) => option.dni}
                        renderInput={(params) => <TextField {...params} label="Socio" />}
                    />
                </Grid>


            </Grid>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField disabled id="nombre" label="Nombre" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} value={Nombre} onChange={handleChangeNombre} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField disabled id="apellido" label="Apellido" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} variant="filled" value={Apellido} onChange={handleChangeDescripcion} />
                    </FormControl>
                </Grid>

            </Grid>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '20rem' }} >
                        <TextField disabled id="hotmail" label="E-mail" variant="filled" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} value={Email} onChange={handleChangeEmail} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField disabled id="domicilio" label="Domicilio" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} variant="filled" value={Domicilio} onChange={handleChangeDomicilio} />
                    </FormControl>
                </Grid>

            </Grid>
            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid md={3} xs={10}  >
                    <FormControl >
                        <TextField disabled id="dni" label="DNI" type={'number'} sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} variant="filled" value={DNI} onChange={handleChangeDNI} />
                    </FormControl>
                </Grid>
                <FormControl >
                    <TextField id="edad" type={'number'} label="Edad" sx={{
                        ".css-1wc848c-MuiFormHelperText-root": {
                            fontSize: "1rem",
                        },
                    }} disabled variant="filled" value={Edad} onChange={handleChangeEdad} />
                </FormControl>
            </Grid>



            {/* <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
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
                    <Typography>{Image ? Image.name : null}</Typography>
                </Grid>
            </Grid> */}




            <Stack spacing={2} sx={{ width: '100%' }}>
                <Button variant="contained" color='success' onClick={AddPago}>
                    Registrar Pago
                </Button>

            </Stack>
        </Box>
    );
}

export default NewPago;
