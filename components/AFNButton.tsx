"use client"; // Deja usar el cliente

// Importamos los componentes necesarios de React y Material UI
import * as React from "react";
import { Button, Modal, Typography, Box, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { createTheme } from "@mui/material/styles";
import { BorderBeam } from "@/components/magic-ui/border-beam";
import PulsatingButton from "@/components/magic-ui/pulsating-button";

// Importamos los TS que dan funcionalidad al componente
import { AFN } from "@/ts/AFN";

// Estilos modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    heigth: 600,
    bgcolor: '#FFFFFF',
    color: 'black',
    border: '3px solid #B3B3B3',
    boxShadow: 24,
    p: 4,
};

// Tema morado
declare module '@mui/material/styles' {
    interface Palette {
        purple: Palette['primary'];
    }
    interface PaletteOptions {
        purple: PaletteOptions['primary'];
    }
}

// Actualizamos el TextField para que sea morado
declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
        purple: true;
    }
}

const theme = createTheme({
    palette: {
        purple: {
            main: "#907aa9",
            light: "#907aa9",
            dark: "#907aa9",
            contrastText: "#907aa9",
        },
    },
});

const AFNButton: React.FC<{ onAFNCreated: (afn: AFN) => void}> = ({ onAFNCreated }) => {
    // Contador AFN local
    const [hasAFN, setHasAFN] = React.useState(false);

    // Estados para el Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Estados para los inputs
    const [input1, setInput1] = React.useState('');
    const [input2, setInput2] = React.useState('');

    // Manejadores para los inputs
    const handleInput1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput1(event.target.value);
    };

    const handleInput2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput2(event.target.value);
    };

    // Función para manejar la creación del AFN
    const handleCreateAFN = () => {
        const afn = new AFN();

        if(input1 && input2){
            afn.creaAFNBasico(input1, input2);
            console.log(afn.imprimirAFN());
        } else if (input1){
            afn.creaAFNBasico(input1);
        } else if (input2){
            afn.creaAFNBasico(input2);
        } else {
            console.log("error");
        }

        onAFNCreated(afn);
        setHasAFN(true);

        // Reinciar los inputs
        setInput1('');
        setInput2('');

        // Cerramos el modal
        handleClose();
    };

    // Deshabilitar pulso si ya hay un AFN
    const duration = hasAFN ? "0s" : "5s";

    return(
        <div>
            <PulsatingButton
                className="bg-custom1 text-custom1"
                pulseColor="#B3B3B3"
                duration={duration}
                onClick={handleOpen}
            >
                <Add /> Crear AFN
            </PulsatingButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Crear AFN
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Ingresa un número o simbolo para crear el AFN
                    </Typography>
                    <TextField
                        label="Número o simbolo 1"
                        value={input1}
                        onChange={handleInput1Change}
                        fullWidth
                        color="purple"
                        margin="normal"
                    />
                    <TextField
                        label="Número o simbolo 2"
                        value={input2}
                        onChange={handleInput2Change}
                        fullWidth
                        color="purple"
                        margin="normal"
                    />
                    <Button 
                        variant="contained"
                        sx={{ backgroundColor: "#907aa9", padding: "8px 24px", mt: 1 }}
                        endIcon={<Add />}
                        onClick={handleCreateAFN}>
                            Crear AFN
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default AFNButton;