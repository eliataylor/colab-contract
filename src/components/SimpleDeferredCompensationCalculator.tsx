import React, {useEffect, useState} from 'react';
import {Alert, Box, Card, CardContent, Divider, Grid, Stack, TextField, Typography, useTheme} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import {useFormData} from '../contexts/FormDataContext';

interface CompensationData {
    contributorOwed: number;
    founderOwed: number;
    totalOwed: number;
    distributionPercentage: number;
    contributorPayment: number;
    founderPayment: number;
}

const SimpleDeferredCompensationCalculator: React.FC = () => {
    const {contributorData, founderData, timesheetEntries, updateFounderData, updateContributorData} = useFormData();
    const theme = useTheme();

    // Calculate hours and rates from timesheet data
    const contributorHoursFromTimesheet = timesheetEntries
        .filter(entry => entry.contributor === contributorData.name)
        .reduce((sum, entry) => sum + entry.hours, 0);
    const contributorRate = contributorHoursFromTimesheet > 0
        ? timesheetEntries
        .filter(entry => entry.contributor === contributorData.name)
        .reduce((sum, entry) => sum + entry.total, 0) / contributorHoursFromTimesheet
        : contributorData.deferredWageRate;

    const founderHoursFromTimesheet = timesheetEntries
        .filter(entry => entry.contributor === founderData.name)
        .reduce((sum, entry) => sum + entry.hours, 0);
    const founderRate = founderHoursFromTimesheet > 0
        ? timesheetEntries
        .filter(entry => entry.contributor === founderData.name)
        .reduce((sum, entry) => sum + entry.total, 0) / founderHoursFromTimesheet
        : founderData.deferredWageRate;

    // Use timesheet hours if available, otherwise use default example hours
    const contributorHours = contributorHoursFromTimesheet > 0 ? contributorHoursFromTimesheet : 60;
    const founderHours = founderHoursFromTimesheet > 0 ? founderHoursFromTimesheet : 40;

    const [availableProfit, setAvailableProfit] = useState(1000);
    const [localContributorRate, setLocalContributorRate] = useState(contributorRate);
    const [localContributorHours, setLocalContributorHours] = useState(contributorHours);
    const [localFounderRate, setLocalFounderRate] = useState(founderRate);
    const [localFounderHours, setLocalFounderHours] = useState(founderHours);
    const [compensationData, setCompensationData] = useState<CompensationData>({
        contributorOwed: 0,
        founderOwed: 0,
        totalOwed: 0,
        distributionPercentage: 0,
        contributorPayment: 0,
        founderPayment: 0
    });

    // Sync local state with context data when it changes
    useEffect(() => {
        setLocalContributorRate(contributorRate);
        setLocalContributorHours(contributorHours);
        setLocalFounderRate(founderRate);
        setLocalFounderHours(founderHours);
    }, [contributorRate, contributorHours, founderRate, founderHours]);

    const contributorOwed = localContributorRate * localContributorHours;
    const founderOwed = localFounderRate * localFounderHours;

    useEffect(() => {
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
    }, [contributorOwed, founderOwed, availableProfit]);

    const pieChartData = [
        {
            id: 0,
            value: compensationData.contributorPayment,
            color: theme.palette.secondary.main
        },
        {
            id: 1,
            value: compensationData.founderPayment,
            color: theme.palette.primary.main
        }
    ].filter(item => item.value > 0);

    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: {xs: 'column', lg: 'row'}, gap: 1}}>
                {/* Input Controls */}
                <Box sx={{flex: 1, minWidth: 300}}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Test Profit Share Scenarios
                            </Typography>

                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                                <Box>
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                        {contributorData.name} - Total Owed:
                                        ${Intl.NumberFormat('en-US').format(contributorOwed)}
                                    </Typography>
                                    <Box sx={{display: 'flex', gap: 2}}>
                                        <TextField
                                            fullWidth
                                            label="Hourly Rate ($)"
                                            type="number"
                                            value={localContributorRate}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value) || 0;
                                                setLocalContributorRate(value);
                                                updateContributorData({deferredWageRate: value});
                                            }}
                                            variant="outlined"
                                            size="small"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Accrued Hours"
                                            type="number"
                                            value={localContributorHours}
                                            onChange={(e) => setLocalContributorHours(parseFloat(e.target.value) || 0)}
                                            variant="outlined"
                                            size="small"
                                            inputProps={{step: 0.01}}
                                        />
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                        {founderData.name} - Total Owed:
                                        ${Intl.NumberFormat('en-US').format(founderOwed)}
                                    </Typography>
                                    <Box sx={{display: 'flex', gap: 2}}>
                                        <TextField
                                            fullWidth
                                            label="Hourly Rate ($)"
                                            type="number"
                                            value={localFounderRate}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value) || 0;
                                                setLocalFounderRate(value);
                                                updateFounderData({deferredWageRate: value});
                                            }}
                                            variant="outlined"
                                            size="small"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Accrued Hours"
                                            type="number"
                                            value={localFounderHours}
                                            onChange={(e) => setLocalFounderHours(parseFloat(e.target.value) || 0)}
                                            variant="outlined"
                                            size="small"
                                            inputProps={{step: 1}}
                                        />
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                        1 Month Company Profit*
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Available Profit this Month ($)"
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
                                    <strong>"Profit" is after:</strong><br/>
                                    • All operating expenses paid<br/>
                                    • All employee wages paid<br/>
                                    • 3 months of median operating expenses + employee wages on reserve
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
                                Scenario Results
                            </Typography>

                            <Grid container>

                                {/* Pie Chart */}
                                {pieChartData.length > 0 && (
                                    <Grid sx={{height: 300, display: 'flex', justifyContent: 'center'}}>
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
                                            margin={{top: 0, right: 0, bottom: 0, left: 0}}
                                        />
                                    </Grid>
                                )}
                                <Grid>

                                    <Box sx={{mb: 1}}>
                                        <Typography variant="body2">
                                            Distributable Profit
                                        </Typography>
                                        <Typography variant="h6">
                                            ${Intl.NumberFormat('en-US').format(availableProfit)}
                                        </Typography>
                                    </Box>

                                    <Box sx={{mb: 3}}>
                                        <Typography variant="body2">
                                            Pro-Rata Distribution
                                        </Typography>
                                        <Typography variant="h6">
                                            {(compensationData.distributionPercentage * 100).toFixed(2)}%
                                        </Typography>
                                    </Box>


                                    <Divider sx={{my: 2}}/>

                                    <Stack spacing={2}>
                                        <Box>
                                            <Typography variant="body2" color="secondary.main">
                                                {contributorData.name}'s Payment
                                            </Typography>
                                            <Typography variant="h5" color="secondary.main">
                                                ${compensationData.contributorPayment.toFixed(2)}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" color="primary.main">
                                                {founderData.name}'s Payment
                                            </Typography>
                                            <Typography variant="h5" color="primary.main">
                                                ${compensationData.founderPayment.toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Alert severity="info" sx={{mt: 2}}>
                                <Typography variant="body2">
                                    Pro-Rata Formula: Available Profit
                                    (${Intl.NumberFormat('en-US').format(availableProfit)}) / Total Debt
                                    (${Intl.NumberFormat('en-US').format(compensationData.totalOwed)})
                                    = {(compensationData.distributionPercentage * 100).toFixed(2)}%
                                </Typography>
                            </Alert>

                        </CardContent>
                    </Card>
                </Box>
            </Box>


        </Box>
    );
};

export default SimpleDeferredCompensationCalculator;
