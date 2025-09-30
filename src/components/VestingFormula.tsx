import React from 'react';
import {Typography} from '@mui/material';

interface VestingFormulaProps {
    totalEquity: number;
    vestingDays: number;
    cliffDays: number;
    vestingExponent: number;
    variant?: 'body2' | 'caption' | 'body1';
    sx?: object;
}

const VestingFormula: React.FC<VestingFormulaProps> = ({
                                                           totalEquity,
                                                           vestingDays,
                                                           cliffDays,
                                                           vestingExponent,
                                                           variant = 'body2',
                                                           sx = {}
                                                       }) => {
    const defaultSx = {
        fontFamily: 'monospace',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'text.primary',
        mt: 2,
        p: 2,
        borderRadius: 1,
        ...sx
    };

    return (
        <Typography
            variant={variant}
            sx={defaultSx}
        >
            {totalEquity}<sup>%</sup> × <span style={{position: 'relative'}}>
                ({vestingDays} vesting days - {cliffDays} cliff days) / (Days Worked - {cliffDays} cliff days)
                <sup style={{
                    fontSize: '0.7em',
                    color: '#1976d2',
                    fontWeight: 'bold',
                    marginLeft: '2px'
                }}>
                    {vestingExponent}
                </sup>
            </span>
        </Typography>
    );
};

export default VestingFormula;
