import { Autocomplete, Box, Breadcrumbs, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { rootPath } from '../../App'
import { getAllSocios } from '../../api/SociosApiCalls.js/SociosApiCalls';
import Swal from 'sweetalert2';
import { postNewPago } from '../../api/PagosApiCalls.js/PagosApiCalls';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
    const [FechaPago, setFechaPago] = useState('');
    const [TipoPago, setTipoPago] = useState('MENSUAL');
    const [TipoEntrenamiento, setTipoEntrenamiento] = useState('APARATOS');
    const [Monto, setMonto] = useState('');
    const [Cuotas, setCuotas] = useState('1');


    const PAGOS =
        [
            'MENSUAL',
            'CLASE'
        ]

    const ENTRENAMIENTO =
        [
            "CALISTENIA",
            "APARATOS",
            "FUNCIONAL"
        ]




    useEffect(() => {
        getAllSocios().then((response) => {
            console.log(response);
            const parsedData = response.map((Socio) => {
                return {
                    id: Socio._id,
                    nombre: Socio.nombre,
                    apellido: Socio.apellido,
                    hotmail: Socio.hotmail,
                    edad: Socio.edad,
                    domicilio: Socio.domicilio,
                    fechaNacimiento:Socio.fechaNacimiento,
                    dni: Socio.dni,
                    celular: Socio.celular,
                    telFijo:Socio.telFijo,
                    estado:Socio.estado
                };
            });
            setSocios(parsedData);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        console.log(Socio);
        if(Socio===null)
        {
            setApellido("")
            setNombre("")
            setEdad("")
            setEmail("")
            setDNI("")
            setDomicilio("")
        }
        if (Socio !== undefined && Socio!==null) {
            setApellido(Socio.apellido)
            setNombre(Socio.nombre)
            setEdad(Socio.edad)
            setEmail(Socio.hotmail)
            setDNI(Socio.dni)
            setDomicilio(Socio.domicilio)
        }

    }, [Socio]);

    const handleChangeTipoPago = (event) => {
        setTipoPago(event.target.value);
    };

    const handleChangeTipoEntrenamiento = (event) => {
        setTipoEntrenamiento(event.target.value);
    };

    const handleChangeMonto = (event) => {
        setMonto(event.target.value);
        console.log(event.target.value);
    };
    const handleChangeCuotas = (event) => {
        setCuotas(event.target.value);
        console.log(event.target.value);
    };

    function AddPago() {


        if (FechaPago === '') {
            return Swal.fire({
                title: 'Por favor ingrese fecha de pago.',
                icon: 'error',
            })
        }

        if (Monto === '') {
            return Swal.fire({
                title: 'Por favor ingrese un monto.',
                icon: 'error',
            })
        }
        if (Socio !== undefined && Socio!==null) {
            postNewPago(Socio, TipoEntrenamiento, TipoPago, Monto, FechaPago, Cuotas).then((response) => {
                Swal.fire({
                    title: "Pago realizado con exito!",
                    icon: 'success',
                    willClose: () => {
                        history.push(rootPath + '/Pagos');
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
        else {
            Swal.fire({
                title: 'Por favor seleccione un socio antes de generar un pago.',
                icon: 'error',
            })
        }



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
                        }} value={Nombre} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField disabled id="apellido" label="Apellido" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} variant="filled" value={Apellido} />
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
                        }} value={Email} />
                    </FormControl>
                </Grid>
                <Grid md={6} xs={10}  >
                    <FormControl fullWidth>
                        <TextField disabled id="domicilio" label="Domicilio" sx={{
                            ".css-1wc848c-MuiFormHelperText-root": {
                                fontSize: "1rem",
                            },
                        }} variant="filled" value={Domicilio} />
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
                        }} variant="filled" value={DNI} />
                    </FormControl>
                </Grid>
                <FormControl >
                    <TextField id="edad" type={'number'} label="Edad" sx={{
                        ".css-1wc848c-MuiFormHelperText-root": {
                            fontSize: "1rem",
                        },
                    }} disabled variant="filled" value={Edad} />
                </FormControl>
            </Grid>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Tipo de Pago</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={TipoPago}
                            label="Tipo de Pago"
                            onChange={handleChangeTipoPago}
                        >
                            {PAGOS.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))
                            }


                        </Select>
                    </FormControl>

                </Grid>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tipo de Entrenamiento</InputLabel>
                        <Select

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={TipoEntrenamiento}
                            label="Tipo de Entrenamiento"
                            onChange={handleChangeTipoEntrenamiento}
                        >
                            {ENTRENAMIENTO.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))
                            }


                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ margin: 10, marginLeft: 10 }}>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ width: '10rem' }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Fecha de Pago"
                                openTo='year'
                                views={['year', 'month', 'day']}
                                value={FechaPago}
                                onChange={(newValue) => {
                                    setFechaPago(newValue);
                                }}
                                inputFormat='DD/MM/YYYY'
                                renderInput={(params) => <TextField {...params} helperText='Ingrese fecha de Pago' />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>

                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Monto</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Monto"
                            value={Monto}
                            onChange={handleChangeMonto}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} md={3} style={{ marginBottom: 10 }} >
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Cuotas</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            label="Cuotas"
                            type='number'
                            value={Cuotas}
                            onChange={handleChangeCuotas}
                        />
                    </FormControl>
                </Grid>
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
