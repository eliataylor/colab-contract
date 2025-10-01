import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, Chip, Paper, Step, StepContent, StepLabel, Stepper, Typography} from '@mui/material';
import {AttachMoney, Business, CheckCircle, People, RadioButtonUnchecked, Security, Warning} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {useFormData} from '../hooks/useFormDataHooks';

// Progress steps configuration
const progressSteps = [
    {
        id: 'founder-protections',
        label: 'IP Definition',
        description: 'Custom IP definition',
        icon: <Security/>,
        path: '/',
        hash: '#protections'
    },
    {
        id: 'vesting',
        label: 'Vesting Schedule',
        description: '',
        icon: <AttachMoney/>,
        path: '/',
        hash: '#vesting'
    },
    {
        id: 'deferred',
        label: 'Deferred Wages',
        description: '',
        icon: <AttachMoney/>,
        path: '/',
        hash: '#deferred-wage'
    },
    {
        id: 'founder-contact',
        label: 'Founder Info',
        description: 'Name, email, phone, address',
        icon: <Business/>,
        path: '/',
        hash: '#founder-contact'
    },
    {
        id: 'contributor-contact',
        label: 'Contributor Info',
        description: 'Name, email, phone, address',
        icon: <People/>,
        path: '/',
        hash: '#contributor-contact'
    }
];

// Styled components following the existing pattern
const ProgressContainer = styled(Paper)(({theme}) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.mode === 'light' ? '#f8fafc' : '#040f1b',
    border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#071b32'}`,
    borderRadius: '0 0 8px 0',
}));

const ProgressTitle = styled(Typography)(({theme}) => ({
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
}));

const ProgressSubtitle = styled(Typography)(({theme}) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    display: 'block',
}));

const StepLabelContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const ActionButton = styled(Button)(({theme}) => ({
    textTransform: 'none',
    fontSize: '0.75rem',
    padding: theme.spacing(0.5, 1),
    minHeight: 32,
}));

interface ContractProgressStepperProps {
    onStepClick?: (stepId: string) => void;
}

const ContractProgressStepper: React.FC<ContractProgressStepperProps> = ({onStepClick}) => {
    const {founderData, contributorData} = useFormData();
    const navigate = useNavigate();

    // Progress calculation based on field values (including query parameter prepopulated data)
    const getStepStatus = (stepId: string) => {
        switch (stepId) {
            case 'founder-protections':
                return !!founderData.customIPDefinition;
            case 'vesting':
                return contributorData.totalEquityGranted > 0 && contributorData.vestingPeriod > 0;
            case 'deferred':
                return founderData.deferredWageRate > 0 && contributorData.deferredWageRate > 0;
            case 'founder-contact':
                return !!(founderData.name && founderData.email && founderData.phone && founderData.address);
            case 'contributor-contact':
                return !!(contributorData.name && contributorData.email && contributorData.phone && contributorData.address);
            default:
                return false;
        }
    };

    const getStepCompletion = (stepId: string) => {
        const isComplete = getStepStatus(stepId);
        const isPartial = getPartialCompletion(stepId);

        if (isComplete) return 'complete';
        if (isPartial) return 'partial';
        return 'incomplete';
    };

    const getPartialCompletion = (stepId: string) => {
        switch (stepId) {
            case 'founder-contact':
                return !!(founderData.name || founderData.email || founderData.phone || founderData.address);
            case 'contributor-contact':
                return !!(contributorData.name || contributorData.email || contributorData.phone || contributorData.address);
            case 'founder-protections':
                return !!founderData.customIPDefinition;
            case 'vesting':
                return contributorData.totalEquityGranted > 0 || contributorData.vestingPeriod > 0;
            case 'deferred':
                return founderData.deferredWageRate > 0 || contributorData.deferredWageRate > 0;
            default:
                return false;
        }
    };

    const getStepIcon = (stepId: string) => {
        const status = getStepCompletion(stepId);
        switch (status) {
            case 'complete':
                return <CheckCircle color="success" fontSize="small"/>;
            case 'partial':
                return <Warning color="warning" fontSize="small"/>;
            default:
                return <RadioButtonUnchecked color="disabled" fontSize="small"/>;
        }
    };

    const handleStepClick = (step: typeof progressSteps[0]) => {
        console.log('handleStepClick', step);
        if (onStepClick) {
            onStepClick(step.id);
        } else {
            // Navigate to the page with hash for specific section
            navigate(`${step.path}${step.hash}`);
        }
    };

    const completedSteps = progressSteps.filter(step => getStepStatus(step.id)).length;
    const totalSteps = progressSteps.length;

    return (
        <ProgressContainer elevation={0}>
            <ProgressTitle variant="subtitle2">
                Contract Setup Progress
            </ProgressTitle>
            <ProgressSubtitle variant="caption">
                {completedSteps} of {totalSteps} steps complete
            </ProgressSubtitle>

            <Stepper nonLinear orientation="vertical" activeStep={-1}>
                {progressSteps.map((step) => {
                    const status = getStepCompletion(step.id);
                    const isComplete = status === 'complete';
                    const isPartial = status === 'partial';

                    return (
                        <Step key={step.id} completed={isComplete}
                              style={{cursor: 'pointer'}}
                              onClick={() => handleStepClick(step)}>
                            <StepLabel
                                icon={getStepIcon(step.id)}
                                sx={{
                                    '& .MuiStepLabel-label': {
                                        fontSize: '0.875rem',
                                        fontWeight: isComplete ? 'bold' : 'normal',
                                        color: isComplete ? 'success.main' : isPartial ? 'warning.main' : 'text.secondary'
                                    }
                                }}
                            >
                                <StepLabelContainer>
                                    <Typography variant="body2" sx={{fontWeight: isComplete ? 'bold' : 'normal'}}>
                                        {step.label}
                                    </Typography>
                                    {isPartial && (
                                        <Chip
                                            label="In Progress"
                                            size="small"
                                            color="warning"
                                            variant="outlined"
                                            sx={{fontSize: '0.75rem', height: 20}}
                                        />
                                    )}
                                </StepLabelContainer>
                            </StepLabel>
                            <StepContent>
                                <Box sx={{mb: 2}}>
                                    <ActionButton
                                        variant="outlined"
                                        size="small"
                                        startIcon={step.icon}
                                    >
                                        {isComplete ? 'Update' : 'Complete'} {step.label}
                                    </ActionButton>
                                </Box>
                            </StepContent>
                        </Step>
                    );
                })}
            </Stepper>
        </ProgressContainer>
    );
};

export default ContractProgressStepper;
