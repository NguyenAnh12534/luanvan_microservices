import React from 'react';
import { Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

const ToolBar = (props) => {
    const { exam, currentScore, currentQuestionIndex, remainingTime } = props;

    const [isMusicPlayed, setIsMusicPlayed] = React.useState(true);
    const audioRef = React.useRef();

    const handlePausePlayClick = () => {
        if (isMusicPlayed) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsMusicPlayed(!isMusicPlayed);
    };

    return (
        <React.Fragment>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Stack direction="row" spacing={1}>
                        <Paper component="span" sx={paperStyle}>
                            <Typography
                                component="span"
                                variant="body1"
                                color="white"
                                fontSize={22}
                                sx={{ backgroundColor: 'transparent' }}
                            >
                                {currentQuestionIndex + 1}
                            </Typography>
                            <Typography component="span" variant="body1" color="white" fontSize={16}>
                                /{exam.questions.length}
                            </Typography>
                        </Paper>
                        <Paper component="span" sx={paperStyle}>
                            <Typography component="span" variant="body1" color="white" fontSize={18}>
                                Total:
                            </Typography>
                            <Typography component="span" variant="body1" color="white" ml={1} fontSize={22}>
                                {currentScore}
                            </Typography>
                        </Paper>
                    </Stack>
                </Grid>
                <Grid item>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={circleBorder}>
                            <Typography color="white" variant="body1">
                                {remainingTime}
                            </Typography>
                        </Box>
                        <Paper
                            component="span"
                            sx={{ ...paperStyle, width: '110px', height: '53.84px', ...centerEverything }}
                        >
                            <Typography color="white" variant="body1">
                                Score: {exam.questions[currentQuestionIndex].score}
                            </Typography>
                        </Paper>
                        <Paper component="span" sx={paperStyle}>
                            <IconButton size="small" sx={{ color: 'white' }} onClick={handlePausePlayClick}>
                                {isMusicPlayed ? <MusicOffIcon /> : <MusicNoteIcon />}
                            </IconButton>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>

            <audio ref={audioRef} autoPlay loop>
                <source type="audio/mp3" src={process.env.PUBLIC_URL + 'audio/music.mp3'} />
            </audio>
        </React.Fragment>
    );
};

const paperStyle = {
    backgroundColor: '#1a1a1a',
    borderRadius: 2,
    px: 1.5,
    py: 0.9,
};

const circleBorder = {
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px white solid',
};

const centerEverything = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
};

export default ToolBar;
