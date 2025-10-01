import React from 'react';
import {Box, Button, TextField} from '@mui/material';
import {useScrollToHash} from '../hooks/useScrollToHash';
import {useFormData} from '../hooks/useFormDataHooks';

interface ContributorFormProps {
    onSuccess: () => void;
}

const ContributorForm: React.FC<ContributorFormProps> = ({onSuccess}) => {
    useScrollToHash(); // Enable hash scrolling
    const {contributorData, updateContributorData} = useFormData();

    const handleInputChange = (field: keyof typeof contributorData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        updateContributorData({[field]: value});
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSuccess();
        console.log('Contributor form submitted:', contributorData);
    };

    const isFormValid = () => {
        return !!(contributorData.name);
    };

    return (
        <Box>
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
                        placeholder="Enter your email address"
                    />

                    <TextField
                        fullWidth
                        label="Phone Number"
                        value={contributorData.phone}
                        onChange={handleInputChange('phone')}
                        placeholder="Enter your phone number"
                    />

                    <TextField
                        fullWidth
                        label="Address"
                        multiline
                        rows={3}
                        value={contributorData.address}
                        onChange={handleInputChange('address')}
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
        </Box>
    );
};

export default ContributorForm;
