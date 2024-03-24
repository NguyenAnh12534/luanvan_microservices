import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StringHelper from '~/Helpers/StringHelper';
import { formatDateTime, getCorrectOrWrongIcon, getModeText, getStreakIcon } from '~/Helpers/GlobalHelper';
import {
    Box,
    Collapse,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

function AttemptTableBody(props) {
    const { attempt, rowIndex } = props;

    const [collapse, setCollapse] = React.useState(false);

    const exam = React.useMemo(() => attempt.exam, []);
    const userAnswers = React.useMemo(() => attempt.answers, []);

    const toggleCollapse = () => setCollapse(!collapse);

    const startDateTime = new Date(attempt.startTime);
    const finishDateTime = new Date(attempt.finishTime);

    return (
        <React.Fragment>
            <TableRow
                sx={{
                    '& > *': { borderBottom: 'unset' },
                    '&:last-child td, &:last-child th': { border: 0 },
                    bgcolor: collapse ? '#F9F9F9' : 'transparent',
                }}
            >
                <TableCell align="left" component="th" scope="row">
                    {rowIndex}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                    {getModeText(attempt.mode)}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                    {exam.topic}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                    {exam.name}
                </TableCell>
                <TableCell align="center">{exam.authorEmail}</TableCell>
                <TableCell align="center">{exam.questions.length}</TableCell>
                <TableCell align="center">{exam.timeLimit}</TableCell>
                <TableCell align="center" sx={{ color: 'orangered' }}>
                    {attempt.maxCorrectStreak}
                </TableCell>
                <TableCell align="center" sx={{ color: '#009EFF' }}>
                    {attempt.totalBonusScore}
                </TableCell>
                <TableCell align="center" sx={{ color: 'green' }}>
                    {attempt.totalScore}
                </TableCell>
                <TableCell width={12}>
                    <IconButton aria-label="expand row" size="small" onClick={toggleCollapse}>
                        {collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={12}>
                    <Collapse in={collapse} timeout="auto">
                        <Box mt={2}>
                            <Table className="detail-attempt-history-table" size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Questions</TableCell>
                                        <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                            Your answer
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Answer time (s)
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Score
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Bonus
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Total
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Result
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userAnswers.map((userAnswer) => {
                                        return (
                                            <TableRow
                                                key={userAnswer.id}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {userAnswer.question.content}
                                                </TableCell>
                                                <TableCell align="left" component="th" scope="row">
                                                    {StringHelper.checkNullAndDefault(userAnswer.option.content, '-')}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {StringHelper.checkNullAndDefault(userAnswer.totalTime, '-')}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {userAnswer.option.isCorrect ? userAnswer.question.score : 0}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {userAnswer.bonus}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {userAnswer.option.isCorrect ? userAnswer.question.score : 0}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {getCorrectOrWrongIcon(userAnswer.option.isCorrect)}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow>
                                        {/* <TableCell rowSpan={4} colSpan={4}/> */}
                                        <TableCell>
                                            <Typography variant="body2">All answers:</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {userAnswers.map((userAnswers) => {
                                                return getStreakIcon(userAnswers.option.isCorrect);
                                            })}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography component="span" variant="body2" gutterBottom>
                                                Start time:
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography component="span" variant="body2" gutterBottom>
                                                {formatDateTime(startDateTime)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography component="span" variant="body2" gutterBottom>
                                                Finish time:
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body2" gutterBottom>
                                                {formatDateTime(finishDateTime)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default AttemptTableBody;
