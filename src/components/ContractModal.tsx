import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

interface ContractModalProps {
  open: boolean;
  onClose: () => void;
}

const ContractModal: React.FC<ContractModalProps> = ({ open, onClose }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      loadMarkdownContent();
    }
  }, [open]);

  const loadMarkdownContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/colab-contract.md');
      if (!response.ok) {
        throw new Error(`Failed to load contract: ${response.statusText}`);
      }
      const content = await response.text();
      setMarkdownContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contract');
    } finally {
      setLoading(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleClose = () => {
    setIsFullscreen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={isFullscreen ? false : 'md'}
      fullWidth
      fullScreen={isFullscreen}
      PaperProps={{
        sx: {
          height: isFullscreen ? '100vh' : '80vh',
          maxHeight: isFullscreen ? '100vh' : '80vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pr: 1
      }}>
        <Typography variant="h5" component="div">
          Full Contract Template
        </Typography>
        <Box>
          <IconButton
            onClick={toggleFullscreen}
            color="inherit"
            size="small"
            sx={{ mr: 1 }}
          >
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton
            onClick={handleClose}
            color="inherit"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 0 }}>
        {loading && (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="200px"
          >
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}
        
        {!loading && !error && markdownContent && (
          <Box sx={{ p: 3 }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <Typography variant="h4" gutterBottom color="primary">
                    {children}
                  </Typography>
                ),
                h2: ({ children }) => (
                  <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 3, mb: 2 }}>
                    {children}
                  </Typography>
                ),
                h3: ({ children }) => (
                  <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
                    {children}
                  </Typography>
                ),
                p: ({ children }) => (
                  <Typography variant="body1" paragraph>
                    {children}
                  </Typography>
                ),
                ul: ({ children }) => (
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {children}
                  </Box>
                ),
                li: ({ children }) => (
                  <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
                    {children}
                  </Typography>
                ),
                strong: ({ children }) => (
                  <Typography component="strong" sx={{ fontWeight: 'bold' }}>
                    {children}
                  </Typography>
                ),
                table: ({ children }) => (
                  <Box 
                    component="table" 
                    sx={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      border: '1px solid',
                      borderColor: 'divider',
                      mb: 2
                    }}
                  >
                    {children}
                  </Box>
                ),
                thead: ({ children }) => (
                  <Box component="thead" sx={{ bgcolor: 'grey.100' }}>
                    {children}
                  </Box>
                ),
                tbody: ({ children }) => (
                  <Box component="tbody">
                    {children}
                  </Box>
                ),
                tr: ({ children }) => (
                  <Box component="tr" sx={{ '&:nth-of-type(even)': { bgcolor: 'grey.50' } }}>
                    {children}
                  </Box>
                ),
                th: ({ children }) => (
                  <Box 
                    component="th" 
                    sx={{ 
                      p: 1, 
                      border: '1px solid',
                      borderColor: 'divider',
                      textAlign: 'left',
                      fontWeight: 'bold'
                    }}
                  >
                    {children}
                  </Box>
                ),
                td: ({ children }) => (
                  <Box 
                    component="td" 
                    sx={{ 
                      p: 1, 
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    {children}
                  </Box>
                ),
                code: ({ children }) => (
                  <Box 
                    component="code" 
                    sx={{ 
                      bgcolor: 'grey.100',
                      px: 0.5,
                      py: 0.25,
                      fontFamily: 'monospace',
                      fontSize: '0.875rem'
                    }}
                  >
                    {children}
                  </Box>
                )
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContractModal;
