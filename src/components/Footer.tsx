import React from 'react';
import {Box, Button, Link, Stack, Typography} from '@mui/material';
import {Gavel} from '@mui/icons-material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                mt: 'auto',
                py: 3,
                px: 2,
                backgroundColor: 'background.paper',
                borderTop: 1,
                borderColor: 'divider',
            }}
        >
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                spacing={2}
                justifyContent="space-between"
                alignItems={{xs: 'flex-start', sm: 'center'}}
            >
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()}
                    <Button
                        component={Link}
                        href="http://taylormadetraffic.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        variant="text"
                        sx={{px: .1, ml: 1}}
                    >
                        TaylorMadeTraffic
                    </Button>
                </Typography>

                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={2}
                    alignItems="center"
                >
                    <Button
                        component={Link}
                        href="https://github.com/eliataylor/colab-contract/blob/main/LICENSE.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<Gavel/>}
                        size="small"
                        sx={{textTransform: 'none'}}
                    >
                        Attribution Assurance License
                    </Button>

                    <Button
                        component={Link}
                        href="https://github.com/eliataylor/colab-contract"
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<img src="https://oaexample.com/oa-assets/github-mark-white.svg" height="20"
                                      width="20" alt="GitHub"/>}
                        size="small"
                        sx={{textTransform: 'none'}}
                    >
                        Open Source
                    </Button>

                    <Button
                        size="small"
                        href='https://g.co/gemini/share/fc835c61e484'
                        target='_blank'
                        endIcon={<img src={'/gemini-color.png'} alt="Gemini" height="20" width="20"/>}
                        sx={{textTransform: 'none', mr: 2}}
                    >
                        Join Gemini Chat
                    </Button>

                </Stack>
            </Stack>
        </Box>
    );
};

export default Footer;
