import React, {useState} from 'react';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import {Add, Delete, Download, Edit} from '@mui/icons-material';
import {type TimesheetEntry} from '../contexts/FormDataContext';
import {useFormData} from '../hooks/useFormDataHooks';
import {useContractData} from '../hooks/useFormDataHooks';

const DeferredWageTimesheet: React.FC = () => {
    const {
        timesheetEntries,
        addTimesheetEntry,
        updateTimesheetEntry,
        removeTimesheetEntry,
        totalDeferredWages,
        totalHoursWorked,
        averageHourlyRate,
        founderData,
        contributorData
    } = useFormData();

    const {getPlaceholder} = useContractData();
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<TimesheetEntry>({
        partner: '',
        date: '',
        workDone: '',
        hours: 0,
        rate: 0,
        total: 0
    });

    // Helper function to get the appropriate rate based on contributor
    const getRateForContributor = (contributor: string): number => {
        if (contributor === getPlaceholder('FOUNDER_NAME')) {
            return founderData.deferredWageRate;
        } else if (contributor === getPlaceholder('CONTRIBUTOR_NAME')) {
            return contributorData.deferredWageRate;
        }
        return 0;
    };

    const handleOpen = (index?: number) => {
        if (index !== undefined) {
            setEditingIndex(index);
            setFormData(timesheetEntries[index]);
        } else {
            setEditingIndex(null);
            setFormData({
                partner: '',
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
            partner: '',
            date: '',
            workDone: '',
            hours: 0,
            rate: 0,
            total: 0
        });
    };

    const handleSave = () => {
        const effectiveRate = formData.rate || getRateForContributor(formData.partner);
        const entry = {
            ...formData,
            rate: effectiveRate,
            total: formData.hours * effectiveRate
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
            `,Total Debt,${timesheetEntries.length > 0 ? timesheetEntries[0].partner : 'Partner 1'},${totalHoursWorked},,"$${totalDeferredWages.toFixed(2)}"`,
            `,Total Debt,${timesheetEntries.length > 1 ? timesheetEntries[1].partner : 'Partner 2'},${totalHoursWorked},,"$${totalDeferredWages.toFixed(2)}"`,
            '',
            '',
            'Partner,Date,Work Done,Hours,Rate ($/hr),Total',
            ...timesheetEntries.map((entry: TimesheetEntry) =>
                `"${entry.partner}","${entry.date}","${entry.workDone}",${entry.hours},$${entry.rate.toFixed(2)},"$${entry.total.toFixed(2)}"`
            )
        ].join('\n');

        const blob = new Blob([csvContent], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'deferred-wages-timesheet.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };


    return (
        <>
            <>

                {/* Summary Cards */}
                <Box sx={{display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap'}}>
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

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Partner</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Work Done</TableCell>
                                <TableCell align="right">Hours</TableCell>
                                <TableCell align="right">Rate ($/hr)</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timesheetEntries.map((entry: TimesheetEntry, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{entry.partner}</TableCell>
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
                                            <Edit/>
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDelete(index)}
                                            color="error"
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter sx={{py: 0}}>
                            <TableRow sx={{py: 0}}>
                                <TableCell colSpan={3} align="left" sx={{py: 0, px: 1}}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{py: .2}}
                                        startIcon={<Add/>}
                                        onClick={() => handleOpen()}
                                    >
                                        Add Entry
                                    </Button>
                                </TableCell>
                                <TableCell colSpan={4} align="right" sx={{p: 1, gap: 1}}>
                                    <Button
                                        size="small"
                                        startIcon={<Download/>}
                                        onClick={exportToCSV}
                                        sx={{py: .2}}
                                        variant="outlined"
                                    >
                                        Export CSV
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

                {/* Add/Edit Dialog */}
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>
                        {editingIndex !== null ? 'Edit Timesheet Entry' : 'Add Timesheet Entry'}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
                            <TextField
                                select
                                fullWidth
                                label="Name"
                                value={formData.partner}
                                onChange={handleInputChange('partner')}
                                required
                            >
                                <MenuItem value={getPlaceholder('FOUNDER_NAME')}>{getPlaceholder('FOUNDER_NAME')}</MenuItem>
                                <MenuItem value={getPlaceholder('CONTRIBUTOR_NAME')}>{getPlaceholder('CONTRIBUTOR_NAME')}</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                label="Date"
                                type="date"
                                value={formData.date}
                                onChange={handleInputChange('date')}
                                InputLabelProps={{shrink: true}}
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
                            <TextField
                                label="Hours"
                                type="number"
                                value={formData.hours}
                                onChange={handleInputChange('hours')}
                                inputProps={{min: 0, step: 0.5}}
                                disabled={formData.partner === ''}
                            />
                            <TextField
                                label="$ / Hr"
                                type="number"
                                value={getRateForContributor(formData.partner).toFixed(2)}
                                disabled
                                inputProps={{readOnly: true}}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave} variant="contained">
                            {editingIndex !== null ? 'Update' : 'Add'} Entry
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        </>
    );
};

export default DeferredWageTimesheet;
