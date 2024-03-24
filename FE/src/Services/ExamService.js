import axios from 'axios';

class ExamService {
    BASE_URL = 'http://acme.com/api/examservice/Exam';
    ACCESS_CONTROL_HEADER = { 'Access-Control-Allow-Origin': true };

    async getById(examId, onSuccess, onError) {
        try {
            const response = await axios.get(this.BASE_URL + "/" + examId, {
                headers: this.ACCESS_CONTROL_HEADER,
            });
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }

    async getByEmail(email, onSuccess, onError) {
        try {
            const response = await axios.get(this.BASE_URL + "/author/" + email, {
                headers: this.ACCESS_CONTROL_HEADER,
            });
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }

    async getAll(onSuccess, onError) {
        try {
            const response = await axios.get(this.BASE_URL, {
                headers: this.ACCESS_CONTROL_HEADER,
            });
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }

    async create(topicId, payload, onSuccess, onError) {
        try {
            const response = await axios.post(
                this.BASE_URL + '/topic/' + topicId,
                {
                    name: payload.name,
                    authorEmail: payload.authorEmail,
                },
                {
                    headers: this.ACCESS_CONTROL_HEADER,
                },
            );
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }

    async update(examId, payload, onSuccess, onError) {
        try {
            const response = await axios.patch(
                this.BASE_URL + '/' + examId,
                {
                    name: payload.name,
                    authorEmail: payload.authorEmail,
                    timeLimit: payload.timeLimit,
                },
                {
                    headers: this.ACCESS_CONTROL_HEADER,
                },
            );
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }
}

export default new ExamService();
