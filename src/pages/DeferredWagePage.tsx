import React from 'react';
import {Box, Typography} from '@mui/material';
import SimpleDeferredCompensationCalculator from '../components/SimpleDeferredCompensationCalculator';

const VestingPage: React.FC = () => {


    return <Box>
        <Typography variant="h4" gutterBottom align="center" color="primary">
            Deferred Wage Calculator
        </Typography>

        <Typography variant="body1" paragraph align="center" color="text.secondary">
            Understand how deferred wages are paid out when the company has available profit. Enter different scenarios
            to see the pro-rata calculation in action.
        </Typography>
        <SimpleDeferredCompensationCalculator/></Box>;
};

export default VestingPage;
