import axios from "axios";
const rootApiPath = "http://127.0.0.1:3000"


export const getAllSocios = async () =>{
    try {
        const response = await axios.get(rootApiPath+"/socio");
        return response.data;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export const getSocioById = async (SocioId)=>{
    try {
        const response = await axios.get(rootApiPath+"/socio/"+SocioId);
        return response.data;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export const postNewSocio = async (nombre,apellido,hotmail,edad,domicilio,fechaNacimiento,dni,celular,telFijo,estado) => {
    const body ={
        nombre:nombre,
        apellido:apellido,
        hotmail:hotmail,
        edad:edad,
        domicilio:domicilio,
        fechaNacimiento: fechaNacimiento,
        dni: dni,
        celular: celular,
        telFijo: telFijo,
        estado: estado
    }
    try {
        const response = await axios.post(rootApiPath+"/socio",body);
        return response;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export const updateSocio = async (id,nombre,apellido,hotmail,edad,domicilio,fechaNacimiento,dni,celular,telFijo) => {
    const body ={
        nombre:nombre,
        apellido:apellido,
        hotmail:hotmail,
        edad:edad,
        domicilio:domicilio,
        fechaNacimiento: fechaNacimiento,
        dni: dni,
        celular: celular,
        telFijo: telFijo,
    }
    try {
        const response = await axios.put(rootApiPath+"/socio/"+id,body);
        return response;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}