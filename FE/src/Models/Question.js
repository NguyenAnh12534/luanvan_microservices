

class Question {
    content = ""
    score = 10
    timeLimit = 10
    options = []

    constructor(content, score, timeLimit, options) {
        this.content = content;
        this.score = score === null || score === '' ? this.score : parseInt(score);
        this.timeLimit = timeLimit === null || timeLimit === '' ? this.timeLimit : parseInt(timeLimit);
        this.options = options;
    }

    toDto() {
        return {
            content: this.content,
            score: this.score,
            timeLimit: this.timeLimit,
            options: this.options
        }
    }
}

export default Question;