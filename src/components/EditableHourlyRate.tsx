import React from 'react';
import {InputAdornment, TextField, Typography} from '@mui/material';

interface EditableHourlyRateProps {
    label: string;
    value: number;
    onSave: (newValue: number) => void;
}

const EditableHourlyRate: React.FC<EditableHourlyRateProps> = ({label, value, onSave}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = parseFloat(event.target.value);
        if (!isNaN(numericValue) && numericValue >= 0) {
            onSave(numericValue);
        }
    };

    return (
            <TextField
                value={value}
                label={label}
                onChange={handleChange}
                variant="standard"
                size="small"
                type="number"
                inputProps={{min: 0, step: 1}}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><Typography component="span">$</Typography></InputAdornment>,
                    endAdornment: <InputAdornment position="end"><Typography component="span">/ hr</Typography></InputAdornment>
                }}
            />
    );
};

export default EditableHourlyRate;
