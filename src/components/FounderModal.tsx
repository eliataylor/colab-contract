import React, { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
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
import { useFormData, type FounderData } from '../contexts/FormDataContext';
import FormStepper from './shared/FormStepper';


interface FounderModalProps {
  open: boolean;
  onClose: () => void;
}

const FounderModal: React.FC<FounderModalProps> = ({ open, onClose }) => {
  const { founderData, setFounderData } = useFormData();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FounderData>(founderData || {
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

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setFounderData(formData);
    setIsSubmitted(true);
    console.log('Founder form submitted:', formData);
  };

  const handleClose = () => {
    setActiveStep(0);
    setIsSubmitted(false);
    setFormData(founderData || {
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
    onClose();
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              required
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
            />
            <TextField
              fullWidth
              label="Role/Title"
              value={formData.role}
              onChange={handleInputChange('role')}
              placeholder="e.g., CEO, CTO, Founder"
              required
            />
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Company Name"
              value={formData.companyName}
              onChange={handleInputChange('companyName')}
              required
            />
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
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Total Equity Grant (%)"
              type="number"
              value={formData.totalEquity}
              onChange={handleInputChange('totalEquity')}
              inputProps={{ min: 1, max: 50 }}
              helperText="Percentage of fully-diluted equity"
            />
            <TextField
              fullWidth
              label="Vesting Period (Years)"
              type="number"
              value={formData.vestingPeriod}
              onChange={handleInputChange('vestingPeriod')}
              inputProps={{ min: 1, max: 10 }}
              helperText="Standard is 4 years"
            />
            <Alert severity="info">
              <Typography variant="body2">
                <strong>Note:</strong> Equity vests with a 6-month cliff period. No equity is vested 
                before completing 180 days of work. The vesting schedule accelerates over time using 
                a logarithmic formula.
              </Typography>
            </Alert>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Hourly Rate ($)"
              type="number"
              value={formData.hourlyRate}
              onChange={handleInputChange('hourlyRate')}
              inputProps={{ min: 0, step: 0.01 }}
              helperText="For deferred compensation calculation"
            />
            <TextField
              fullWidth
              label="Expected Hours per Week"
              type="number"
              value={formData.expectedHours}
              onChange={handleInputChange('expectedHours')}
              inputProps={{ min: 1, max: 168 }}
              helperText="Typical commitment level"
            />
            <Alert severity="warning">
              <Typography variant="body2">
                <strong>Deferred Wages:</strong> Wages accrue until the company can afford regular 
                salary payments. Payment is made pro-rata from available profit after all expenses 
                and reserves are covered.
              </Typography>
            </Alert>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.hasExistingIP}
                  onChange={handleInputChange('hasExistingIP')}
                />
              }
              label="I have existing intellectual property relevant to this company"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.requiresNonCompete}
                  onChange={handleInputChange('requiresNonCompete')}
                />
              }
              label="I require non-compete restrictions for contributors"
            />
            <TextField
              fullWidth
              label="Special Terms or Considerations"
              multiline
              rows={4}
              value={formData.specialTerms}
              onChange={handleInputChange('specialTerms')}
              placeholder="Any additional terms, conditions, or special considerations..."
            />
          </Box>
        );

      case 5:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Information
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            </Box>

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

  return (
    <FormStepper
      open={open}
      onClose={handleClose}
      title="Founder Information Form"
      subtitle="Complete this form to define your terms as a founder in the collaboration agreement"
      steps={steps}
      activeStep={activeStep}
      onNext={handleNext}
      onBack={handleBack}
      onSubmit={handleSubmit}
      onCancel={handleClose}
      isSubmitted={isSubmitted}
      canSubmit={true}
    >
      {getStepContent(activeStep)}
    </FormStepper>
  );
};

export default FounderModal;
