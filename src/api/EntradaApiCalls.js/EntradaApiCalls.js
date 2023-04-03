import axios from "axios";
const rootApiPath = "http://127.0.0.1:3000"


export const getLastPagoById = async (IdSocio) =>{
    try {
        const response = await axios.get(rootApiPath+"/pago/"+IdSocio);
        return response.data.pago;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}
