import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TabEditor = ({editingTitle, tabTitle, handleTitleChange, handleEditingTitle, handleSaveNewTitle, getAscii}) => {

    return (
        <>
            {!editingTitle ?
                <Typography variant='h4' textAlign='center' marginBottom='20px'>{tabTitle}
                    <IconButton color="primary" aria-label="edit picture" component="div" style={{ marginLeft: '20px' }} onClick={handleEditingTitle}>
                        <EditIcon />
                    </IconButton>
                </Typography>
                :
                <div style={{ textAlign: 'center' }}>
                    <TextField label='Title' defaultValue={tabTitle} onChange={handleTitleChange} size='medium' />
                    <IconButton color="primary" aria-label="edit picture" component="div" style={{ marginLeft: '10px' }} onClick={handleSaveNewTitle}>
                        <CheckSharpIcon />
                    </IconButton>
                </div>
            }
            <Paper elevation={6} style={{ paddingBottom: "30px", width: "95%", maxWidth: "1250px", minHeight: "730px", maxHeight: '1300px', margin: "0 auto" }}>
                <Box sx={{ paddingLeft: '40px', paddingTop: '15px' }}>
                    {getAscii()}
                </Box>
            </Paper>
        </>
    )
}

export default TabEditor;