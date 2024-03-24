import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { dayOfWeeks, monthNames } from '~/Constants/DateConstant';
import { Typography } from '@mui/material';

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getCorrectOrWrongIcon(isCorrectAnswer) {
    if (!isCorrectAnswer) {
        return <CloseIcon fontSize="small" color="error" />;
    }

    return <CheckIcon fontSize="small" color="success" />;
}

export function getModeText(mode) {
    if(!mode) return <Typography>-</Typography>

    return (
        <Typography variant="caption" fontWeight="bold" sx={{ color: getModeTextColor(mode) }}>
            {mode.toUpperCase()}
        </Typography>
    );
}

export function getModeTextColor(mode) {
    return mode.toLowerCase() === "normal" ? '#54B435' : '#FF7F3F';
}

export function getStreakIcon(isCorrect) {
    if (isCorrect) {
        return <LocalFireDepartmentIcon sx={{ color: 'orangered' }} />;
    } else {
        return <LocalFireDepartmentIcon sx={{ color: 'grey' }} />;
    }
}

export function formatDateTime(datetime) {
    const dayOfWeek = dayOfWeeks[datetime.getDay() - 1];
    const dayOfMonth = datetime.getDate();
    const monthName = monthNames[datetime.getMonth()];
    const year = datetime.getFullYear();
    const hour = datetime.getHours();
    const minute = (datetime.getMinutes() < 10 ? '0' : '') + datetime.getMinutes();

    return `${dayOfWeek}, ${dayOfMonth} ${monthName} ${year} at ${hour}:${minute}`;
}
