import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SaveRounded from '@mui/icons-material/SaveRounded'
import UploadSharpIcon from '@mui/icons-material/UploadSharp';
import Divider from '@mui/material/Divider';

const MyDrawer = ({saveToText, drawerWidth, fileRef}) => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant='permanent'
            anchor="left"
            open={true}
        >
            <div style={{ height: '80px' }} />
            <List>
                <Divider />
                <ListItem button onClick={saveToText}>
                    <ListItemIcon>
                        <SaveRounded />
                    </ListItemIcon>
                    <ListItemText primary={"Save"} />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => fileRef.current.click()}>
                    <ListItemIcon>
                        <UploadSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Upload"} />
                </ListItem>
                <Divider />
            </List>
        </Drawer>

    )
}

export default MyDrawer;