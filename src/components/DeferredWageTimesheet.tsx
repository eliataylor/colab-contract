import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Chip,
  Alert
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Download
} from '@mui/icons-material';
import { useFormData, type TimesheetEntry } from '../contexts/FormDataContext';
import {
  PageContainer,
  PageTitle,
  Description,
  StyledCard,
  CardBody,
  CardTitle,
  PrimaryButton,
  FadeIn
} from './styled/StyledComponents';

const DeferredWageTimesheet: React.FC = () => {
  const { timesheetEntries, addTimesheetEntry, updateTimesheetEntry, removeTimesheetEntry, totalDeferredWages, totalHoursWorked, averageHourlyRate } = useFormData();
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<TimesheetEntry>({
    contributor: '',
    date: '',
    workDone: '',
    hours: 0,
    rate: 0,
    total: 0
  });

  const handleOpen = (index?: number) => {
    if (index !== undefined) {
      setEditingIndex(index);
      setFormData(timesheetEntries[index]);
    } else {
      setEditingIndex(null);
      setFormData({
        contributor: '',
        date: '',
        workDone: '',
        hours: 0,
        rate: 0,
        total: 0
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingIndex(null);
    setFormData({
      contributor: '',
      date: '',
      workDone: '',
      hours: 0,
      rate: 0,
      total: 0
    });
  };

  const handleSave = () => {
    const entry = {
      ...formData,
      total: formData.hours * formData.rate
    };

    if (editingIndex !== null) {
      updateTimesheetEntry(editingIndex, entry);
    } else {
      addTimesheetEntry(entry);
    }
    handleClose();
  };

  const handleDelete = (index: number) => {
    removeTimesheetEntry(index);
  };

  const handleInputChange = (field: keyof TimesheetEntry) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'hours' || field === 'rate' ? parseFloat(event.target.value) || 0 : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const exportToCSV = () => {
    const csvContent = [
      'Founding Members Hourly Timesheet',
      '',
      `,Total Debt,${timesheetEntries.length > 0 ? timesheetEntries[0].contributor : 'Contributor 1'},${totalHoursWorked},,"$${totalDeferredWages.toFixed(2)}"`,
      `,Total Debt,${timesheetEntries.length > 1 ? timesheetEntries[1].contributor : 'Contributor 2'},${totalHoursWorked},,"$${totalDeferredWages.toFixed(2)}"`,
      '',
      '',
      'Contributor,Date,Work Done,Hours,Rate ($/hr),Total',
      ...timesheetEntries.map(entry => 
        `"${entry.contributor}","${entry.date}","${entry.workDone}",${entry.hours},$${entry.rate.toFixed(2)},"$${entry.total.toFixed(2)}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deferred-wages-timesheet.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Group entries by contributor
  const entriesByContributor = timesheetEntries.reduce((acc, entry, index) => {
    if (!acc[entry.contributor]) {
      acc[entry.contributor] = [];
    }
    acc[entry.contributor].push({ ...entry, index });
    return acc;
  }, {} as Record<string, (TimesheetEntry & { index: number })[]>);

  return (
    <PageContainer>
      <FadeIn>
        <PageTitle variant="h4" color="primary">
          Deferred Wage Timesheet
        </PageTitle>
        
        <Description>
          Track hours worked and deferred compensation for all contributors
        </Description>

        <StyledCard>
          <CardBody>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <CardTitle variant="h5">
                Timesheet Entries
              </CardTitle>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => handleOpen()}
                >
                  Add Entry
                </Button>
                <Button
                  startIcon={<Download />}
                  onClick={exportToCSV}
                  variant="outlined"
                >
                  Export CSV
                </Button>
              </Box>
            </Box>

            {/* Summary Cards */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <Chip 
                label={`Total Hours: ${totalHoursWorked}`} 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                label={`Total Deferred: $${totalDeferredWages.toFixed(2)}`} 
                color="secondary" 
                variant="outlined" 
              />
              <Chip 
                label={`Avg Rate: $${averageHourlyRate.toFixed(2)}/hr`} 
                color="default" 
                variant="outlined" 
              />
            </Box>

            {timesheetEntries.length === 0 ? (
              <Alert severity="info">
                No timesheet entries yet. Click "Add Entry" to get started.
              </Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Contributor</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Work Done</TableCell>
                      <TableCell align="right">Hours</TableCell>
                      <TableCell align="right">Rate ($/hr)</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {timesheetEntries.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.contributor}</TableCell>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>{entry.workDone}</TableCell>
                        <TableCell align="right">{entry.hours}</TableCell>
                        <TableCell align="right">${entry.rate.toFixed(2)}</TableCell>
                        <TableCell align="right">${entry.total.toFixed(2)}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => handleOpen(index)}
                            color="primary"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(index)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <DialogTitle>
                {editingIndex !== null ? 'Edit Timesheet Entry' : 'Add Timesheet Entry'}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Contributor Name"
                    value={formData.contributor}
                    onChange={handleInputChange('contributor')}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange('date')}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Work Done"
                    multiline
                    rows={3}
                    value={formData.workDone}
                    onChange={handleInputChange('workDone')}
                    required
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      label="Hours"
                      type="number"
                      value={formData.hours}
                      onChange={handleInputChange('hours')}
                      inputProps={{ min: 0, step: 0.5 }}
                      required
                    />
                    <TextField
                      label="Rate ($/hr)"
                      type="number"
                      value={formData.rate}
                      onChange={handleInputChange('rate')}
                      inputProps={{ min: 0, step: 0.01 }}
                      required
                    />
                    <TextField
                      label="Total"
                      type="number"
                      value={formData.hours * formData.rate}
                      disabled
                      inputProps={{ readOnly: true }}
                    />
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">
                  {editingIndex !== null ? 'Update' : 'Add'} Entry
                </Button>
              </DialogActions>
            </Dialog>
          </CardBody>
        </StyledCard>
      </FadeIn>
    </PageContainer>
  );
};

export default DeferredWageTimesheet;
