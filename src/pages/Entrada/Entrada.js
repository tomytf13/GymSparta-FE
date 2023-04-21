import { Autocomplete, Box, Breadcrumbs, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { getAllSocios } from '../../api/SociosApiCalls.js/SociosApiCalls';
import { rootPath } from '../../App';
import { getLastPagoById } from '../../api/EntradaApiCalls.js/EntradaApiCalls';
import Swal from 'sweetalert2';

const Entrada = () => {
    const history = useHistory()
    const [Socios, setSocios] = useState([]);
    const [Socio, setSocio] = useState();


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


    function check(){
        if (Socio !== undefined && Socio!== null) {
            getLastPagoById(Socio.id).then((response) => {
                console.log(response);
                const pago = response
                let hoy = new Date()
                let fechahoy = Date.parse(hoy);
                let vencimiento = Date.parse(pago.vencimiento);
                if (fechahoy <= vencimiento) {
                    Swal.fire({
                        title: 'Socio: ' + Socio.nombre + ' ' + Socio.apellido + ' se encuentra al dia! 😊<br> El proximo vencimiento es: <br>'+ (new Date(pago.vencimiento)).getDate() + '/' +  ((new Date(pago.vencimiento)).getMonth()+1) + '/' +  (new Date(pago.vencimiento)).getFullYear(),
                        icon: 'success',
                    })
                }
                else {
                    Swal.fire({
                        title: 'El socio: ' + Socio.nombre + ' ' + Socio.apellido + ' no se encuentra al dia ! 😒 Su vencimiento fue el : <br>'+ (new Date(pago.vencimiento)).getDate() + '/' +  ((new Date(pago.vencimiento)).getMonth()+1) + '/' +  (new Date(pago.vencimiento)).getFullYear(),
                        icon: 'error',
                    })
                }

            }).catch((error) =>
                Swal.fire({
                    title: 'No existen pagos para el socio ingresado ! 🤔',
                    icon: 'error',
                })
            )

        }
    }

    function goToBack() {
        history.push(rootPath + '/Socios')
    }
    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                <Link underline="hover" color="inherit" onClick={goToBack}>
                    Inicio
                </Link>
                <Typography color="text.primary">Entrada</Typography>
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

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Button variant="contained" color='success' type='submit'  onClick={check}>
                   Check
                </Button>

            </Stack>

        </Box>
    );
}

export default Entrada;
