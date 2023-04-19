import axios from "axios";
const rootApiPath = "http://127.0.0.1:3000"


export const getAllPagos = async () =>{
    try {
        const response = await axios.get(rootApiPath+"/pago");
        return response.data;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}


export const postNewPago = async (IdSocio,TipoEntrenamiento,TipoPago,Monto,FechaPago,Cuotas) => {
    const body ={
        idSocio:IdSocio,
        tipoEntrenamiento:TipoEntrenamiento,
        tipoPago:TipoPago,
        monto:Monto,
        fechaPago: FechaPago,
        cuotas:Cuotas
    }
    console.log(body);
    try {
        const response = await axios.post(rootApiPath+"/pago",body);
        return response;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

