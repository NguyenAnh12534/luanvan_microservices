import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import SaveIcon from '@mui/icons-material/Save';
import { Link, useLocation } from 'react-router-dom';
import {
    Alert,
    AppBar,
    Box,
    Button,
    Grid,
    Grow,
    IconButton,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import ExamService from '~/Services/ExamService';
import QuestionService from '~/Services/QuestionService';
import { AnswerType, indexToAnswerType } from '~/Enums/AnswerType';
import { Container } from '@mui/system';
import Question from '~/Models/Question';

const NewQuestion = () => {
    const location = useLocation();
    const instance = location.state.data;
    const [exam, setExam] = React.useState({
        questions: [],
    });
    const [answerA, setAnswerA] = React.useState('');
    const [answerB, setAnswerB] = React.useState('');
    const [answerC, setAnswerC] = React.useState('');
    const [answerD, setAnswerD] = React.useState('');
    const [question, setQuestion] = React.useState('');
    const [timeLimit, setTimeLimit] = React.useState(null);
    const [score, setScore] = React.useState(null);
    const [alertTitle, setAlertTitle] = React.useState('');
    const [editName, setEditName] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [examName, setExamName] = React.useState(instance.name);
    const [activeQuestion, setActiveQuestion] = React.useState(null);
    const [correctAnswer, setCorrectAnswer] = React.useState(AnswerType.A);

    React.useEffect(() => {
        refreshExam();
    }, []);

    const refreshExam = () => {
        ExamService.getById(
            instance.id,
            (response) => {
                setExam(response.data.data);
                console.log(response.data.data);
            },
            (error) => {},
        );
    };

    const isAnyNullField =
        examName === '' ||
        question === '' ||
        answerA === '' ||
        answerB === '' ||
        answerC === '' ||
        answerD === '' ||
        correctAnswer === '';

    const handleChangeExamName = (e) => setExamName(e.target.value);

    const handleSwitchQuestion = React.useCallback(
        (question) => () => {
            setActiveQuestion(question);
            if (question !== null) {
                fillValueAllField(question);
            } else {
                setActiveQuestion(null);
                resetAllField();
            }
        },
        [],
    );

    const fillValueAllField = (question) => {
        setQuestion(question.content);
        setScore(question.score);
        setTimeLimit(question.timeLimit);
        setAnswerA(question.options[0].content);
        setAnswerB(question.options[1].content);
        setAnswerC(question.options[2].content);
        setAnswerD(question.options[3].content);

        question.options.map((answer, index) => {
            if (answer.isCorrect) {
                setCorrectAnswer(indexToAnswerType(index));
            }
        });
    };

    const handleEditName = () => {
        if (editName) {
            setEditName(!editName);
            let payload = { name: examName };
            ExamService.update(instance.id, payload);
        } else {
            setEditName(!editName);
        }
    };

    const handleChangeAnswer = (event, answer) => {
        switch (answer.type) {
            case AnswerType.A:
                setAnswerA(event.target.value);
                break;
            case AnswerType.B:
                setAnswerB(event.target.value);
                break;
            case AnswerType.C:
                setAnswerC(event.target.value);
                break;
            case AnswerType.D:
                setAnswerD(event.target.value);
                break;
        }
    };

    const handleChooseCorrectAnswer = (answerType) => {
        setCorrectAnswer(answerType);
    };

    const handleSave = () => {
        let questionPayload = new Question(question, score, timeLimit, []);
        if (activeQuestion === null) {
            let options = [
                {
                    content: answerA,
                    isCorrect: correctAnswer == AnswerType.A,
                },
                {
                    content: answerB,
                    isCorrect: correctAnswer == AnswerType.B,
                },
                {
                    content: answerC,
                    isCorrect: correctAnswer == AnswerType.C,
                },
                {
                    content: answerD,
                    isCorrect: correctAnswer == AnswerType.D,
                },
            ];
            questionPayload.options = options;
            QuestionService.create(
                instance.id,
                questionPayload,
                (_) => {
                    resetAllField();
                    setShowAlert(true);
                    setAlertTitle('Create question successfully');
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 2000);

                    refreshExam();
                },
                (_) => {},
            );
        } else {
            let options = [
                {
                    id: activeQuestion.options[0].id,
                    content: answerA,
                    isCorrect: correctAnswer == AnswerType.A,
                },
                {
                    id: activeQuestion.options[1].id,
                    content: answerB,
                    isCorrect: correctAnswer == AnswerType.B,
                },
                {
                    id: activeQuestion.options[2].id,
                    content: answerC,
                    isCorrect: correctAnswer == AnswerType.C,
                },
                {
                    id: activeQuestion.options[3].id,
                    content: answerD,
                    isCorrect: correctAnswer == AnswerType.D,
                },
            ];
            questionPayload.options = options;
            QuestionService.update(
                activeQuestion.id,
                questionPayload.toDto(),
                (_) => {
                    refreshExam();
                    setActiveQuestion(null);
                    resetAllField();
                    setShowAlert(true);
                    setAlertTitle('Update question successfully');
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 2000);
                },
                (_) => {},
            );
        }
    };

    const resetAllField = () => {
        setQuestion('');
        setAnswerA('');
        setAnswerB('');
        setAnswerC('');
        setAnswerD('');
        setScore('');
        setTimeLimit('');
        setCorrectAnswer(AnswerType.A);
    };

    const answers = [
        {
            type: AnswerType.A,
            value: answerA,
            placeholderText: 'Type your question A here...',
        },
        {
            type: AnswerType.B,
            value: answerB,
            placeholderText: 'Type your question B here...',
        },
        {
            type: AnswerType.C,
            value: answerC,
            placeholderText: 'Type your question C here...',
        },
        {
            type: AnswerType.D,
            value: answerD,
            placeholderText: 'Type your question D here...',
        },
    ];

    return (
        <React.Fragment>
            <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', boxShadow: 2, width: '100%' }}>
                <Toolbar variant="regular">
                    <Link to="/">
                        <img
                            src={process.env.PUBLIC_URL + '/FunQuizz_logo.png'}
                            width="150px"
                            style={{ marginRight: 25 }}
                        />
                    </Link>

                    <TextField
                        size="small"
                        value={examName}
                        disabled={!editName}
                        onChange={handleChangeExamName}
                    ></TextField>
                    <IconButton size="small" color="primary" onClick={handleEditName} sx={{ ml: 1 }}>
                        {editName ? <SaveIcon fontSize="small" /> : <CreateIcon fontSize="small" />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ px: 2 }}>
                <Stack direction="row">
                    {exam.questions.map((question) => (
                        <Button
                            variant={activeQuestion == question ? 'contained' : 'outlined'}
                            size="small"
                            key={question.id}
                            sx={{ mr: 1, mt: 1, textTransform: 'none', borderRadius: 15 }}
                            disableElevation
                            onClick={handleSwitchQuestion(question)}
                        >
                            {question.content}
                        </Button>
                    ))}
                    <Button
                        variant={activeQuestion === null ? 'contained' : 'outlined'}
                        size="small"
                        sx={{ mr: 1, mt: 1, textTransform: 'none', borderRadius: 15 }}
                        disableElevation
                        onClick={handleSwitchQuestion(null)}
                    >
                        Empty
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                    <Typography>Score </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="10"
                        type="number"
                        value={score}
                        inputProps={{ min: 10, style: { textAlign: 'center' } }}
                        onChange={(e) => setScore(e.target.value)}
                    />
                    <Typography>Time limit </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="10 min"
                        type="number"
                        value={timeLimit}
                        inputProps={{ min: 10, style: { textAlign: 'center' } }}
                        onChange={(e) => setTimeLimit(e.target.value)}
                    />
                </Stack>
                <TextField
                    variant="outlined"
                    placeholder="Type your question here..."
                    multiline
                    rows={5}
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    fullWidth
                    sx={{ mt: 2 }}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Grid container spacing={1.5}>
                    {answers.map((answer) => (
                        <Grid item xs={3} key={answer.type}>
                            <TextField
                                variant="outlined"
                                placeholder="Type your question here..."
                                multiline
                                rows={5}
                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                fullWidth
                                sx={{ mt: 2 }}
                                value={answer.value}
                                onChange={(event) => handleChangeAnswer(event, answer)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={1.5}>
                    {answers.map((answer) => (
                        <Grid item xs={3} key={answer.type}>
                            <Button
                                variant={correctAnswer == answer.type ? 'contained' : 'outlined'}
                                onClick={() => handleChooseCorrectAnswer(answer.type)}
                                sx={{ textTransform: 'none' }}
                                disableElevation
                                fullWidth
                            >
                                {correctAnswer == answer.type ? 'Correct Answer' : 'Choose'}
                            </Button>
                        </Grid>
                    ))}
                </Grid>

                <Grid container justifyContent="flex-end" spacing={1} mt={2}>
                    <Grid item>
                        <Button component={Link} to="/" variant="outlined">
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            disabled={isAnyNullField}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Grow in={showAlert}>
                <Alert
                    variant="filled"
                    severity="success"
                    sx={{ mb: 2, position: 'fixed', top: '20px', right: '20px' }}
                >
                    {alertTitle}
                </Alert>
            </Grow>
        </React.Fragment>
    );
};

export default NewQuestion;
