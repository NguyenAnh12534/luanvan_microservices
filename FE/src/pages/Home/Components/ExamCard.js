import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/system/Stack';
import { useNavigate } from 'react-router-dom';

const ExamCard = (props) => {
    const { exam } = props;
    const navigate = useNavigate();

    const handleNavigateExamDetail = () => {
        navigate(`/quiz/detail/${exam.id}`);
    }

    const getTimeLimit = () => {
        return exam.questions.reduce((pre, cur) => pre + cur.timeLimit, 0);
    };

    return (
        <Card variant="outlined" sx={cardStyle} onClick={handleNavigateExamDetail}>
            <CardActionArea color='primary' sx={{pb: 0}}>
                <CardContent>
                    <Typography gutterBottom color="primary.main" align="left" fontSize={12} sx={{ mb: 1 }}>
                        Topic: {exam.topic}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h5"
                        align="left"
                        component="div"
                        noWrap
                        sx={{ fontSize: 18, color: 'black', opacity: 0.9, textTransform: "uppercase" }}
                    >
                        {exam.name}
                    </Typography>
                    <Stack direction="row" spacing={1} pt={1} >
                        <Typography variant="body1" color="text.secondary" sx={smallTextStyle}>
                            {exam.questions.length} quiz
                        </Typography>
                        <Typography color="text.secondary" sx={smallTextStyle}>
                            .
                        </Typography>
                        <Typography color="text.secondary" sx={smallTextStyle}>
                            {getTimeLimit()} min
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const cardStyle = {
    minWidth: 100,
    borderRadius: 2,
    boxShadow: 'rgba(33, 35, 38, 0.1) 10px 10px 10px -5px;',
    // background: 'linear-gradient(45deg, #3c3c8a, #2c6cd1)'
};

const smallTextStyle = {
    fontSize: 12,
    color: '#6d6d6d',
    fontWeight: 500,
};

export default ExamCard;
