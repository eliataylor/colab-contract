import React, {useState} from 'react';
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton} from '@mui/material';
import {Close} from '@mui/icons-material';
import ContributorForm from './ContributorForm';

type LayoutType = 'button' | 'dialog' | 'page';

interface ContributorModalProps {
    layout: LayoutType;
    open?: boolean;
    onClose?: () => void;
    buttonText?: string;
    buttonVariant?: 'text' | 'outlined' | 'contained';
    buttonColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const ContributorModal: React.FC<ContributorModalProps> = ({
                                                               layout,
                                                               open = false,
                                                               onClose,
                                                               buttonText = "Edit Contributor Information",
                                                               buttonVariant = "outlined",
                                                               buttonColor = "secondary"
                                                           }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        onClose?.();
    };

    const renderContent = () => {
        return <ContributorForm onSuccess={() => {
            if (layout === 'dialog') {
                setDialogOpen(false);
            }
            onClose?.();
        }}/>;
    };

    if (layout === 'page') {
        return renderContent();
    }

    if (layout === 'button') {
        return (
            <>
                <Button
                    variant={buttonVariant}
                    color={buttonColor}
                    onClick={handleOpen}
                >
                    {buttonText}
                </Button>
                <Dialog
                    open={dialogOpen}
                    onClose={handleClose}
                    maxWidth="md"
                    fullWidth
                    fullScreen={window.innerWidth < 768}
                >
                    <DialogTitle>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            Contributor Contact Information
                            <IconButton onClick={handleClose} size="small">
                                <Close/>
                            </IconButton>
                        </Box>
                    </DialogTitle>
                    <DialogContent dividers>
                        {renderContent()}
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    if (layout === 'dialog') {
        return (
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="md"
                fullWidth
                fullScreen={window.innerWidth < 768}
            >
                <DialogTitle>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        Contributor Contact Information
                        <IconButton onClick={onClose} size="small">
                            <Close/>
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {renderContent()}
                </DialogContent>
            </Dialog>
        );
    }

    return null;
};

export default ContributorModal;
