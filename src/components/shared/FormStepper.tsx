import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Step,
    StepLabel,
    Stepper,
    Typography
} from '@mui/material';
import {CheckCircle} from '@mui/icons-material';

interface FormStepperProps {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle: string;
    steps: string[];
    activeStep: number;
    onNext: () => void;
    onBack: () => void;
    onSubmit: () => void;
    onCancel: () => void;
    isSubmitted: boolean;
    canSubmit: boolean;
    children: React.ReactNode;
}

const FormStepper: React.FC<FormStepperProps> = ({
                                                     open,
                                                     onClose,
                                                     title,
                                                     subtitle,
                                                     steps,
                                                     activeStep,
                                                     onNext,
                                                     onBack,
                                                     onSubmit,
                                                     onCancel,
                                                     isSubmitted,
                                                     canSubmit,
                                                     children
                                                 }) => {
    if (isSubmitted) {
        return (
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <CheckCircle color="success"/>
                        <Typography variant="h6">Form Submitted Successfully!</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Thank you for completing the form. We'll review your information and get back to you soon.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {subtitle}
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Stepper activeStep={activeStep} orientation="horizontal" sx={{mb: 3}}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{mt: 2}}>
                    {children}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    disabled={activeStep === 0}
                    onClick={onBack}
                >
                    Back
                </Button>
                <Box sx={{flex: '1 1 auto'}}/>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
                {activeStep === steps.length - 1 ? (
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        disabled={!canSubmit}
                    >
                        Submit Form
                    </Button>
                ) : (
                    <Button onClick={onNext} variant="contained">
                        Next
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default FormStepper;
