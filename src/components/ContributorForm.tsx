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
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemText,
  Checkbox
} from '@mui/material';
import {
  CheckCircle,
  Warning
} from '@mui/icons-material';

interface ContributorData {
  // Personal Information
  name: string;
  email: string;
  role: string;
  experience: string;
  
  // Skills and Expertise
  primarySkills: string[];
  yearsExperience: number;
  relevantEducation: string;
  
  // Commitment Terms
  expectedHours: number;
  availability: string;
  timezone: string;
  
  // Compensation Expectations
  hourlyRate: number;
  equityExpectation: number;
  vestingPreference: number;
  
  // Agreement Terms
  agreesToIP: boolean;
  agreesToNonSolicit: boolean;
  agreesToNonCompete: boolean;
  understandsCliff: boolean;
  
  // Additional Information
  previousStartups: boolean;
  currentCommitments: string;
  specialTerms: string;
}

const ContributorForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<ContributorData>({
    name: '',
    email: '',
    role: '',
    experience: '',
    primarySkills: [],
    yearsExperience: 0,
    relevantEducation: '',
    expectedHours: 20,
    availability: '',
    timezone: '',
    hourlyRate: 75,
    equityExpectation: 10,
    vestingPreference: 4,
    agreesToIP: false,
    agreesToNonSolicit: false,
    agreesToNonCompete: false,
    understandsCliff: false,
    previousStartups: false,
    currentCommitments: '',
    specialTerms: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    'Personal Information',
    'Skills & Experience',
    'Commitment Terms',
    'Compensation Expectations',
    'Agreement Terms',
    'Review & Submit'
  ];

  const skillOptions = [
    'Software Development',
    'Product Management',
    'UI/UX Design',
    'Marketing',
    'Sales',
    'Operations',
    'Finance',
    'Legal',
    'Data Science',
    'DevOps',
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

  const handleSkillChange = (skill: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFormData(prev => ({
        ...prev,
        primarySkills: [...prev.primarySkills, skill]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        primarySkills: prev.primarySkills.filter(s => s !== skill)
      }));
    }
  };

  const handleStep = (index: number) => () => {
    console.log('Step clicked:', index);
    setActiveStep(index);
  };

  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 0: // Personal Information
        return !!(formData.name && formData.email && formData.role && formData.experience && formData.yearsExperience > 0);
      case 1: // Skills & Experience
        return formData.primarySkills.length > 0;
      case 2: // Commitment Terms
        return formData.expectedHours > 0 && !!formData.availability;
      case 3: // Compensation Expectations
        return formData.hourlyRate > 0 && formData.equityExpectation > 0 && formData.vestingPreference > 0;
      case 4: // Agreement Terms
        return formData.agreesToIP && formData.agreesToNonSolicit && formData.agreesToNonCompete && formData.understandsCliff;
      case 5: // Review & Submit
        return isStepCompleted(0) && isStepCompleted(1) && isStepCompleted(2) && isStepCompleted(3) && isStepCompleted(4);
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
    console.log('Contributor form submitted:', formData);
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Role/Title"
                value={formData.role}
                onChange={handleInputChange('role')}
                placeholder="e.g., Senior Developer, Product Manager"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                type="number"
                value={formData.yearsExperience}
                onChange={handleInputChange('yearsExperience')}
                inputProps={{ min: 0, max: 50 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Brief Experience Summary"
                multiline
                rows={3}
                value={formData.experience}
                onChange={handleInputChange('experience')}
                placeholder="Describe your relevant work experience..."
                required
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Primary Skills & Expertise
              </Typography>
              <Grid container spacing={1}>
                {skillOptions.map((skill) => (
                  <Grid item xs={12} sm={6} md={4} key={skill}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.primarySkills.includes(skill)}
                          onChange={handleSkillChange(skill)}
                        />
                      }
                      label={skill}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Relevant Education"
                value={formData.relevantEducation}
                onChange={handleInputChange('relevantEducation')}
                placeholder="e.g., Computer Science Degree, Bootcamp, Self-taught"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.previousStartups}
                    onChange={handleInputChange('previousStartups')}
                  />
                }
                label="I have previous startup experience"
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expected Hours per Week"
                type="number"
                value={formData.expectedHours}
                onChange={handleInputChange('expectedHours')}
                inputProps={{ min: 1, max: 40 }}
                helperText="How many hours can you commit weekly?"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  value={formData.availability}
                  onChange={handleInputChange('availability')}
                  label="Availability"
                >
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time (20-30 hours)</MenuItem>
                  <MenuItem value="flexible">Flexible</MenuItem>
                  <MenuItem value="weekends">Weekends only</MenuItem>
                  <MenuItem value="evenings">Evenings only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Timezone"
                value={formData.timezone}
                onChange={handleInputChange('timezone')}
                placeholder="e.g., PST, EST, GMT+1"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Current Commitments"
                value={formData.currentCommitments}
                onChange={handleInputChange('currentCommitments')}
                placeholder="Other jobs, projects, or commitments"
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expected Hourly Rate ($)"
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
                label="Equity Expectation (%)"
                type="number"
                value={formData.equityExpectation}
                onChange={handleInputChange('equityExpectation')}
                inputProps={{ min: 0, max: 50, step: 0.1 }}
                helperText="Percentage of fully-diluted equity"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Preferred Vesting Period (Years)"
                type="number"
                value={formData.vestingPreference}
                onChange={handleInputChange('vestingPreference')}
                inputProps={{ min: 1, max: 10 }}
                helperText="Standard is 4 years"
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Note:</strong> These are your expectations. Final terms will be negotiated 
                  with the founders based on your contribution and the company's needs.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Agreement Terms Understanding
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please confirm your understanding of the key terms in the collaboration agreement:
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.agreesToIP}
                    onChange={handleInputChange('agreesToIP')}
                  />
                }
                label="I understand and agree to the IP ownership terms (Company owns specific IP, I retain general skills)"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.agreesToNonSolicit}
                    onChange={handleInputChange('agreesToNonSolicit')}
                  />
                }
                label="I agree to the 12-month non-solicitation clause (no poaching employees or customers)"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.agreesToNonCompete}
                    onChange={handleInputChange('agreesToNonCompete')}
                  />
                }
                label="I agree to the 12-month non-compete clause (no competing products using company code/methods)"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.understandsCliff}
                    onChange={handleInputChange('understandsCliff')}
                  />
                }
                label="I understand the 6-month cliff period (no equity vests before 180 days of work)"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Terms or Questions"
                multiline
                rows={4}
                value={formData.specialTerms}
                onChange={handleInputChange('specialTerms')}
                placeholder="Any questions, concerns, or additional terms you'd like to discuss..."
              />
            </Grid>

            <Grid item xs={12}>
              <Alert severity="warning">
                <Typography variant="body2">
                  <strong>Important:</strong> By submitting this form, you acknowledge that you have 
                  read and understood the collaboration agreement terms. This form is for information 
                  purposes only and does not constitute a binding agreement.
                </Typography>
              </Alert>
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
                      <ListItem>
                        <ListItemText primary="Experience" secondary={`${formData.yearsExperience} years`} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Skills & Expertise
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {formData.primarySkills.map((skill) => (
                        <Chip key={skill} label={skill} size="small" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Commitment
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Hours/Week" secondary={formData.expectedHours} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Availability" secondary={formData.availability} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Timezone" secondary={formData.timezone} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Compensation Expectations
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Hourly Rate" secondary={`$${formData.hourlyRate}/hour`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Equity Expectation" secondary={`${formData.equityExpectation}%`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Vesting Period" secondary={`${formData.vestingPreference} years`} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Agreement Terms Acceptance
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {formData.agreesToIP ? <CheckCircle color="success" /> : <Warning color="error" />}
                          <Typography variant="body2">IP Terms</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {formData.agreesToNonSolicit ? <CheckCircle color="success" /> : <Warning color="error" />}
                          <Typography variant="body2">Non-Solicitation</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {formData.agreesToNonCompete ? <CheckCircle color="success" /> : <Warning color="error" />}
                          <Typography variant="body2">Non-Compete</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {formData.understandsCliff ? <CheckCircle color="success" /> : <Warning color="error" />}
                          <Typography variant="body2">Cliff Period</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {formData.specialTerms && (
              <Card variant="outlined" sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Additional Terms
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
          Thank you for your interest in collaborating. We'll review your information and get back to you soon.
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
              experience: '',
              primarySkills: [],
              yearsExperience: 0,
              relevantEducation: '',
              expectedHours: 20,
              availability: '',
              timezone: '',
              hourlyRate: 75,
              equityExpectation: 10,
              vestingPreference: 4,
              agreesToIP: false,
              agreesToNonSolicit: false,
              agreesToNonCompete: false,
              understandsCliff: false,
              previousStartups: false,
              currentCommitments: '',
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
        Contributor Information Form
      </Typography>
      
      <Typography variant="body1" paragraph align="center" color="text.secondary" sx={{ mb: 4 }}>
        Complete this form to express your interest in collaborating and define your terms
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

export default ContributorForm;
