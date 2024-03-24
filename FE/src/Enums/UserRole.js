export const UserRole = {
    HOST: 'host',
    GUEST: 'guest',
    empty: "",
};

export const indexToAnswerType = (index) => {
    switch(index) {
        case 0: return UserRole.HOST
        case 1: return UserRole.GUEST
    }
}

export const answerTypeToIndex = (roleInRoom) => {
    switch(roleInRoom) {
        case UserRole.HOST: return 0
        case UserRole.GUEST: return 1

    }
}