import { AutoFixOffSharp } from '@mui/icons-material';
import axios from 'axios';
import LocalStorageKey from '~/Constants/LocalStorageKey';
import LocalStorageService from './LocalStorageService';

class UserService {
    BASE_URL = 'http://acme.com/api/User';

    async get(email, onSuccess, onError) {
        try {
            const { token } = LocalStorageService.get()
            const response = await axios.get(`${this.BASE_URL + '/email/' + email}`, {
                headers: {
                    Authorization: `bearer ${token}`,
                    'Access-Control-Allow-Origin': true,
                },
            });

            console.log(`Get user successfully with email: '${email}'`);
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }

    async getAll(onSuccess, onError) {
        try {
            const { token } = LocalStorageService.get()
            const response = await axios.get(this.BASE_URL, {
                headers: {
                    Authorization: `bearer ${token}`,
                    'Access-Control-Allow-Origin': true,
                },
            });

            console.log("Get all users successfully");
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }

    async update(type, value, onSuccess, onError) {
        try {
            const data = {
                [type]: value,
            };
            const { token, id } = LocalStorageService.get();
            const response = await axios.patch(this.BASE_URL + '/' + id, data, {
                headers: {
                    Authorization: 'bearer ' + token,
                    'Access-Control-Allow-Origin': true,
                },
            });

            console.log(`Get user successfully : `);
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }
}

export default new UserService();
