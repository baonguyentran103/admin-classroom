import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@mui/material/IconButton';
const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(1),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {

    const { children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="sx" maxHeight="sx" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        User Profile
                    </Typography>
                    <IconButton
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
