
class StringHelper {
    static checkNullAndDefault = (stringValue, defaultValue) => {
        if(!stringValue) {
            return defaultValue;
        }

        return stringValue;
    }
}

export default StringHelper;