import React from 'react';
import {Box, Button, TextField} from '@mui/material';
import {useScrollToHash} from '../hooks/useScrollToHash';
import {useFormData} from '../hooks/useFormDataHooks';

interface FounderFormProps {
    onSuccess: () => void;
}

const FounderForm: React.FC<FounderFormProps> = ({onSuccess}) => {
    useScrollToHash(); // Enable hash scrolling
    const {founderData, updateFounderData} = useFormData();

    const handleInputChange = (field: keyof typeof founderData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        updateFounderData({[field]: value});
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSuccess()
        console.log('Founder form submitted:', founderData);
    };

    const isFormValid = () => {
        return !!(founderData.name);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>

                    <TextField
                        fullWidth
                        label="Company Name"
                        value={founderData.companyName}
                        onChange={handleInputChange('companyName')}
                        placeholder="Enter your company name"
                    />

                    <TextField
                        fullWidth
                        label="Founder Name"
                        value={founderData.name}
                        onChange={handleInputChange('name')}
                        placeholder="Enter your full name"
                    />

                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={founderData.email}
                        onChange={handleInputChange('email')}
                        placeholder="Enter your email address"
                    />

                    <TextField
                        fullWidth
                        label="Phone Number"
                        value={founderData.phone}
                        onChange={handleInputChange('phone')}
                        placeholder="Enter your phone number"
                    />

                    <TextField
                        fullWidth
                        label="Address"
                        multiline
                        rows={3}
                        value={founderData.address}
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

export default FounderForm;
