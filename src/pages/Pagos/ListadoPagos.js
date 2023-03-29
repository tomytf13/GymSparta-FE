import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllSocios } from '../../api/SociosApiCalls.js/SociosApiCalls';
import { rootPath } from '../../App';
import { getAllPagos } from '../../api/PagosApiCalls.js/PagosApiCalls';

const ListadoPagos = () => {

    const history = useHistory();
    const [Pagos, setPagos] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);
  
    const columns = [
        { field: 'id', headerName: 'ID Pago', width: 100, headerAlign: 'center', hiden: true },
        {
            field: 'idSocio',
            headerName: 'Socio ID',
            width: 300,
        },
        {
            field: 'tipoEntrenamiento',
            headerName: 'Tipo de Entrenamiento',
            width: 200,
        },
        {
            field: 'tipoPago',
            headerName: 'Tipo de Pago',
            width: 200,
        }
        ,
        {
            field: 'monto',
            headerName: 'Monto $',
            width: 100,
        },
        {
            field: 'fechaPago',
            headerName: 'Fecha de Pago',
            width: 300,
        },
    ];



    const setError = (error, header) => {
        let message;
        if (error.response) {
            message = error.response.data.Message;
        }
        console.log(error);
       
    };

    useEffect(() => {
        setLoadingData(true)
        getAllPagos().then((response) => {
            const parsedData = response.map((Pago) => {
                return {
                    id: Pago._id,
                    idSocio: Pago.idSocio,
                    tipoEntrenamiento: Pago.tipoEntrenamiento,
                    tipoPago: Pago.tipoPago,
                    monto: Pago.monto,
                    fechaPago:  (new Date(Pago.createAt)).getDate() + '/' +  (new Date(Pago.createAt)).getMonth() + '/' +  (new Date(Pago.createAt)).getFullYear()+ ' ' + (new Date(Pago.createAt)).getHours()+':'+ (new Date(Pago.createAt)).getMinutes()
                };
            });
            setPagos(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar Pagos.');
        });

    }, [])


    const goToNewPago = () => {
        history.push(rootPath + '/Pagos/NewPago')
    };

    // const loadDataTable = () => {
    //     getAllSocios().then((response) => {
    //         const parsedData = response.map((Socio) => {
    //             return {
    //                 id: Socio._id,
    //                 nombre: Socio.nombre,
    //                 apellido: Socio.apellido,
    //                 dni: Socio.dni,
    //                 celular: Socio.celular
    //             };
    //         });
    //         setSocios(parsedData);
    //         setLoadingData(false)
    //     }).catch((error) => {
    //         setError(error, 'Error al listar Socios.');
    //     });

    // }



    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                <Link underline="hover" color="inherit" onClick={() => history.push(rootPath + "/Inicio")}>
                    Inicio
                </Link>
                <Typography color="text.primary">Listado de Pagos</Typography>
            </Breadcrumbs>
            <Button color="primary" onClick={goToNewPago} variant="contained" size='small'>Nuevo Pago</Button>
            {loadingData === true ?
                (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                    <CircularProgress size={"10rem"} />
                </Box></>)
                :
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={Pagos}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel);
                        }}
                    />
                </Box>
            }

        </Box>
    );
}

export default ListadoPagos;
