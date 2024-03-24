/* Created by Hau Nguyen */

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TopicService from '~/Services/TopicService';
import JsonHelper from '~/Helpers/JsonHelper';
import ExamService from '~/Services/ExamService';
import UserContext from '~/Context/UserContext';

const NewQuizModal = (props) => {
    const { open, setOpen } = props;

    const lengthNameMax = 64;
    const { user } = React.useContext(UserContext);
    const [name, setName] = React.useState('');
    const [tags, setTags] = React.useState([{}]);
    const [chooseTags, setChooseTags] = React.useState({});
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(false);
        setChooseTags({});
    };

    const handleClickTag = (beTag) => {
        if (JsonHelper.isNotEmpty(chooseTags) && chooseTags.id === beTag.id) {
            setChooseTags({});
        } else {
            setChooseTags(beTag);
        }
    };

    const handleCreateQuiz = () => {
        const payload = {
            name: name,
            authorEmail: user.email,
        }
        ExamService.create(
            chooseTags.id,
            payload,
            (response) => {
                navigate('/quiz/creator', {
                    state: {
                        data: response.data.data
                    },
                });
            },
            (error) => {},
        );
    };

    React.useEffect(() => {
        TopicService.fetchAll(
            (response) => {
                setTags(response.data.data);
            },
            (error) => {},
        );
    }, []);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                alignItems: 'center',
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ width: 40, height: 40 }}
                                alt="Tom&Jerry"
                                src="http://thehuntsmanandhounds.co.uk/wp-content/uploads/2021/07/pub-quiz-HH.jpeg"
                            />
                            <Stack>
                                <Tittle id="transition-modal-title" component="h6" variant="inherit">
                                    Create a quiz
                                </Tittle>
                                <Description id="transition-modal-description" variant="caption">
                                    Great for training and engagement activities
                                </Description>
                            </Stack>
                        </Stack>

                        <SubTittle id="transition-modal-description" variant="caption">
                            1. Name this quiz
                        </SubTittle>
                        <TextField
                            label={
                                <Typography variant="subtitle2" component="p">
                                    Enter a quiz name
                                </Typography>
                            }
                            id="outlined-start-adornment"
                            size="small"
                            value={name}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">{`${name.length}/${lengthNameMax}`}</InputAdornment>
                                ),
                            }}
                            onChange={(e) => setName(e.target.value)}
                            inputProps={{ maxLength: `${lengthNameMax}`, style: { fontSize: 15 } }}
                            sx={{
                                width: '100%',
                                mt: 1,
                                mb: 2,
                                fontSize: '10px',
                            }}
                        ></TextField>
                        <SubTittle id="transition-modal-description" variant="caption">
                            2. Choose relevant subjects
                        </SubTittle>

                        <Stack direction={'row'} sx={{ display: 'inherit', mb: 3 }}>
                            {tags.map((tag) => {
                                return (
                                    <Chip
                                        label={tag.name}
                                        variant={chooseTags.id === tag.id ? 'filled' : 'outlined'}
                                        color="primary"
                                        sx={{ margin: 0.5 }}
                                        onClick={() => handleClickTag(tag)}
                                    />
                                );
                            })}
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ justifyContent: 'right' }}>
                            <MDButton size={'small'} onClick={handleOpen}>
                                Cancel
                            </MDButton>
                            <Button
                                size={'small'}
                                color={'primary'}
                                variant="contained"
                                sx={{ textTransform: 'none' }}
                                onClick={handleCreateQuiz}
                                disabled={'id' in chooseTags ? false : true}
                            >
                                Create
                            </Button>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: 2.5,
};

const Tittle = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif, Helvetica, Arial, Symbola',
    fontSize: '18px',
    fontWeight: '600px',
}));

const Description = styled(Typography)(() => ({
    color: '#6D6D6D',
}));

const SubTittle = styled(Typography)(() => ({
    fontSize: '12px',
    color: '#6D6D6D',
    fontFamily: 'Open Sans, sans-serif, Helvetica, Arial, Symbola',
    fontWeight: 500,
}));

const MDTypography = styled(Typography)(() => ({
    fontSize: '12px',
    color: 'red',
    fontFamily: 'Open Sans, sans-serif, Helvetica, Arial, Symbola',
    fontWeight: 500,
}));

const MDButton = styled(Button)(() => ({
    fontSize: '14px',
    color: '#222222',
    background: '#0909090D',
    borderColor: 'none',
    fontFamily: 'Open Sans, sans-serif, Helvetica, Arial, Symbola',
    textTransform: 'none',
}));

export default NewQuizModal;
