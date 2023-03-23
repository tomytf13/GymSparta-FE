import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllSocios } from '../../api/SociosApiCalls.js/SociosApiCalls';
import { rootPath } from '../../App';

const ListadoPagos = () => {

    const history = useHistory();
    const [Pagos, setPagos] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);
    const [modalProps, setModalProps] = useState({
        show: false,
        message: '',
        header: '',
        type: '',
        confirmButtonMessage: '',
        onConfirm: () => { },
    });

    const columns = [
        { field: 'id', headerName: 'ID Pago', width: 100, headerAlign: 'center', hiden: true },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 300,
        },
        {
            field: 'apellido',
            headerName: 'Apellido',
            width: 300,
        },
        {
            field: 'dni',
            headerName: 'DNI',
            width: 300,
        }
        ,
        {
            field: 'celular',
            headerName: 'Celular',
            width: 300,
        },
        // {
        //     field: 'acciones',
        //     headerName: 'Acciones',
        //     width: 300,
        //     disableClickEventBubbling: true,
        //     renderCell: (params) => {
        //         const onEdit = (e) => {
        //             const currentRow = params.row;
        //             history.push(rootPath + '/Socios/EditSocio/' + currentRow.id)
        //         };
        //         return (
        //             <Stack direction="row" spacing={2}>
        //                 <Button variant="contained" startIcon={<EditIcon></EditIcon>} color="warning" size="small" onClick={onEdit}>Editar</Button>
        //             </Stack>
        //         );
        //     },
        // }
    ];



    const setError = (error, header) => {
        let message;
        if (error.response) {
            message = error.response.data.Message;
        }
        console.log(error);
        setModalProps({
            show: true,
            message: message ? message : error.message,
            header: header ? header : 'Error',
            type: 'error',
        });
    };

    // useEffect(() => {
    //     setLoadingData(true)
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

    // }, [])


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
