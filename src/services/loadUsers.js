import api from './api';


export default async function loadUsers(loggedUserId) {
    const response = await api.post('/devs/index', [] ,{
        headers : { 
            fromdevid: loggedUserId
        }
    });
    return response.data;
}