import { Box, Breadcrumbs, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllSocios } from '../../api/SociosApiCalls.js/SociosApiCalls';
import { rootPath } from '../../App';

const ListadoSocios = () => {

    const history = useHistory();
    const [Socios, setSocios] = useState([]);
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
        { field: 'id', headerName: 'ID Socio', width: 100, headerAlign: 'center', hide: true },
        {
            field: 'nombre',
            headerName: 'Nombre del Socio',
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
        //     headerAlign: 'center',
        //     disableClickEventBubbling: true,
        //     renderCell: (params) => {
        //         const onEdit = (e) => {
        //             const currentRow = params.row;
        //             history.push(rootPath + '/Modelos/EditModelo/' + currentRow.id)
        //         };

        //         const onDelete = (e) => {
        //             const currentRow = params.row;
        //             Swal.fire({
        //                 title: "Esta seguro que desea eliminar el modelo?",
        //                 icon: 'warning',
        //                 showCancelButton: true,
        //                 confirmButtonColor: '#3085d6',
        //                 cancelButtonColor: '#d33',
        //                 cancelButtonText: 'Cancelar',
        //                 confirmButtonText: 'Si, eliminar',
        //                 preConfirm: () => {
        //                     console.log(currentRow);
        //                     deleteSocio(currentRow.id).then((reponse) => {
        //                         Swal.fire({
        //                             title: "Modelo eliminado con exito!",
        //                             icon: 'success',
        //                             willClose: () => {
        //                                 loadDataTable()
        //                             }
        //                         })
        //                     })
        //                         .catch((error) => {
        //                             Swal.fire({
        //                                 title: 'Error al eliminar un modelo, intentelo nuevamente',
        //                                 icon: 'error',

        //                             })
        //                         });
        //                 }
        //             })

        //         }
        //         return (
        //             <Stack direction="row" spacing={2}>
        //                 <Button variant="contained" startIcon={<EditIcon></EditIcon>} color="warning" size="small" onClick={onEdit}>Editar</Button>
        //                 <Button variant="contained" startIcon={<DeleteIcon></DeleteIcon>} color="error" size="small" onClick={onDelete}>Borrar</Button>
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

    useEffect(() => {
        setLoadingData(true)
        getAllSocios().then((response) => {
            const parsedData = response.map((Socio) => {
                return {
                    id: Socio._id,
                    nombre: Socio.nombre,
                    apellido: Socio.apellido,
                    dni: Socio.dni,
                    celular: Socio.celular
                };
            });
            setSocios(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar Socios.');
        });

    }, [])


    const goToNewSocio = () => {
        history.push(rootPath + '/Socios/NewSocio')
    };

    const loadDataTable = () => {
        getAllSocios().then((response) => {
            const parsedData = response.map((Socio) => {
                return {
                    id: Socio._id,
                    nombre: Socio.nombre,
                    apellido: Socio.apellido,
                    dni: Socio.dni,
                    celular: Socio.celular
                };
            });
            setSocios(parsedData);
            setLoadingData(false)
        }).catch((error) => {
            setError(error, 'Error al listar Socios.');
        });

    }



    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" style={{ margin: 15 }}>
                <Link underline="hover" color="inherit" onClick={() => history.push(rootPath + "/Inicio")}>
                    Inicio
                </Link>
                <Typography color="text.primary">Listado de Socios</Typography>
            </Breadcrumbs>
            <Button color="primary" onClick={goToNewSocio} variant="contained" size='small'>Nuevo Socio</Button>
            {loadingData === true ?
                (<><Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10rem" }}>
                    <CircularProgress size={"10rem"} />
                </Box></>)
                :
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={Socios}
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

export default ListadoSocios;
