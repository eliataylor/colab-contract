import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import {Gavel} from '@mui/icons-material';
import ContractDocument from './ContractDocument';

const Home: React.FC = () => {
    return (
        <Box>
            {/* Header Section */}
            <Container maxWidth="lg" sx={{py: 4}}>
                <Box sx={{textAlign: 'center', mb: 4}}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2}}>
                        <Gavel color="primary" sx={{fontSize: 48}}/>
                        <Typography variant="h2" component="h1" color="primary" sx={{fontWeight: 'bold'}}>
                            Colab Contract
                        </Typography>
                    </Box>
                    <Typography variant="h5" color="text.secondary" sx={{maxWidth: 60.0, mx: 'auto'}}>
                        A collaborative contract template for founding members of products and companies.
                    </Typography>
                </Box>
            </Container>

            {/* Contract Document */}
            <ContractDocument/>
        </Box>
    );
};

export default Home;
