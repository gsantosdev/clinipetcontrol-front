import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})


class ApiService {
    constructor(apiurl) {
        this.apiurl = apiurl
    }

    get(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl);
    }

    post(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
    
        try{
            return httpClient.post(requestUrl, objeto);
        }
        catch(E){
            return E;
        }
    }

    put(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto);

    }

    delete(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl);
    }

}

export default ApiService