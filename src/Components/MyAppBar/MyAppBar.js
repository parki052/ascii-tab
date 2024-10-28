import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { LightModeTwoTone, NightlightRound, } from '@mui/icons-material';
import { useTheme } from '@emotion/react';


const MyAppBar = ({isLightMode, handleLightModeClick}) => {
    const theme = useTheme();

    return(
        <AppBar sx={{ zIndex: theme.zIndex.drawer + 1 }} position="fixed">
        <Toolbar sx={theme.mixins.toolbar}>
          <Grid sx={{ flexGrow: 1 }} container spacing={1} >
            <Grid item justifyContent='space-between' container>
              <Grid item>
                <Typography variant="h4" style={{ color: 'darkorange' }} component="div">
                  |--ascii--tab--|
                </Typography>
              </Grid>
              <Grid item paddingTop='5px' paddingRight='0px'>
                <IconButton color="primary" aria-label="toggle light mode" component="div" onClick={handleLightModeClick}>
                  {isLightMode
                    ? <NightlightRound color='action' />
                    : <LightModeTwoTone color='action' />
                  }
                </IconButton>
              </Grid>
            </Grid>
            <Grid item paddingTop="0px !important" >
              <Typography variant="subtitle2" paddingLeft="25px" component="div">
                A web guitar tab editor
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
}

export default MyAppBar;