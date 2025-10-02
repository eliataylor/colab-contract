import React from 'react';
import {Box, Typography} from '@mui/material';
import DeferredWageTimesheet from '../components/DeferredWageTimesheet';

const Timesheets: React.FC = () => {

    return (
        <Box sx={{padding: 3, maxWidth: '1200px', margin: '0 auto', width: '100%'}}>
            <Typography variant="h4" color="primary" sx={{marginBottom: 2}}>
                Deferred Wage Timesheet
            </Typography>

            <Typography sx={{marginBottom: 3, color: 'text.secondary'}}>
                Track hours worked and deferred compensation for all contributors
            </Typography>

            <DeferredWageTimesheet/>
        </Box>
    );
};

export default Timesheets;
