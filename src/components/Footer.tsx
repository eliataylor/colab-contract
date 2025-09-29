import React from 'react';
import {
  Box,
  Typography,
  Button,
  Link,
  Container,
  Stack
} from '@mui/material';
import {
  Code,
  Gavel,
  OpenInNew
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} 
            <Button
              component={Link}
              href="http://taylormadetraffic.com/"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew />}
              size="small"
              variant="text"
            >
              TaylorMadeTraffic
            </Button>
          </Typography>
          
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
          >
            <Button
              component={Link}
              href="https://github.com/eliataylor/colab-contract/blob/main/LICENSE.md"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Gavel />}
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Attribution Assurance License
            </Button>
            
            <Button
              component={Link}
              href="https://github.com/eliataylor/colab-contract"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<img src="https://oaexample.com/oa-assets/github-mark-white.svg" height="20" width="20" alt="GitHub" />}
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Open Source
            </Button>
            
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
