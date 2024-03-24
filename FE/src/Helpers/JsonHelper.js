
class JsonHelper {
    static isEmpty(json) {
        return Object.keys(json).length == 0;
    }

    static isNotEmpty(json) {
        return Object.keys(json).length > 0;
    }
}

export default JsonHelper;
