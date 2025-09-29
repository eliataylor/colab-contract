import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Slider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Alert,
  Chip,
  Button
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useFormData } from '../contexts/FormDataContext';

interface VestingData {
  months: number;
  days: number;
  vested: number;
}

const VestingCalculator: React.FC = () => {
  const { contributorData, updateContributorData } = useFormData();
  const [totalEquity, setTotalEquity] = useState(contributorData.totalEquityGranted || 25);
  const [vestingYears, setVestingYears] = useState(contributorData.vestingPeriod || 4);
  const [vestingData, setVestingData] = useState<VestingData[]>([]);
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });

  const cliffDays = 180;

  const calculateVesting = (totalEquity: number, totalVestingDays: number, daysWorked: number): number => {
    if (daysWorked <= cliffDays) return 0;
    const numerator = daysWorked - cliffDays;
    const denominator = totalVestingDays - cliffDays;
    const ratio = numerator / denominator;
    return totalEquity * Math.pow(ratio, 2);
  };

  const handleApplyChanges = () => {
    updateContributorData({
      totalEquityGranted: totalEquity,
      vestingPeriod: vestingYears
    });
  };

  useEffect(() => {
    const totalVestingDays = vestingYears * 365;
    const data: VestingData[] = [];
    const labels: string[] = [];
    const chartValues: number[] = [];

    for (let i = 0; i <= vestingYears * 12; i += 6) {
      const currentDays = (i / 12) * 365;
      const vestedEquity = calculateVesting(totalEquity, totalVestingDays, currentDays);
      
      data.push({
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

    setVestingData(data);
    setChartData({ labels, data: chartValues });
  }, [totalEquity, vestingYears]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Vesting Equity Calculator
      </Typography>
      
      <Typography variant="body1" paragraph align="center" color="text.secondary">
        Our agreement uses an accelerating vesting schedule to reward long-term commitment. 
        Adjust the parameters below to see how equity grows over time.
      </Typography>

      <Grid container spacing={4}>
        {/* Controls */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vesting Parameters
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography gutterBottom>
                  Total Equity Grant: <strong>{totalEquity}%</strong>
                </Typography>
                <Slider
                  value={totalEquity}
                  onChange={(_, value) => setTotalEquity(value as number)}
                  min={1}
                  max={50}
                  step={1}
                  marks={[
                    { value: 1, label: '1%' },
                    { value: 25, label: '25%' },
                    { value: 50, label: '50%' }
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography gutterBottom>
                  Vesting Period: <strong>{vestingYears} years</strong>
                </Typography>
                <Slider
                  value={vestingYears}
                  onChange={(_, value) => setVestingYears(value as number)}
                  min={1}
                  max={10}
                  step={1}
                  marks={[
                    { value: 1, label: '1yr' },
                    { value: 4, label: '4yr' },
                    { value: 10, label: '10yr' }
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>6-month cliff:</strong> No equity vests before completing 180 days of work.
                </Typography>
              </Alert>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                <strong>Formula:</strong><br/>
                Vested Equity = Total Equity × ((Days Worked - Cliff Days) / (Total Vesting Days - Cliff Days))²
              </Typography>

              <Button 
                variant="contained" 
                fullWidth
                onClick={handleApplyChanges}
                disabled={totalEquity === contributorData.totalEquityGranted && vestingYears === contributorData.vestingPeriod}
              >
                Apply to Contributor Form
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Equity Vesting Schedule
              </Typography>
              <Box sx={{ height: 400 }}>
                <LineChart
                  xAxis={[{ data: chartData.labels, scaleType: 'point' }]}
                  series={[
                    {
                      data: chartData.data,
                      label: 'Vested Equity (%)',
                      color: '#1976d2',
                      curve: 'catmullRom'
                    }
                  ]}
                  height={350}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Table */}
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default VestingCalculator;
