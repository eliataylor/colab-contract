import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {Close, Visibility} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import ContractDocument from './ContractDocument';

// Styled components following the existing pattern
const PreviewButton = styled(ListItemButton)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#dcfce7' : '#064e3b',
    color: theme.palette.mode === 'light' ? '#166534' : '#a7f3d0',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#bbf7d0' : '#065f46',
    },
}));

const DialogHeader = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const ActionButton = styled(Button)(() => ({
    textTransform: 'none',
    fontWeight: 500,
}));

interface ContractPreviewButtonProps {
    onPreviewClick?: () => void;
}

const ContractPreviewButton: React.FC<ContractPreviewButtonProps> = ({onPreviewClick}) => {
    const [previewOpen, setPreviewOpen] = useState(false);

    const handlePreviewClick = () => {
        if (onPreviewClick) {
            onPreviewClick();
        } else {
            setPreviewOpen(true);
        }
    };

    const handleClose = () => {
        setPreviewOpen(false);
    };

    const handleDownload = () => {
        // TODO: Implement PDF download functionality
        console.log('Download PDF functionality to be implemented');
    };

    return (
        <>
            <ListItem disablePadding>
                <PreviewButton onClick={handlePreviewClick}>
                    <ListItemIcon>
                        <Visibility color="inherit"/>
                    </ListItemIcon>
                    <ListItemText primary="Preview Contract"/>
                </PreviewButton>
            </ListItem>

            <Dialog
                open={previewOpen}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                fullScreen={window.innerWidth < 768}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                    }
                }}
            >
                <DialogTitle>
                    <DialogHeader>
                        <Box component="h2" sx={{margin: 0, fontSize: '1.25rem', fontWeight: 600}}>
                            Contract Preview
                        </Box>
                        <IconButton onClick={handleClose} size="small">
                            <Close/>
                        </IconButton>
                    </DialogHeader>
                </DialogTitle>

                <DialogContent dividers>
                    <ContractDocument/>
                </DialogContent>

                <DialogActions sx={{padding: 2}}>
                    <ActionButton onClick={handleClose} variant="outlined">
                        Close
                    </ActionButton>
                    <ActionButton
                        onClick={handleDownload}
                        variant="contained"
                    >
                        Download PDF
                    </ActionButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ContractPreviewButton;
