import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ListenType } from '~/Enums/ListenType';
import SocketContext from '~/Context/SocketContext';
import NotificationDialog from './Components/NotificationDialog';
import ExamRoomToolBar from './Components/ToolBar';
import './style.scss';
import Ranking from './Components/Ranking';
import { useLocation } from 'react-router-dom';
import TimeHelper from '~/Helpers/TimeHelper';
import { sleep } from '~/Helpers/GlobalHelper';
import CorrectOrWrongAnswerDialog from './Components/CorrectOrWrongAnswerDialog';
import StreakContext, { StreakProvider } from '~/Context/StreakContext';

export const ExamContext = React.createContext(null);

const ExamRoom = () => {
    const location = useLocation();
    const firstTimestamp = location.state.timestamp;
    const mode = location.state.mode;
    const socketService = React.useContext(SocketContext);
    const { setStreak } = React.useContext(StreakContext);

    const [score, setScore] = React.useState(0);
    const [yourAnswerChosen, setYourAnswerChosen] = React.useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [colorWhenChooseAnswer, setColorWhenChooseAnswer] = React.useState(null);
    const [finish, setFinish] = React.useState(false);
    const [answerClassName, setAnswerClassName] = React.useState('');
    const [correctAnswerId, setCorrectAnswerId] = React.useState(null);
    const [isShowNotificationDialog, setIsShowNotificationDialog] = React.useState(false);
    const [isShowCorrectOrWrongAnswerDialog, setIsShowCorrectOrWrongAnswerDialog] = React.useState(false);
    const [isChosenCorrectAnswer, setIsChosenCorrectAnswer] = React.useState(null);
    const [examResult, setExamResult] = React.useState(null);
    const [currentQuestionTimestamp, setCurrentQuestionTimestamp] = React.useState(firstTimestamp);
    const [remainingTime, setRemainingTime] = React.useState(TimeHelper.getRemainingTime(firstTimestamp, 10));
    const [notificationPayload, setNotificationPayload] = React.useState({
        score: null,
        bonus: null,
        correctStreak: 0,
    });

    const exam = React.useMemo(() => socketService.exam, []);
    const timeLimit = React.useMemo(() => exam.questions[currentQuestionIndex].timeLimit, [currentQuestionIndex]);
    const colors = React.useMemo(() => ['#306dae', '#2c9ca6', '#eca82b', '#d4546a'], []);

    const handleOpenCorrectOrWrongAnswerDialog = () => setIsShowCorrectOrWrongAnswerDialog(true);
    const handleCloseCorrectOrWrongAnswerDialog = () => setIsShowCorrectOrWrongAnswerDialog(false);

    let timer;
    React.useEffect(() => {
        timer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    setAnswerClassName('disable');
                    setYourAnswerChosen({ id: -1 });
                    setColorWhenChooseAnswer('green');
                    socketService.questionTimeout(exam.questions[currentQuestionIndex].id);
                    nextQuestion();
                    return timeLimit;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(getTimerId());
        };
    }, [currentQuestionIndex]);

    React.useEffect(() => {
        socketService.socket.on(ListenType.EXAM_RESULT, (data) => {
            console.log('Response of EXAM_RESULT event: ', data);
            const result = data.users.sort((a, b) => b.totalScore - a.totalScore);
            setExamResult(result);
        });
    }, []);

    React.useEffect(() => {
        socketService.startExam();
    }, []);

    React.useEffect(() => {
        socketService.socket.on(ListenType.START_QUESTION_SUCCESS, (data) => {
            console.log('Reponse of START_QUESTION_SUCCESS event: ', data);
            clearInterval(getTimerId());
            setCurrentQuestionTimestamp(data.startTime);
            nextQuestion();
        });

        return () => {
            socketService.socket.off(ListenType.START_QUESTION_SUCCESS);
        };
    }, [currentQuestionIndex]);

    React.useEffect(() => {
        socketService.socket.on(ListenType.CORRECT_ANSWER, (response) => {
            console.log('Reponse of CORRECT_ANSWER event: ', response);
            handleUpdateStreak(true, response);
            setIsChosenCorrectAnswer(true);
            handleOpenCorrectOrWrongAnswerDialog();
            clearInterval(getTimerId());
            setScore(response.totalScore);
            setColorWhenChooseAnswer('green');
        });

        return () => {
            socketService.socket.off(ListenType.CORRECT_ANSWER);
        };
    }, [currentQuestionIndex]);

    React.useEffect(() => {
        socketService.socket.on(ListenType.CORRECT_ANSWER_BY_SOE, (response) => {
            console.log('Reponse of CORRECT_ANSWER_BY_SOE event: ', response);
            handleUpdateStreak(false);
            setCorrectAnswerId(response.correctAnswer);
            setYourAnswerChosen({ id: response.correctAnswer });
            setAnswerClassName('disable');
            setColorWhenChooseAnswer('green');
            setIsShowNotificationDialog(true);
        });

        return () => {
            socketService.socket.off(ListenType.CORRECT_ANSWER_BY_SOE);
        };
    }, [currentQuestionIndex]);

    React.useEffect(() => {
        socketService.socket.on(ListenType.WRON_ANSWER, (response) => {
            console.log('Reponse of WRON_ANSWER event: ', response);
            setIsChosenCorrectAnswer(false);
            handleUpdateStreak(false);
            handleOpenCorrectOrWrongAnswerDialog();
            setColorWhenChooseAnswer('red');
        });

        return () => {
            socketService.socket.off(ListenType.WRON_ANSWER);
        };
    }, [currentQuestionIndex]);

    const getTimerId = () => {
        return timer;
    };

    const handleChooseAnswer = (answer) => (_) => {
        setAnswerClassName('');
        setYourAnswerChosen(answer);
        const totalTime = (Date.now() - currentQuestionTimestamp) / 1000;
        socketService.chooseAnswer(exam.questions[currentQuestionIndex].id, answer.id, totalTime);
    };

    const handleUpdateStreak = (isChosenCorrectAnswer, streakInfo) => {
        if (isChosenCorrectAnswer) {
            setStreak((prev) => {
                if (prev.length > currentQuestionIndex) {
                    return prev;
                }
                return [...prev, true];
            });

            setNotificationPayload({
                score: streakInfo.score,
                bonus: streakInfo.bonusScore,
                correctStreak: streakInfo.correctStreak,
            });
        } else {
            setStreak((prev) => {
                if (prev.length > currentQuestionIndex) {
                    return prev;
                }
                return [...prev, false];
            });

            setNotificationPayload({
                score: null,
                bonus: null,
                correctStreak: 0,
            });
        }
    };

    function nextQuestion() {
        setCurrentQuestionTimestamp(Date.now());
        sleep(3000).then(() => {
            setColorWhenChooseAnswer(null);
            setAnswerClassName('');
            setYourAnswerChosen(null);
            setIsShowNotificationDialog(false);
            setIsChosenCorrectAnswer(null);
            handleCloseCorrectOrWrongAnswerDialog();
            setRemainingTime(exam.questions[currentQuestionIndex].timeLimit);

            setCurrentQuestionIndex((prev) => {
                if (prev + 1 >= exam.questions.length) {
                    setFinish(true);
                    socketService.submitExam();
                    return prev;
                }
                handleUpdateStreak(false);
                return prev + 1;
            });
        });
    }

    return (
        <React.Fragment>
            <Paper sx={{ width: 1, height: '100vh', bgcolor: 'black', p: 2, borderRadius: 0 }}>
                <ExamRoomToolBar
                    exam={exam}
                    currentScore={score}
                    currentQuestionIndex={currentQuestionIndex}
                    remainingTime={remainingTime}
                />

                <ExamContext.Provider value={{exam}}>
                    <Paper
                        sx={{
                            width: 1,
                            height: finish ? '90%' : '50%',
                            bgcolor: '#461a42',
                            borderRadius: 4,
                            mt: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {finish ? (
                            examResult !== null && <Ranking examResult={examResult} />
                        ) : (
                            <Typography variant="body1" fontSize={30} align="center" color="white">
                                {exam.questions[currentQuestionIndex].content}
                            </Typography>
                        )}
                    </Paper>
                </ExamContext.Provider>
                {!finish && (
                    <Grid container item height="30%" mt={0.1} spacing={1}>
                        {exam.questions[currentQuestionIndex].options.map((answer, index) => {
                            const optionsLength = exam.questions[currentQuestionIndex].options.length;
                            const color = colors[index % colors.length];
                            const bgColor =
                                yourAnswerChosen != null && yourAnswerChosen.id === answer.id
                                    ? colorWhenChooseAnswer
                                    : color;
                            const opacity = yourAnswerChosen === null ? 1 : yourAnswerChosen.id === answer.id ? 1 : 0.3;
                            const isDisabled = yourAnswerChosen != null;

                            return (
                                <Grid item xs={12 / optionsLength} sx={{ height: '100%' }}>
                                    <Button
                                        onClick={handleChooseAnswer(answer)}
                                        fullWidth
                                        sx={{
                                            height: '100%',
                                            backgroundColor: bgColor,
                                            borderRadius: 3,
                                            opacity: opacity,
                                            textTransform: 'none',
                                            '&:hover': { bgcolor: color, opacity: 0.8 },
                                        }}
                                        className={
                                            correctAnswerId === answer.id ? 'correct-and-disable' : answerClassName
                                        }
                                        disabled={isDisabled}
                                    >
                                        <Typography color="white">{answer.content}</Typography>
                                    </Button>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Paper>

            <NotificationDialog open={isShowNotificationDialog} />

            {isChosenCorrectAnswer !== null && (
                <CorrectOrWrongAnswerDialog
                    isCorrect={isChosenCorrectAnswer}
                    open={isShowCorrectOrWrongAnswerDialog}
                    handleClose={handleCloseCorrectOrWrongAnswerDialog}
                    exam={exam}
                    notificationPayload={notificationPayload}
                />
            )}
        </React.Fragment>
    );
};

export default ExamRoom;
