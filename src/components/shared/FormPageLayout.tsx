import React from 'react';
import {Alert, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import {CheckCircle} from '@mui/icons-material';
import {
    CardBody,
    CardFooter,
    CardTitle,
    Description,
    FadeIn,
    PageContainer,
    PageTitle,
    PrimaryButton,
    StatusContainer,
    StyledCard,
    TwoColumnGrid
} from '../styled/StyledComponents';

interface FormPageLayoutProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    formTitle: string;
    formDescription: string;
    requirements: Array<{
        primary: string;
        secondary: string;
    }>;
    keyPoints: Array<{
        severity: 'success' | 'info' | 'warning' | 'error';
        title: string;
        description: string;
    }>;
    processSteps: string[];
    buttonText?: string;
    onButtonClick?: () => void;
    children: React.ReactNode;
}

const FormPageLayout: React.FC<FormPageLayoutProps> = ({
                                                           title,
                                                           description,
                                                           icon,
                                                           formTitle,
                                                           formDescription,
                                                           requirements,
                                                           keyPoints,
                                                           processSteps,
                                                           buttonText,
                                                           onButtonClick,
                                                           children
                                                       }) => {
    return (
        <PageContainer>
            <FadeIn>
                <PageTitle variant="h4" color="primary">
                    {title}
                </PageTitle>

                <Description>
                    {description}
                </Description>

                <TwoColumnGrid>
                    {/* Information Card */}
                    <StyledCard>
                        <CardBody>
                            <CardTitle variant="h5" color="primary">
                                {icon} {formTitle}
                            </CardTitle>

                            <Description>
                                {formDescription}
                            </Description>

                            <CardTitle variant="h6">
                                What you'll need to provide:
                            </CardTitle>

                            <List>
                                {requirements.map((req, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <CheckCircle color="primary"/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={req.primary}
                                            secondary={req.secondary}
                                        />
                                    </ListItem>
                                ))}
                            </List>

                            <Alert severity="info">
                                <Description variant="body2">
                                    <strong>Note:</strong> This form helps you establish the framework for your
                                    collaboration agreement. All terms are negotiable and should be discussed
                                    with potential contributors.
                                </Description>
                            </Alert>
                        </CardBody>
                        {buttonText && onButtonClick && (
                            <CardFooter>
                                <PrimaryButton
                                    variant="contained"
                                    onClick={onButtonClick}
                                    startIcon={icon}
                                >
                                    {buttonText}
                                </PrimaryButton>
                            </CardFooter>
                        )}
                    </StyledCard>

                    {/* Key Points Card */}
                    <StyledCard>
                        <CardBody>
                            <CardTitle variant="h5" color="primary">
                                Key Considerations
                            </CardTitle>

                            <StatusContainer>
                                {keyPoints.map((point, index) => (
                                    <Alert key={index} severity={point.severity}>
                                        <Description variant="body2">
                                            <strong>{point.title}:</strong> {point.description}
                                        </Description>
                                    </Alert>
                                ))}
                            </StatusContainer>

                            <CardTitle variant="h6">
                                Next Steps:
                            </CardTitle>

                            <List dense>
                                {processSteps.map((step, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={`${index + 1}. ${step}`}/>
                                    </ListItem>
                                ))}
                            </List>
                        </CardBody>
                    </StyledCard>
                </TwoColumnGrid>

                {children}
            </FadeIn>
        </PageContainer>
    );
};

export default FormPageLayout;
