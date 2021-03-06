import React from 'react';
// Assets
import Logo from '../../assets/Web-SEO-Online-Logo-white-transparent.png'
// Components
import LoginGoogle from '../containers/LoginGoogle';
import UserProps from '../containers/UserProps';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles(theme => ({
    boxWrapper: {
        width: '100%',
        [theme.breakpoints.down(400)]: { // max-width: 350px
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
        },
    },
    boxLogo: {
        [theme.breakpoints.down('xs')]: { // max-width: 600px
            justifyContent: 'space-between',
            '& > .MuiTypography-root': {
                display: 'none',
            },
        },
        [theme.breakpoints.down(350)]: { // max-width: 350px
            flex: '0 0 30%',
            '& > img': {
                width: '100%',
                height: 'auto',
            },
        },
    },
    logo: {
        width: 'auto',
        height: 50,
        marginRight: 10,
    },
    toTop: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 9999,
    },
    toolbarAnchor: {
        minHeight: 75,
    },
    typography: {
        fontWeight: 300,
    }
}));

const ScrollTop = (props) => {

    const { children } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.toTop}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
};

const HideOnScroll = (props) => {

    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

const Header = (props) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar color="primary">
                    <Toolbar>
                        <Box display="flex" flexWrap="wrap" alignItems="center" className={classes.boxWrapper}>
                            <Box display="flex" alignItems="center" flexGrow={1} className={classes.boxLogo}>
                                <img 
                                    src={Logo}
                                    alt="WebSEO Online Devices"
                                    className={classes.logo} 
                                />
                                <Typography className={classes.typography} variant="h6">WebSEO Online Devices</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" className={classes.boxUser}>
                                <UserProps />
                                <LoginGoogle/>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar id="back-to-top-anchor" className={classes.toolbarAnchor} />
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}

export default Header;