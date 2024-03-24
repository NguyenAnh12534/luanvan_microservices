export const AnswerType = {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    empty: "",
};

export const indexToAnswerType = (index) => {
    switch(index) {
        case 0: return AnswerType.A
        case 1: return AnswerType.B
        case 2: return AnswerType.C
        case 3: return AnswerType.D
    }
}

export const answerTypeToIndex = (answerType) => {
    switch(answerType) {
        case AnswerType.A: return 0
        case AnswerType.B: return 1
        case AnswerType.C: return 2
        case AnswerType.D: return 3
    }
}
