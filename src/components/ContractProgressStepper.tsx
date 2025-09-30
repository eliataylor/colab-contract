import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Button, Chip, Paper, Step, StepContent, StepLabel, Stepper, Typography} from '@mui/material';
import {
    AttachMoney,
    Business,
    CheckCircle,
    People,
    RadioButtonUnchecked,
    Security,
    TrendingUp,
    Warning
} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {useFormData} from '../contexts/FormDataContext';

// Progress steps configuration
const progressSteps = [
    {
        id: 'founder-contact',
        label: 'Founder Contact',
        description: 'Name, email, phone, address',
        icon: <Business/>,
        path: '/founder',
        hash: '#personal-info'
    },
    {
        id: 'contributor-contact',
        label: 'Contributor Contact',
        description: 'Name, email, phone, address',
        icon: <People/>,
        path: '/contributor',
        hash: '#personal-info'
    },
    {
        id: 'founder-protections',
        label: 'Founder Protections',
        description: 'Custom IP definition',
        icon: <Security/>,
        path: '/founder',
        hash: '#additional-terms'
    },
    {
        id: 'founder-incentives',
        label: 'Founder Incentives',
        description: 'Deferred wage rate',
        icon: <AttachMoney/>,
        path: '/founder',
        hash: '#compensation'
    },
    {
        id: 'contributor-incentives',
        label: 'Contributor Incentives',
        description: 'Equity, vesting, wage rate',
        icon: <TrendingUp/>,
        path: '/contributor',
        hash: '#compensation-expectations'
    }
];

// Styled components following the existing pattern
const ProgressContainer = styled(Paper)(({theme}) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.mode === 'light' ? '#f8fafc' : '#1e293b',
    border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'}`,
    borderRadius: 8,
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

const StepDescription = styled(Typography)(({theme}) => ({
    color: theme.palette.text.secondary,
    display: 'block',
    marginTop: theme.spacing(0.5),
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
    const {founderFieldsModified, contributorFieldsModified} = useFormData();
    const navigate = useNavigate();
    const location = useLocation();

    // Progress calculation based on user interaction
    const getStepStatus = (stepId: string) => {
        switch (stepId) {
            case 'founder-contact':
                return founderFieldsModified.has('name') && founderFieldsModified.has('email') &&
                    founderFieldsModified.has('phone') && founderFieldsModified.has('address');
            case 'contributor-contact':
                return contributorFieldsModified.has('name') && contributorFieldsModified.has('email') &&
                    contributorFieldsModified.has('phone') && contributorFieldsModified.has('address');
            case 'founder-protections':
                return founderFieldsModified.has('customIPDefinition');
            case 'founder-incentives':
                return founderFieldsModified.has('deferredWageRate');
            case 'contributor-incentives':
                return contributorFieldsModified.has('totalEquityGranted') &&
                    contributorFieldsModified.has('vestingPeriod') &&
                    contributorFieldsModified.has('deferredWageRate');
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
                return founderFieldsModified.has('name') || founderFieldsModified.has('email') ||
                    founderFieldsModified.has('phone') || founderFieldsModified.has('address');
            case 'contributor-contact':
                return contributorFieldsModified.has('name') || contributorFieldsModified.has('email') ||
                    contributorFieldsModified.has('phone') || contributorFieldsModified.has('address');
            case 'founder-protections':
                return founderFieldsModified.has('customIPDefinition');
            case 'founder-incentives':
                return founderFieldsModified.has('deferredWageRate');
            case 'contributor-incentives':
                return contributorFieldsModified.has('totalEquityGranted') ||
                    contributorFieldsModified.has('vestingPeriod') ||
                    contributorFieldsModified.has('deferredWageRate');
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

    const isCurrentStep = (step: typeof progressSteps[0]) => {
        const isCurrent = location.pathname === step.path && location.hash === step.hash;
        console.log(`Checking step ${step.id}: path=${location.pathname}, hash=${location.hash}, stepPath=${step.path}, stepHash=${step.hash}, isCurrent=${isCurrent}`);
        return isCurrent;
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
                    const isCurrent = isCurrentStep(step);

                    return (
                        <Step key={step.id} completed={isComplete}
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
                                {isCurrent && (
                                    <StepDescription variant="caption">
                                        {step.description}
                                    </StepDescription>
                                )}
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
