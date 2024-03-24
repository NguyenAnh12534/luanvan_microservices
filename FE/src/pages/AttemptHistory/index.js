import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AttemptService from '~/Services/AttemptService';
import IosShareIcon from '@mui/icons-material/IosShare';
import AttempTableBody from './Components/AttempTableBody';
import {
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { exportExcelFromTable } from '~/Utils';
import LocalStorageService from '~/Services/LocalStorageService';

const AttemptHistory = () => {
    const navigate = useNavigate();
    const { email } = LocalStorageService.get();

    const [attemptHistory, setAttemptHistory] = React.useState([]);

    const handleBackToPrevPage = () => {
        navigate(-1);
    };

    React.useEffect(() => {
        AttemptService.fetchByEmail(
            email,
            (response) => {
                const attemptFilter = response.data.data.sort((a, b) => b.id - a.id);
                setAttemptHistory(attemptFilter);
                console.log('--ATTEMPT HISTORY: ', response.data.data);
            },
            (error) => console.log(error),
        );
    }, []);

    const handleExcelExport = () => {
        const attemptTable = document.getElementById('attempt-history-table');
        const detailTableCollection = document.getElementsByClassName('detail-attempt-history-table');

        exportExcelFromTable(attemptTable, detailTableCollection, 'attempt-history');
    };

    return (
        <React.Fragment>
            <Button
                startIcon={<ArrowBackIosIcon />}
                sx={{ m: 2, textTransform: 'none' }}
                onClick={handleBackToPrevPage}
            >
                Back
            </Button>
            <Stack direction="row" justifyContent="space-between" mx={2} mb={2}>
                <Typography variant="h5" color="text.secondary" gutterBottom fontWeight="bold">
                    Attempt history
                </Typography>
                <Button
                    startIcon={<IosShareIcon />}
                    variant="contained"
                    color="success"
                    disableElevation
                    sx={{ textTransform: 'none' }}
                    onClick={handleExcelExport}
                >
                    Export to Excel
                </Button>
            </Stack>
            <Box mx={2} mb={5}>
                <TableContainer component={Paper}>
                    <Table id="attempt-history-table" aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                    #
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                    Mode
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                    Topic
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                    Exam
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Author
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Number of question
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Time limit (min)
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'orangered' }}>
                                    Streak
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#009EFF' }}>
                                    Bonus
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'green' }}>
                                    Total
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attemptHistory.map((attempt, index) => (
                                <AttempTableBody key={index} attempt={attempt} rowIndex={index + 1} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    );
};

export default AttemptHistory;
