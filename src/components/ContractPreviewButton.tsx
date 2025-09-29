import React, { useState, useEffect } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  Close
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import { useContractData } from '../contexts/FormDataContext';

// Styled components following the existing pattern
const PreviewButton = styled(ListItemButton)(({ theme, disabled }) => ({
  backgroundColor: disabled 
    ? theme.palette.mode === 'light' ? '#f1f5f9' : '#374151'
    : theme.palette.mode === 'light' ? '#dcfce7' : '#064e3b',
  color: disabled 
    ? theme.palette.text.disabled
    : theme.palette.mode === 'light' ? '#166534' : '#a7f3d0',
  '&:hover': {
    backgroundColor: disabled 
      ? theme.palette.mode === 'light' ? '#f1f5f9' : '#374151'
      : theme.palette.mode === 'light' ? '#bbf7d0' : '#065f46',
  },
  '&:disabled': {
    backgroundColor: theme.palette.mode === 'light' ? '#f1f5f9' : '#374151',
    color: theme.palette.text.disabled,
  },
}));

const DialogHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

const MarkdownContainer = styled(Box)(({ theme }) => ({
  '& h1': {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  '& h2': {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  '& h3': {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  '& p': {
    marginBottom: theme.spacing(1),
    lineHeight: 1.6,
  },
  '& ul, & ol': {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  '& li': {
    marginBottom: theme.spacing(0.5),
  },
  '& strong': {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: theme.spacing(2),
  },
  '& th, & td': {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    textAlign: 'left',
  },
  '& th': {
    backgroundColor: theme.palette.mode === 'light' ? '#f8fafc' : '#1e293b',
    fontWeight: 'bold',
  },
  '& code': {
    backgroundColor: theme.palette.mode === 'light' ? '#f1f5f9' : '#374151',
    padding: theme.spacing(0.25, 0.5),
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: '0.875rem',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
}));

interface ContractPreviewButtonProps {
  onPreviewClick?: () => void;
}

const ContractPreviewButton: React.FC<ContractPreviewButtonProps> = ({ onPreviewClick }) => {
  const { isContractReady, populateContractTemplate } = useContractData();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [contractContent, setContractContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePreviewClick = () => {
    if (onPreviewClick) {
      onPreviewClick();
    } else {
      setPreviewOpen(true);
    }
  };

  useEffect(() => {
    if (previewOpen) {
      loadContractTemplate();
    }
  }, [previewOpen]);

  const loadContractTemplate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/colab-contract.md');
      if (!response.ok) {
        throw new Error(`Failed to load contract: ${response.statusText}`);
      }
      const template = await response.text();
      const populated = populateContractTemplate(template);
      setContractContent(populated);
    } catch (error) {
      console.error('Failed to load contract template:', error);
      setContractContent('Failed to load contract template. Please try again.');
    } finally {
      setLoading(false);
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
        <PreviewButton
          onClick={handlePreviewClick}
          disabled={!isContractReady}
        >
          <ListItemIcon>
            <Visibility color={isContractReady ? 'inherit' : 'disabled'} />
          </ListItemIcon>
          <ListItemText 
            primary="Preview Contract" 
          />
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
            <Box component="h2" sx={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
              Contract Preview
            </Box>
            <IconButton onClick={handleClose} size="small">
              <Close />
            </IconButton>
          </DialogHeader>
        </DialogTitle>
        
        <DialogContent dividers>
          {loading ? (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          ) : (
            <MarkdownContainer>
              <ReactMarkdown>{contractContent}</ReactMarkdown>
            </MarkdownContainer>
          )}
        </DialogContent>
        
        <DialogActions sx={{ padding: 2 }}>
          <ActionButton onClick={handleClose} variant="outlined">
            Close
          </ActionButton>
          <ActionButton 
            onClick={handleDownload} 
            variant="contained"
            disabled={loading}
          >
            Download PDF
          </ActionButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContractPreviewButton;
