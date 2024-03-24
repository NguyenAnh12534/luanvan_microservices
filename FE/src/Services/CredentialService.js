import axios from "axios";
class CredentialService {
    BASE_URL = 'http://acme.com/auth';
    ACCESS_CONTROL_HEADER = { 'Access-Control-Allow-Origin': true }

    async login(email, password, onSuccess, onError) {
        try {
            const response = await axios.post(`${this.BASE_URL}/login`, {
                headers: this.ACCESS_CONTROL_HEADER,
                email: email,
                password: password,
            });
            onSuccess(response);
        } catch (error) {
            onError(error)
        }
    }
    
    async register(email, password, onSuccess, onError) {
        try {
            const response = await axios.post(`${this.BASE_URL}/register`, {
                headers: this.ACCESS_CONTROL_HEADER,
                email: email,
                password: password,
            });
            onSuccess(response);
        } catch (error) {
            onError(error)
        }
    }

    logOut() {
        localStorage.clear()
    }
}

export default new CredentialService();