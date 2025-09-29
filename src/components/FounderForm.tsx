import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button
} from '@mui/material';
import {
  CheckCircle
} from '@mui/icons-material';
import { useScrollToHash } from '../hooks/useScrollToHash';
import { useFormData } from '../contexts/FormDataContext';

const FounderForm: React.FC = () => {
  useScrollToHash(); // Enable hash scrolling
  const { founderData, updateFounderData } = useFormData();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof typeof founderData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    updateFounderData({ [field]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    console.log('Founder form submitted:', founderData);
  };

  const isFormValid = () => {
    return !!(founderData.name && founderData.email && founderData.phone && founderData.address);
  };

  if (isSubmitted) {
    return (
      <Box textAlign="center" py={8}>
        <CheckCircle color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom color="success.main">
          Contact Information Saved!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Your founder contact information has been saved and will be used in the contract.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setIsSubmitted(false)}
        >
          Edit Information
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" color="primary" id="personal-info">
        Founder Contact Information
      </Typography>
      
      <Typography variant="body1" paragraph align="center" color="text.secondary" sx={{ mb: 4 }}>
        Enter your contact details for the collaboration agreement
      </Typography>

      <Paper elevation={2} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={founderData.name}
              onChange={handleInputChange('name')}
              required
              placeholder="Enter your full name"
            />
            
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={founderData.email}
              onChange={handleInputChange('email')}
              required
              placeholder="Enter your email address"
            />
            
            <TextField
              fullWidth
              label="Phone Number"
              value={founderData.phone}
              onChange={handleInputChange('phone')}
              required
              placeholder="Enter your phone number"
            />
            
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              value={founderData.address}
              onChange={handleInputChange('address')}
              required
              placeholder="Enter your full address"
            />
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button 
              type="submit" 
              variant="contained"
              disabled={!isFormValid()}
              size="large"
            >
              Save Contact Information
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default FounderForm;
