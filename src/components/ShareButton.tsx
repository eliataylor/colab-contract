import React, {useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import {Close as CloseIcon, ContentCopy as CopyIcon, Share as ShareIcon} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {useFormData} from '../hooks/useFormDataHooks';
import {generateShareableUrl} from '../utils/contractUtils';

const DialogContentStyled = styled(DialogContent)(({theme}) => ({
    padding: theme.spacing(3),
    minWidth: 400,
}));

const UrlTextField = styled(TextField)(() => ({
    '& .MuiInputBase-root': {
        fontFamily: 'monospace',
        fontSize: '0.875rem',
    },
}));

const CopyButton = styled(Button)(({theme}) => ({
    textTransform: 'none',
    marginLeft: theme.spacing(1),
}));

interface ShareButtonProps {
    className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = () => {
    const {founderData, contributorData, founderFieldsModified, contributorFieldsModified} = useFormData();
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShareClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCopied(false);
    };

    const handleCopyUrl = async () => {
        try {
            const shareableUrl = generateShareableUrl(founderData, contributorData);
            await navigator.clipboard.writeText(shareableUrl);
            setCopied(true);
        } catch (error) {
            console.error('Failed to copy URL:', error);
        }
    };

    const shareableUrl = generateShareableUrl(founderData, contributorData);

    return (
        <>
            <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleShareClick}
                aria-label="Share contract progress"
                startIcon={<ShareIcon/>}
            >
                Share
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                    }
                }}
            >
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" component="div">
                            Share Contract Progress
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            size="small"
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContentStyled>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Share your contract progress with others. The link will include all the information you've
                        entered so far.
                    </Typography>

                    <Box display="flex" alignItems="center" gap={1} mt={2}>
                        <UrlTextField
                            fullWidth
                            value={shareableUrl}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                readOnly: true,
                            }}
                            label="Shareable URL"
                        />
                        <CopyButton
                            variant="outlined"
                            startIcon={<CopyIcon/>}
                            onClick={handleCopyUrl}
                            size="small"
                        >
                            Copy
                        </CopyButton>
                    </Box>

                    <Typography variant="caption" color="text.secondary" sx={{mt: 2, display: 'block'}}>
                        Progress tracked: {founderFieldsModified.size + contributorFieldsModified.size} field(s)
                        modified
                    </Typography>
                </DialogContentStyled>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={copied}
                autoHideDuration={3000}
                onClose={() => setCopied(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setCopied(false)} severity="success" sx={{width: '100%'}}>
                    URL copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShareButton;
