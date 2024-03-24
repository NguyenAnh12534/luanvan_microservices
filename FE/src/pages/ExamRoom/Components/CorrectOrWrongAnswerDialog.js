import React from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import StreakContext from '~/Context/StreakContext';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';

const CorrectOrWrongAnswerDialog = (props) => {
    const { isCorrect, open, handleClose, exam, notificationPayload } = props;

    const { streak } = React.useContext(StreakContext);

    const getImagePath = (isAnswerCorrect) => {
        let basePath = process.env.PUBLIC_URL;
        if (isAnswerCorrect) {
            return basePath + '/correct_answer.png';
        } else {
            return basePath + '/wrong_answer.png';
        }
    };

    const getNotificationText = (isAnswerCorrect) => {
        if (isAnswerCorrect) {
            // return 'Congratulation!!!';
        } else {
            return 'Sorry, this answer is wrong.';
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent sx={{ py: 5 }}>
                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={getImagePath(isCorrect)} width="40%" />
                    <Typography color={isCorrect ? 'green' : 'red'} fontWeight="bold" fontSize={25}>
                        {getNotificationText(isCorrect)}
                    </Typography>

                    {notificationPayload.score !== null && (
                        <Typography color="green" fontWeight="bold" fontSize={35} pb={2}>
                            +{notificationPayload.score}
                        </Typography>
                    )}

                    <Typography fontWeight="bold">Streak: {notificationPayload.correctStreak}</Typography>

                    <Stack direction="row" spacing={2} mt={2}>
                        {exam.questions.map((_, index) => {
                            return getStreakIcon(streak, index);
                        })}
                    </Stack>
                    {notificationPayload.bonus !== null && (
                        <Stack direction="row" spacing={1} mt={0.5}>
                            <Typography variant="body1" fontWeight="bold" fontSize={16}>
                                +{notificationPayload.bonus}
                            </Typography>
                            <Typography variant="body1" fontSize={16}>
                                bonus point
                            </Typography>
                        </Stack>
                    )}

                    <Box sx={totalScoreStyle}>
                        <Typography variant="body1" fontWeight="bold" fontSize={25} color="primary.main">
                            Total: {notificationPayload.score + notificationPayload.bonus}
                        </Typography>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};


const totalScoreStyle = {
    backgroundColor: '#cbe3ff',
    borderRadius: 2,
    px: 5,
    py: 0.9,
    mt: 3,
};

const getStreakIcon = (arrStreak, index) => {
    if (arrStreak[index] !== undefined) {
        if (arrStreak[index]) {
            return <LocalFireDepartmentIcon sx={{ color: 'orangered' }} />;
        } else {
            return <LocalFireDepartmentIcon sx={{ color: 'grey' }} />;
        }
    } else {
        return <LocalFireDepartmentOutlinedIcon color="disabled" />;
    }
};

export default CorrectOrWrongAnswerDialog;
