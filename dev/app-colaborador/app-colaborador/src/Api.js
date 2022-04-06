import axios from 'axios'

const api = axios.create({baseURL: "http://localhost:3000/api/colaboradores", headers:{"Content-Type": "application/json"}})

export async function getColaboradores(){
    try {
        const response=await api.get("")
        return response.data
    } catch (error) {
        
    }
}

export async function postColaboradores(colaborador){
    try {
        const response=await api.post("",JSON.stringify(colaborador))
        return response.data
    } catch (error) {
        
    }
}

export async function putColaboradores(colaborador){
    try {
        const response=await api.put("",JSON.stringify(colaborador))
        return response.data
    } catch (error) {
        
    }   
}

export async function deletColaboradores(id){
    try {
        const response=await api.delete("/"+id)
        return response.data
    } catch (error) {
        
    }
    
}