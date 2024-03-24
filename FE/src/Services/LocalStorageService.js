import LocalStorageKey from '~/Constants/LocalStorageKey';

class LocalStorageService {
    static get = () => {
        return {
            token: localStorage.getItem(LocalStorageKey.ACCESS_TOKEN),
            email: localStorage.getItem(LocalStorageKey.CURRENT_USER_EMAIL),
            id: localStorage.getItem(LocalStorageKey.CURRENT_USER_ID),
        };
    }
}

export default LocalStorageService;