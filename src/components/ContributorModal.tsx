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
  ListItemText,
  Button
} from '@mui/material';
import { useFormData, type ContributorData } from '../contexts/FormDataContext';
import FormStepper from './shared/FormStepper';


interface ContributorModalProps {
  open: boolean;
  onClose: () => void;
}

const ContributorModal: React.FC<ContributorModalProps> = ({ open, onClose }) => {
  const { contributorData, setContributorData } = useFormData();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<ContributorData>(contributorData || {
    name: '',
    email: '',
    role: '',
    skills: [],
    experience: '',
    availability: '',
    requestedEquity: 5,
    vestingPeriod: 4,
    hourlyRate: 50,
    expectedHours: 20,
    hasConflicts: false,
    agreesToTerms: false,
    specialRequests: ''
  });

  const steps = [
    'Personal Information',
    'Skills & Experience',
    'Equity Request',
    'Compensation',
    'Terms & Agreement',
    'Review & Submit'
  ];

  const skillOptions = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Mobile Development',
    'DevOps',
    'UI/UX Design',
    'Product Management',
    'Marketing',
    'Sales',
    'Data Science',
    'Machine Learning',
    'Other'
  ];

  const handleInputChange = (field: keyof ContributorData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillChange = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setContributorData(formData);
    setIsSubmitted(true);
    console.log('Contributor form submitted:', formData);
  };

  const handleClose = () => {
    setActiveStep(0);
    setIsSubmitted(false);
    setFormData(contributorData || {
      name: '',
      email: '',
      role: '',
      skills: [],
      experience: '',
      availability: '',
      requestedEquity: 5,
      vestingPeriod: 4,
      hourlyRate: 50,
      expectedHours: 20,
      hasConflicts: false,
      agreesToTerms: false,
      specialRequests: ''
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
              placeholder="e.g., Senior Developer, Designer, Product Manager"
              required
            />
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Skills & Expertise
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skillOptions.map((skill) => (
                  <Button
                    key={skill}
                    variant={formData.skills.includes(skill) ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => handleSkillChange(skill)}
                    sx={{ mb: 1 }}
                  >
                    {skill}
                  </Button>
                ))}
              </Box>
            </Box>
            
            <TextField
              fullWidth
              label="Years of Experience"
              value={formData.experience}
              onChange={handleInputChange('experience')}
              placeholder="e.g., 5+ years in web development"
              required
            />
            
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                value={formData.availability}
                onChange={handleInputChange('availability')}
                label="Availability"
              >
                <MenuItem value="part-time">Part-time (10-20 hours/week)</MenuItem>
                <MenuItem value="full-time">Full-time (40+ hours/week)</MenuItem>
                <MenuItem value="flexible">Flexible schedule</MenuItem>
                <MenuItem value="project-based">Project-based</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Requested Equity (%)"
              type="number"
              value={formData.requestedEquity}
              onChange={handleInputChange('requestedEquity')}
              inputProps={{ min: 0.1, max: 25, step: 0.1 }}
              helperText="Percentage of fully-diluted equity you're requesting"
            />
            <TextField
              fullWidth
              label="Preferred Vesting Period (Years)"
              type="number"
              value={formData.vestingPeriod}
              onChange={handleInputChange('vestingPeriod')}
              inputProps={{ min: 1, max: 10 }}
              helperText="Standard is 4 years"
            />
            <Alert severity="info">
              <Typography variant="body2">
                <strong>Note:</strong> Equity vests with a 6-month cliff period. Your actual equity 
                grant will be determined based on your contribution level and the company's needs.
              </Typography>
            </Alert>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Expected Hourly Rate ($)"
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
              helperText="Your planned commitment level"
            />
            <Alert severity="warning">
              <Typography variant="body2">
                <strong>Deferred Wages:</strong> Wages will accrue until the company can afford 
                regular salary payments. Payment is made pro-rata from available profit.
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
                  checked={formData.hasConflicts}
                  onChange={handleInputChange('hasConflicts')}
                />
              }
              label="I have potential conflicts of interest or competing commitments"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.agreesToTerms}
                  onChange={handleInputChange('agreesToTerms')}
                />
              }
              label="I agree to the terms of the Founding Contributor Engagement Agreement"
            />
            
            <TextField
              fullWidth
              label="Special Requests or Considerations"
              multiline
              rows={4}
              value={formData.specialRequests}
              onChange={handleInputChange('specialRequests')}
              placeholder="Any special requests, concerns, or additional information..."
            />
            
            {formData.hasConflicts && (
              <Alert severity="warning">
                <Typography variant="body2">
                  Please provide details about any conflicts of interest in the special requests field above.
                </Typography>
              </Alert>
            )}
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
                    Skills & Experience
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Skills" 
                        secondary={formData.skills.join(', ') || 'None selected'} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Experience" secondary={formData.experience} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Availability" secondary={formData.availability} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
              
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Equity Request
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Requested Equity" secondary={`${formData.requestedEquity}%`} />
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

            {formData.specialRequests && (
              <Card variant="outlined" sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Special Requests
                  </Typography>
                  <Typography variant="body2">{formData.specialRequests}</Typography>
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
      title="Contributor Information Form"
      subtitle="Complete this form to express your interest in joining as a contributor"
      steps={steps}
      activeStep={activeStep}
      onNext={handleNext}
      onBack={handleBack}
      onSubmit={handleSubmit}
      onCancel={handleClose}
      isSubmitted={isSubmitted}
      canSubmit={formData.agreesToTerms}
    >
      {getStepContent(activeStep)}
    </FormStepper>
  );
};

export default ContributorModal;
