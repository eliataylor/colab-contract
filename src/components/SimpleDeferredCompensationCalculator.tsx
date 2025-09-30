import React, {useEffect, useState} from 'react';
import {Alert, Box, Card, CardContent, Divider, Paper, Stack, TextField, Typography} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';

interface CompensationData {
    contributorOwed: number;
    founderOwed: number;
    totalOwed: number;
    distributionPercentage: number;
    contributorPayment: number;
    founderPayment: number;
}

const SimpleDeferredCompensationCalculator: React.FC = () => {
    const [contributorRate, setContributorRate] = useState(200);
    const [contributorHours, setContributorHours] = useState(60);
    const [founderRate, setFounderRate] = useState(150);
    const [founderHours, setFounderHours] = useState(40);
    const [availableProfit, setAvailableProfit] = useState(1000);
    const [compensationData, setCompensationData] = useState<CompensationData>({
        contributorOwed: 0,
        founderOwed: 0,
        totalOwed: 0,
        distributionPercentage: 0,
        contributorPayment: 0,
        founderPayment: 0
    });

    useEffect(() => {
        const contributorOwed = contributorRate * contributorHours;
        const founderOwed = founderRate * founderHours;
        const totalOwed = contributorOwed + founderOwed;
        const distributionPercentage = totalOwed > 0 ? Math.min(availableProfit / totalOwed, 1) : 0;
        const contributorPayment = contributorOwed * distributionPercentage;
        const founderPayment = founderOwed * distributionPercentage;

        setCompensationData({
            contributorOwed,
            founderOwed,
            totalOwed,
            distributionPercentage,
            contributorPayment,
            founderPayment
        });
    }, [contributorRate, contributorHours, founderRate, founderHours, availableProfit]);

    const pieChartData = [
        {id: 0, value: compensationData.contributorPayment, label: 'Contributor Payment', color: '#1976d2'},
        {id: 1, value: compensationData.founderPayment, label: 'Founder Payment', color: '#dc004e'}
    ].filter(item => item.value > 0);

    return (
        <Box>
            <Typography variant="h4" gutterBottom align="center" color="primary">
                Deferred Wage Calculator
            </Typography>

            <Typography variant="body1" paragraph align="center" color="text.secondary">
                Understand how deferred wages are paid out when the company has available profit.
                Enter different scenarios to see the pro-rata calculation in action.
            </Typography>

            <Box sx={{display: 'flex', flexDirection: {xs: 'column', lg: 'row'}, gap: 4}}>
                {/* Input Controls */}
                <Box sx={{flex: 1, minWidth: 300}}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Input Parameters
                            </Typography>

                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                                <Box>
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                        Contributor Details
                                    </Typography>
                                    <Box sx={{display: 'flex', gap: 2}}>
                                        <TextField
                                            fullWidth
                                            label="Hourly Rate ($)"
                                            type="number"
                                            value={contributorRate}
                                            onChange={(e) => setContributorRate(parseFloat(e.target.value) || 0)}
                                            variant="outlined"
                                            size="small"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Accrued Hours"
                                            type="number"
                                            value={contributorHours}
                                            onChange={(e) => setContributorHours(parseFloat(e.target.value) || 0)}
                                            variant="outlined"
                                            size="small"
                                            inputProps={{step: 0.01}}
                                        />
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                        Founder Details
                                    </Typography>
                                    <Box sx={{display: 'flex', gap: 2}}>
                                        <TextField
                                            fullWidth
                                            label="Hourly Rate ($)"
                                            type="number"
                                            value={founderRate}
                                            onChange={(e) => setFounderRate(parseFloat(e.target.value) || 0)}
                                            variant="outlined"
                                            size="small"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Accrued Hours"
                                            type="number"
                                            value={founderHours}
                                            onChange={(e) => setFounderHours(parseFloat(e.target.value) || 0)}
                                            variant="outlined"
                                            size="small"
                                            inputProps={{step: 1}}
                                        />
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                        Company Profit
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Available Monthly Profit ($)"
                                        type="number"
                                        value={availableProfit}
                                        onChange={(e) => setAvailableProfit(parseFloat(e.target.value) || 0)}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                            </Box>

                            <Alert severity="info" sx={{mt: 3}}>
                                <Typography variant="body2">
                                    <strong>Payment Conditions:</strong><br/>
                                    • All operating expenses paid<br/>
                                    • All employee wages paid<br/>
                                    • 3-month cash reserve maintained
                                </Typography>
                            </Alert>
                        </CardContent>
                    </Card>
                </Box>

                {/* Results */}
                <Box sx={{flex: 1, minWidth: 300}}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Calculation Results
                            </Typography>

                            <Box sx={{mb: 3}}>
                                <Typography variant="body2" color="text.secondary">
                                    Total Accrued Wages
                                </Typography>
                                <Typography variant="h4" color="primary">
                                    ${compensationData.totalOwed.toFixed(2)}
                                </Typography>
                            </Box>

                            <Box sx={{mb: 3}}>
                                <Typography variant="body2" color="text.secondary">
                                    Distribution Percentage
                                </Typography>
                                <Typography variant="h4" color="primary">
                                    {(compensationData.distributionPercentage * 100).toFixed(2)}%
                                </Typography>
                            </Box>

                            <Divider sx={{my: 2}}/>

                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Contributor's Payment
                                    </Typography>
                                    <Typography variant="h5" color="success.main">
                                        ${compensationData.contributorPayment.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Founder's Payment
                                    </Typography>
                                    <Typography variant="h5" color="success.main">
                                        ${compensationData.founderPayment.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Stack>

                            {compensationData.distributionPercentage < 1 && (
                                <Alert severity="warning" sx={{mt: 2}}>
                                    <Typography variant="body2">
                                        <strong>Partial
                                            Payment:</strong> Only {(compensationData.distributionPercentage * 100).toFixed(2)}%
                                        of accrued wages can be paid due to limited profit.
                                    </Typography>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Pie Chart */}
            {pieChartData.length > 0 && (
                <Box sx={{mt: 4}}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Payment Distribution
                            </Typography>
                            <Box sx={{height: 300, display: 'flex', justifyContent: 'center'}}>
                                <PieChart
                                    series={[
                                        {
                                            data: pieChartData,
                                            highlightScope: {fade: 'global', highlight: 'item'},
                                            innerRadius: 30,
                                            outerRadius: 100,
                                            paddingAngle: 2,
                                            cornerRadius: 5,
                                        }
                                    ]}
                                    height={300}
                                    width={400}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            )}

            {/* Breakdown Table */}
            <Box sx={{mt: 4}}>
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Detailed Breakdown
                        </Typography>

                        <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: 2}}>
                            <Paper variant="outlined" sx={{p: 2, flex: 1}}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Contributor Calculation
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rate: ${contributorRate}/hour
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Hours: {contributorHours}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total Owed: ${compensationData.contributorOwed.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Payment: ${compensationData.contributorPayment.toFixed(2)}
                                </Typography>
                            </Paper>

                            <Paper variant="outlined" sx={{p: 2, flex: 1}}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Founder Calculation
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rate: ${founderRate}/hour
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Hours: {founderHours}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total Owed: ${compensationData.founderOwed.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Payment: ${compensationData.founderPayment.toFixed(2)}
                                </Typography>
                            </Paper>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default SimpleDeferredCompensationCalculator;
