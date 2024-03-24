import axios from "axios";

class AttemptService {
    BASE_URL = "http://acme.com/api/examservice/attemp";
    ACCESS_CONTROL_HEADER = { 'Access-Control-Allow-Origin': true };

    async fetchAll(onSuccess, onError) {
        try {
            const response = await axios.get(this.BASE_URL, {
                headers: this.ACCESS_CONTROL_HEADER,
            });
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }

    async fetchByEmail(email, onSuccess, onError) {
        try {
            const response = await axios.get(`${this.BASE_URL}?email=${email}`, {
                headers: this.ACCESS_CONTROL_HEADER,
            });
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }
}

export default new AttemptService();