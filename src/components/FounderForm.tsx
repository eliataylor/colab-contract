import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  CheckCircle
} from '@mui/icons-material';

interface FounderData {
  // Personal Information
  name: string;
  email: string;
  role: string;
  
  // Company Information
  companyName: string;
  industry: string;
  stage: string;
  
  // Equity Terms
  totalEquity: number;
  vestingPeriod: number;
  
  // Compensation Terms
  hourlyRate: number;
  expectedHours: number;
  
  // Additional Terms
  hasExistingIP: boolean;
  requiresNonCompete: boolean;
  specialTerms: string;
}

const FounderForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FounderData>({
    name: '',
    email: '',
    role: '',
    companyName: '',
    industry: '',
    stage: '',
    totalEquity: 25,
    vestingPeriod: 4,
    hourlyRate: 75,
    expectedHours: 40,
    hasExistingIP: false,
    requiresNonCompete: true,
    specialTerms: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    'Personal Information',
    'Company Details',
    'Equity Terms',
    'Compensation',
    'Additional Terms',
    'Review & Submit'
  ];

  const handleInputChange = (field: keyof FounderData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStep = (index: number) => () => {
    console.log('Step clicked:', index);
    setActiveStep(index);
  };

  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 0: // Personal Information
        return !!(formData.name && formData.email && formData.role);
      case 1: // Company Details
        return !!(formData.companyName && formData.industry && formData.stage);
      case 2: // Equity Terms
        return formData.totalEquity > 0 && formData.vestingPeriod > 0;
      case 3: // Compensation
        return formData.hourlyRate > 0 && formData.expectedHours > 0;
      case 4: // Additional Terms
        return true; // This step is optional, so it's always considered complete
      case 5: // Review & Submit
        return isStepCompleted(0) && isStepCompleted(1) && isStepCompleted(2) && isStepCompleted(3);
      default:
        return false;
    }
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Here you would typically send the data to a backend or save it
    console.log('Founder form submitted:', formData);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role/Title"
                value={formData.role}
                onChange={handleInputChange('role')}
                placeholder="e.g., CEO, CTO, Founder"
                required
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.companyName}
                onChange={handleInputChange('companyName')}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Industry</InputLabel>
                <Select
                  value={formData.industry}
                  onChange={handleInputChange('industry')}
                  label="Industry"
                >
                  <MenuItem value="technology">Technology</MenuItem>
                  <MenuItem value="fintech">Fintech</MenuItem>
                  <MenuItem value="healthcare">Healthcare</MenuItem>
                  <MenuItem value="ecommerce">E-commerce</MenuItem>
                  <MenuItem value="saas">SaaS</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Company Stage</InputLabel>
                <Select
                  value={formData.stage}
                  onChange={handleInputChange('stage')}
                  label="Company Stage"
                >
                  <MenuItem value="idea">Idea Stage</MenuItem>
                  <MenuItem value="mvp">MVP Development</MenuItem>
                  <MenuItem value="early">Early Stage</MenuItem>
                  <MenuItem value="growth">Growth Stage</MenuItem>
                  <MenuItem value="scale">Scale Stage</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total Equity Grant (%)"
                type="number"
                value={formData.totalEquity}
                onChange={handleInputChange('totalEquity')}
                inputProps={{ min: 1, max: 50 }}
                helperText="Percentage of fully-diluted equity"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Vesting Period (Years)"
                type="number"
                value={formData.vestingPeriod}
                onChange={handleInputChange('vestingPeriod')}
                inputProps={{ min: 1, max: 10 }}
                helperText="Standard is 4 years"
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Note:</strong> Equity vests with a 6-month cliff period. No equity is vested 
                  before completing 180 days of work. The vesting schedule accelerates over time using 
                  a logarithmic formula.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Hourly Rate ($)"
                type="number"
                value={formData.hourlyRate}
                onChange={handleInputChange('hourlyRate')}
                inputProps={{ min: 0, step: 0.01 }}
                helperText="For deferred compensation calculation"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expected Hours per Week"
                type="number"
                value={formData.expectedHours}
                onChange={handleInputChange('expectedHours')}
                inputProps={{ min: 1, max: 168 }}
                helperText="Typical commitment level"
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="warning">
                <Typography variant="body2">
                  <strong>Deferred Wages:</strong> Wages accrue until the company can afford regular 
                  salary payments. Payment is made pro-rata from available profit after all expenses 
                  and reserves are covered.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.hasExistingIP}
                    onChange={handleInputChange('hasExistingIP')}
                  />
                }
                label="I have existing intellectual property relevant to this company"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.requiresNonCompete}
                    onChange={handleInputChange('requiresNonCompete')}
                  />
                }
                label="I require non-compete restrictions for contributors"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Terms or Considerations"
                multiline
                rows={4}
                value={formData.specialTerms}
                onChange={handleInputChange('specialTerms')}
                placeholder="Any additional terms, conditions, or special considerations..."
              />
            </Grid>
          </Grid>
        );

      case 5:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Personal Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Name" secondary={formData.name} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Email" secondary={formData.email} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Role" secondary={formData.role} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Company Details
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Company" secondary={formData.companyName} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Industry" secondary={formData.industry} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Stage" secondary={formData.stage} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Equity Terms
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Total Equity" secondary={`${formData.totalEquity}%`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Vesting Period" secondary={`${formData.vestingPeriod} years`} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Compensation
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Hourly Rate" secondary={`$${formData.hourlyRate}/hour`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Expected Hours" secondary={`${formData.expectedHours}/week`} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {formData.specialTerms && (
              <Card variant="outlined" sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Special Terms
                  </Typography>
                  <Typography variant="body2">{formData.specialTerms}</Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  if (isSubmitted) {
    return (
      <Box textAlign="center" py={8}>
        <CheckCircle color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom color="success.main">
          Form Submitted Successfully!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for completing the founder form. We'll review your information and get back to you soon.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => {
            setIsSubmitted(false);
            setActiveStep(0);
            setFormData({
              name: '',
              email: '',
              role: '',
              companyName: '',
              industry: '',
              stage: '',
              totalEquity: 25,
              vestingPeriod: 4,
              hourlyRate: 75,
              expectedHours: 40,
              hasExistingIP: false,
              requiresNonCompete: true,
              specialTerms: ''
            });
          }}
        >
          Submit Another Form
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Founder Information Form
      </Typography>
      
      <Typography variant="body1" paragraph align="center" color="text.secondary" sx={{ mb: 4 }}>
        Complete this form to define your terms as a founder in the collaboration agreement
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Stepper nonLinear activeStep={activeStep} orientation="horizontal">
          {steps.map((label, index) => (
            <Step key={label} completed={isStepCompleted(index)}>
              <StepLabel 
                onClick={handleStep(index)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: '4px'
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', pt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              disabled={!isStepCompleted(4)}
            >
              Submit Form
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default FounderForm;
