// @ts-nocheck
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ExamService from '~/Services/ExamService';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Card, CardActions, CardContent, Grid, Typography, Stack } from '@mui/material';
import ModeDialog from './Components/ModeDialog';

const ExamDetail = () => {
    const params = useParams();

    const [exam, setExam] = React.useState({ questions: [] });
    const [openModeModal, setOpenModeModal] = React.useState(false);

    const handleOpenModeModal = () => setOpenModeModal(true);
    const handleCloseModeModal = () => setOpenModeModal(false);

    React.useEffect(() => {
        ExamService.getById(
            params.id,
            (response) => {
                let _exam = response.data.data;
                setExam(_exam);
                console.log(_exam);
            },
            (_) => {},
        );
    }, []);

    const getTotalScore = () => {
        return exam.questions.reduce((pre, cur) => pre + cur.score, 0);
    };

    const getTimeLimit = () => {
        return exam.questions.reduce((pre, cur) => pre + cur.timeLimit, 0);
    };

    return (
        <React.Fragment>
            <Button startIcon={<ArrowBackIosIcon />} sx={{ m: 2, textTransform: 'none' }} component={Link} to="/">
                Home
            </Button>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                paddingX={2}
                sx={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <Card variant="outlined" sx={cardStyle}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" textAlign="center" gutterBottom>
                                Topic: {exam.topic}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                textAlign="center"
                                textTransform="uppercase"
                            >
                                {exam.name}
                            </Typography>
                            <Stack direction="row" spacing={3} mt={3} justifyContent="space-between">
                                <Typography color="red">{exam.questions.length} questions</Typography>
                                <Typography color="orange">Limit: {getTimeLimit()} min</Typography>
                                <Typography color="green">Total: {getTotalScore()} score</Typography>
                            </Stack>

                            <Typography variant="body2" mt={2} color="text.secondary">
                                Author: {exam.authorEmail}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }} onClick={handleOpenModeModal}>
                            <Button variant="contained" disableElevation>
                                Create room
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid container mt={3} spacing={1.5}>
                    {exam.questions.map((question) => (
                        <Grid item xs={3}>
                            <Card variant="outlined" sx={{ borderRadius: 4 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 12 }} color="cornflowerblue" gutterBottom>
                                        {question.score} score
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        fontSize={20}
                                        sx={contentTextStyle}
                                    >
                                        {question.content}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mt: 2 }} color="text.secondary">
                                        Total: {question.options.length} options
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        Limit: {question.timeLimit} min
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <ModeDialog open={openModeModal} handleClose={handleCloseModeModal} roomId={params.id}/>
        </React.Fragment>
    );
};

const cardStyle = {
    minWidth: 400,
    borderRadius: 4,
    boxShadow: 'rgba(33, 35, 38, 0.1) 10px 10px 10px 0px;',
};

const contentTextStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    height: '55px',
};

export default ExamDetail;
