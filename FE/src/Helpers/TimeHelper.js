class TimeHelper {
    static getRemainingTime = (currentTimestamp, timeoutSeconds) => {
        return Math.max(0, Math.round(timeoutSeconds - (Date.now() - currentTimestamp) / 1000));
    };
}

export default TimeHelper;
