import axios from "axios";

const baseUrl = "https://localhost:44322/api/"

//This API uses axios, fetch() can also be used
export default {

    NotificationMsg(url = baseUrl + 'NotificationMessage/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}