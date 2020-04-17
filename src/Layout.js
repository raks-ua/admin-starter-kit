/*import React, { forwardRef } from 'react';
import { Layout, AppBar, UserMenu, useLocale, useSetLocale } from 'react-admin';
import { makeStyles, MenuItem, ListItemIcon } from '@material-ui/core';
import Language from '@material-ui/icons/Language';

// const useStyles = makeStyles(theme => ({
//     menuItem: {
//         color: theme.palette.text.secondary,
//     },
//     icon: { minWidth: theme.spacing(5) },
// }));

const SwitchLanguage = forwardRef((props, ref) => {
    const locale = useLocale();
    const setLocale = useSetLocale();
    // const classes = useStyles();
    console.log('ref: ', ref, props, locale);
    return (
        <MenuItem
            ref={ref}
            // className={classes.menuItem}
            onClick={() => {
                setLocale(locale === 'en' ? 'ru' : 'en');
                props.onClick();
            }}
        >
            <ListItemIcon >
                <Language />
            </ListItemIcon>
            Switch Language
        </MenuItem>
    );
});

const MyUserMenu = props => (
        <SwitchLanguage {...props} />
);

const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} />;

export default props => <SwitchLanguage {...props}/>;*/
