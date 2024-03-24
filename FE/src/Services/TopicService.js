import axios from 'axios';

class TopicService {
    BASE_URL = 'http://acme.com/api/examservice/Topic';
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
}

export default new TopicService();
