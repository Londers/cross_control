import React from "react";
import {
    AppBar,
    Button,
    Dialog,
    IconButton,
    Slide,
    Toolbar,
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import CloseIcon from '@mui/icons-material/Close';
import MapContainer from "./MapContainer";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CoordinatesDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Выберите координаты
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        {/*<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">*/}
                        {/*    Sound*/}
                        {/*</Typography>*/}
                        {/*<Button autoFocus color="inherit" onClick={handleClose}>*/}
                        {/*    save*/}
                        {/*</Button>*/}
                    </Toolbar>
                </AppBar>
                <MapContainer />
            </Dialog>
        </div>
    );
}

export default CoordinatesDialog