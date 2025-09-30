import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Slider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {LineChart} from '@mui/x-charts/LineChart';
import {useContributorData} from '../contexts/FormDataContext';
import VestingFormula from './VestingFormula';

interface VestingData {
    months: number;
    days: number;
    vested: number;
}

const SimpleVestingCalculator: React.FC = () => {
    const {contributorData, updateContributorData} = useContributorData();
    const [chartData, setChartData] = useState<{ labels: string[]; data: number[] }>({labels: [], data: []});
    const [vestingData, setVestingData] = useState<VestingData[]>([]);

    // Use values from context
    const totalEquity = contributorData.totalEquityGranted;
    const vestingDays = contributorData.vestingPeriod * 365;
    const cliffDays = contributorData.cliffDays;
    const vestingExponent = contributorData.vestingExponent;

    const calculateVesting = (totalEquity: number, totalVestingDays: number, daysWorked: number): number => {
        if (daysWorked <= cliffDays) return 0;
        const numerator = daysWorked - cliffDays;
        const denominator = totalVestingDays - cliffDays;
        const ratio = numerator / denominator;
        return totalEquity * Math.pow(ratio, vestingExponent);
    };

    useEffect(() => {
        const labels: string[] = [];
        const chartValues: number[] = [];
        const vestingDataArray: VestingData[] = [];

        // Calculate months for chart display
        const totalMonths = Math.round(vestingDays / 30.44); // Average days per month

        for (let i = 0; i <= totalMonths; i += 6) {
            const currentDays = (i / 12) * 365;
            const vestedEquity = calculateVesting(totalEquity, vestingDays, currentDays);

            // Add to vesting data array
            vestingDataArray.push({
                months: i,
                days: Math.round(currentDays),
                vested: parseFloat(vestedEquity.toFixed(2))
            });

            if (i === 0) {
                labels.push('Start');
                chartValues.push(0);
            } else {
                labels.push(`${i} mo`);
                chartValues.push(vestedEquity);
            }
        }

        setChartData({labels, data: chartValues});
        setVestingData(vestingDataArray);
    }, [totalEquity, vestingDays, cliffDays, vestingExponent]);


    return (
        <Box>


            <Box sx={{display: 'flex', flexDirection: {xs: 'column', lg: 'row'}, gap: 2}}>
                {/* Controls */}
                <Box sx={{minWidth: 320}}>
                    <Card elevation={2} sx={{px: 1}}>
                        <CardContent>
                            <Box sx={{mb: 4}}>
                                <Typography gutterBottom variant="body2">
                                    Total Equity Granted: <strong>{totalEquity}%</strong>
                                </Typography>
                                <Slider
                                    value={totalEquity}
                                    onChange={(_, value) => updateContributorData({totalEquityGranted: value as number})}
                                    min={1}
                                    max={50}
                                    step={1}
                                    marks={[
                                        {value: 1, label: '1%'},
                                        {value: 25, label: '25%'},
                                        {value: 50, label: '50%'}
                                    ]}
                                    valueLabelDisplay="auto"
                                />
                            </Box>

                            <Box sx={{mb: 4}}>
                            <Typography gutterBottom variant="body2">
                                    Vesting
                                    Period: <strong>{vestingDays} days</strong> ({Math.round(vestingDays / 365 * 10) / 10} years)
                                </Typography>
                                <Slider
                                    value={vestingDays}
                                    onChange={(_, value) => updateContributorData({vestingPeriod: (value as number) / 365})}
                                    min={365}
                                    max={3650}
                                    step={1}
                                    marks={[
                                        {value: 365, label: '1yr'},
                                        {value: 730, label: '2yr'},
                                        {value: 1095, label: '3yr'},
                                        {value: 1460, label: '4yr'},
                                        {value: 1825, label: '5yr'},
                                        {value: 2190, label: '6yr'},
                                        {value: 2555, label: '7yr'},
                                        {value: 2920, label: '8yr'},
                                        {value: 3285, label: '9yr'},
                                        {value: 3650, label: '10yr'}
                                    ]}
                                    valueLabelDisplay="auto"
                                />
                            </Box>

                            <Box sx={{mb: 4}}>
                            <Typography gutterBottom variant="body2">
                                    Waiting (cliff)
                                    Period: <strong>{cliffDays} days</strong> ({Math.round(cliffDays / 30.44)} months)
                                </Typography>
                                <Slider
                                    value={cliffDays}
                                    onChange={(_, value) => updateContributorData({cliffDays: value as number})}
                                    min={0}
                                    max={365}
                                    step={1}
                                    marks={[
                                        {value: 0, label: '0mo'},
                                        {value: 90, label: '3mo'},
                                        {value: 180, label: '6mo'},
                                        {value: 270, label: '9mo'},
                                        {value: 365, label: '12mo'}
                                    ]}
                                    valueLabelDisplay="auto"
                                />
                            </Box>

                            <Box sx={{mb: 4}}>
                                <Typography gutterBottom variant="body2">
                                    Vesting Curve Exponent: <strong>{vestingExponent}</strong>
                                </Typography>
                                <Slider
                                    value={vestingExponent}
                                    onChange={(_, value) => updateContributorData({vestingExponent: value as number})}
                                    min={0.5}
                                    max={5}
                                    step={0.1}
                                    marks={[
                                        {value: 0.5, label: '0.5'},
                                        {value: 1, label: '1.0'},
                                        {value: 2, label: '2.0'},
                                        {value: 3, label: '3.0'},
                                        {value: 4, label: '4.0'},
                                        {value: 5, label: '5.0'}
                                    ]}
                                    valueLabelDisplay="auto"
                                />
                            </Box>

                            <Alert severity="info" sx={{py: 0}}>
                                <Typography variant="body2" sx={{py: 0}}>
                                    <strong>{Math.round(cliffDays / 30.44)}-month cliff:</strong> No equity vests before
                                    completing {cliffDays} days of work.
                                </Typography>
                            </Alert>
                        </CardContent>
                    </Card>
                </Box>

                <Box>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Vesting Schedule Details
                            </Typography>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Time (Months)</strong></TableCell>
                                            <TableCell><strong>Days Worked</strong></TableCell>
                                            <TableCell align="right"><strong>Vested Equity (%)</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {vestingData.map((row, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell>
                                                    {row.months === 0 ? 'Start' : `${row.months}`}
                                                </TableCell>
                                                <TableCell>{row.days}</TableCell>
                                                <TableCell align="right">
                                                    <Chip
                                                        label={`${row.vested}%`}
                                                        color={row.vested > 0 ? 'primary' : 'default'}
                                                        variant={row.vested > 0 ? 'filled' : 'outlined'}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Box>
            </Box>


            {/* Chart */}
            <Box sx={{width: '100%', mt: 2}}>
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Daily Equity Vesting Schedule
                        </Typography>
                        <LineChart
                            xAxis={[{data: chartData.labels, scaleType: 'point'}]}
                            yAxis={[{label: 'Total Equity Granted (%)'}]}
                            series={[
                                {
                                    data: chartData.data,
                                    label: `Daily Equity Vested == ${totalEquity}% × ((Days - ${cliffDays}) / (${vestingDays} - ${cliffDays}))^${vestingExponent}`,
                                    color: '#1976d2',
                                    curve: 'catmullRom'
                                }
                            ]}
                            height={350}
                        />
                    </CardContent>
                </Card>
            </Box>
                        
        </Box>
    );
};

export default SimpleVestingCalculator;
