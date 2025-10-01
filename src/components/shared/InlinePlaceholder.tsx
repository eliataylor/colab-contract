import React, {useState} from 'react';
import {Box, Button, IconButton, TextField, Tooltip, Typography, useTheme} from '@mui/material';
import {Cancel, Edit, Save} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

interface InlinePlaceholderProps {
    value: string;
    placeholder?: string;
}

const InlinePlaceholder: React.FC<InlinePlaceholderProps> = ({value}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const theme = useTheme();

    const handleEdit = () => {
        setEditValue(value);
        setIsEditing(true);
    };

    const handleSave = () => {

        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            handleSave();
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 1
            }}>
                <Typography variant="body2" color="text.secondary" sx={{fontStyle: 'italic'}}>
                    IP Definition
                </Typography>
                {!isEditing && (
                    <Tooltip title="Edit IP Definition">
                        <IconButton
                            size="small"
                            onClick={handleEdit}
                            sx={{ml: 1}}
                        >
                            <Edit fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

            {isEditing ? (
                <Box>
                    <TextField
                        multiline
                        fullWidth
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                fontFamily: 'monospace',
                                fontSize: '0.95rem',
                                lineHeight: 1.5,
                                backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                                color: theme.palette.text.primary,
                                '& fieldset': {
                                    borderColor: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.300',
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.mode === 'dark' ? 'grey.500' : 'grey.400',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '& textarea': {
                                    color: theme.palette.text.primary,
                                    '&::placeholder': {
                                        color: theme.palette.text.secondary,
                                        opacity: 1,
                                    },
                                },
                            },
                        }}
                        placeholder="Enter IP definition..."
                        rows={6}
                    />
                    <Box sx={{display: 'flex', gap: 1, mt: 1, justifyContent: 'flex-end'}}>
                        <Button
                            size="small"
                            startIcon={<Save/>}
                            onClick={handleSave}
                            variant="contained"
                            color="primary"
                        >
                            Save
                        </Button>
                        <Button
                            size="small"
                            startIcon={<Cancel/>}
                            onClick={handleCancel}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{mt: 1, display: 'block'}}>
                        Press Ctrl+Enter to save, Esc to cancel
                    </Typography>
                </Box>
            ) : <ReactMarkdown>{value}</ReactMarkdown>}
        </Box>
    );
};

export default InlinePlaceholder;
