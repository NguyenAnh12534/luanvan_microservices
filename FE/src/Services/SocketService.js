import io from 'socket.io-client';
import { EmitType } from '~/Enums/EmitType';
import { ListenType } from '~/Enums/ListenType';
import ExamService from './ExamService';
import LocalStorageService from './LocalStorageService';

const ENDPOINT = 'http://acme.com';
// const ENDPOINT = 'localhost:3005';

export default class SocketService {
    roomId = '';

    socket = {};

    currentEmail = null;

    exam = null;

    roomMembers = [];

    constructor() {
        const { email } = LocalStorageService.get();
        this.currentEmail = email;
        console.log('Connecting to socketio');
        this.socket = io.connect(ENDPOINT);

        this.connect(email);

        this.socket.on(ListenType.CREATE_ROOM_SUCCESS, (message) => {
            console.log('Success to create room: ' + message.roomId);
            this.roomId = message.roomId;
            this.socket.emit(EmitType.JOIN_ROOM, { email: this.currentEmail, roomId: message.roomId });
        });
    }


    setBusy(){
        this.socket.emit(EmitType.NOT_AVAILABLE_USER, {email: this.currentEmail});
    }

    connect(email) {
        console.log('EMIT AVAILABLE_USER Event with Email: ', email);
        this.socket.emit(EmitType.AVALABLE_USER, {
            email: email,
        });
    }

    getAvailableUsers(){
        console.log('Getting available users');
        this.socket.emit(EmitType.GET_AVAILABLE_USER);
    }

    isConnected() {
        return this.socket.connected;
    }

    reconnect() {
        const { email } = LocalStorageService.get();
        this.socket.connect();
        // this.connect(email);
    }

    startExam(mode) {
        console.log('start quiz...');
        this.socket.emit(EmitType.START_EXAM, mode);
    }

    nextQuestion() {
        console.log('Moving to next question...');
        this.socket.emit(EmitType.START_QUESTION);
    }

    send = (message) => {
        this.socket.emit(EmitType.USER_SEND_MESSAGE, message);
    };

    joinRoom = (roomId) => {
        console.log('joining room ' + roomId);
        console.log('Socket: ', this.socket);
        this.socket.emit(EmitType.NOT_AVAILABLE_USER, {email: this.currentEmail});
        this.socket.emit(EmitType.JOIN_ROOM, { email: this.currentEmail, roomId: roomId });

        let examId = roomId.split('_').at(-1);
        console.log('exam Id: ', examId);
        ExamService.getById(
            examId,
            (response) => {
                this.exam = response.data.data;
            },
            (error) => console.log(error),
        );
    };

    createRoom = (examId, mode) => {
        console.log('creating room' + examId);
        this.socket.emit(EmitType.CREATE_ROOM, { email: this.currentEmail, examId: examId, mode: mode });
        ExamService.getById(
            examId,
            (response) => {
                this.exam = response.data.data;
                console.log('exam ne: ', this.exam);
            },
            (error) => console.log(error),
        );
    };

    chooseAnswer = (questionId, answerId, totalTime) => {
        console.log('choose an answer id: ' + answerId + ' with question id: ' + questionId);
        this.socket.emit(EmitType.USER_CHOOSE_OPTION, {
            questionId: questionId,
            optionId: answerId,
            totalTime,
        });
    };

    submitExam = () => {
        this.socket.emit(EmitType.SUBMIT_TEST);
    };

    questionTimeout = (questionId) => {
        this.socket.emit(EmitType.QUESTION_TIMEOUT, questionId);
    };

    invite = (email, mode) => {
        console.log(`--SOCKET call Invite(${email})`);
        this.socket.emit(EmitType.INVITE_OTHER_USER, { email: email, mode: mode });
    };

    // disconnect - used when unmounting
    disconnect() {
        this.socket.disconnect();
    }
}
