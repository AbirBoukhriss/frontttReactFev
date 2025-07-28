import axios from "axios";
const apiUrl = 'http://localhost:5001/users';
export async function getAllUsers() {
    return await axios.get('${apiUrl}/getAllUsers')
    }

export async function getUserById() {
    return await axios.get('${apiUrl}/getUserById')
    }

export async function deleteUser(id) {
    return await axios.delete('${apiUrl}/deleteUser/${id}')
    }

    
 export async function addUserClient(userData) {
    return await axios.post('${apiUrl}/addUserClient')
    }   

     export async function updateuserById(iserId,userData) {
    return await axios.put('${apiUrl}/updateuserById/${userId}',userData)
    } 
        export async function updateuserById(iserId,userData) {
    return await axios.put('${apiUrl}/updateuserById/${userId}',userData)
    } 
 
