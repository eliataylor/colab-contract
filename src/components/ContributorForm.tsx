import React, {useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from '@mui/material';
import {CheckCircle} from '@mui/icons-material';
import {useScrollToHash} from '../hooks/useScrollToHash';
import {useFormData} from '../contexts/FormDataContext';

const ContributorForm: React.FC = () => {
    useScrollToHash(); // Enable hash scrolling
    const {contributorData, updateContributorData} = useFormData();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (field: keyof typeof contributorData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        updateContributorData({[field]: value});
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitted(true);
        console.log('Contributor form submitted:', contributorData);
    };

    const isFormValid = () => {
        return !!(contributorData.name && contributorData.email && contributorData.phone && contributorData.address);
    };

    if (isSubmitted) {
        return (
            <Box textAlign="center" py={8}>
                <CheckCircle color="success" sx={{fontSize: 80, mb: 2}}/>
                <Typography variant="h4" gutterBottom color="success.main">
                    Contact Information Saved!
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Your contributor contact information has been saved and will be used in the contract.
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
                Contributor Contact Information
            </Typography>

            <Typography variant="body1" paragraph align="center" color="text.secondary" sx={{mb: 4}}>
                Enter your contact details for the collaboration agreement
            </Typography>

            <Paper elevation={2} sx={{p: 4, maxWidth: 600, mx: 'auto'}}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={contributorData.name}
                            onChange={handleInputChange('name')}
                            required
                            placeholder="Enter your full name"
                        />

                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={contributorData.email}
                            onChange={handleInputChange('email')}
                            required
                            placeholder="Enter your email address"
                        />

                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={contributorData.phone}
                            onChange={handleInputChange('phone')}
                            required
                            placeholder="Enter your phone number"
                        />

                        <TextField
                            fullWidth
                            label="Address"
                            multiline
                            rows={3}
                            value={contributorData.address}
                            onChange={handleInputChange('address')}
                            required
                            placeholder="Enter your full address"
                        />
                    </Box>

                    <Box sx={{mt: 4, textAlign: 'center'}}>
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

export default ContributorForm;
