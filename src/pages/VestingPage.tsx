import React from 'react';
import SimpleVestingCalculator from '../components/SimpleVestingCalculator';
import {Box, Typography} from '@mui/material';

const VestingPage: React.FC = () => {


    return <Box>
        <Typography variant="h4" gutterBottom align="center" color="primary">
            Vesting Equity Calculator
        </Typography>

        <Typography variant="body1" paragraph align="center" color="text.secondary">
            Our agreement uses an accelerating vesting schedule to reward long-term commitment.
            Adjust the parameters below to see how equity grows over time.
        </Typography>
        <SimpleVestingCalculator/></Box>;
};

export default VestingPage;
