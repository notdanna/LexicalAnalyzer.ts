"use client"; // Deja usar el cliente

import * as React from "react";
import { Button, Modal, Typography, Box, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent } from "@mui/material";
import { JoinInner } from "@mui/icons-material";
import { style } from "@/components/Theme"
import ShinyButton from "@/components/magic-ui/shiny-button";
import { ejecutarAlerta } from "@/components/alerts/alertas";

// Importamos los TS que dan funcionalidad al componente
import { AFN } from "@/ts/AFN";

// Actualizamos el TextField para que sea morado
declare module '@mui/material/FormControl' {
    interface FormControlPropsColorOverrides {
        purple: true;
    }
}

interface ConcatenateAFNButtonProps {
    afns: AFN[];
    onAFNConcatenated: (newAFN: AFN) => void;
}

const ConcatenateAFNButton: React.FC<ConcatenateAFNButtonProps> = ({ afns, onAFNConcatenated}) => {
    // Estados para el Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Estados para la lista
    const [afn1, setAFN1] = React.useState('');
    const [afn2, setAFN2] = React.useState('');

    const handleAFN1Change = (event: SelectChangeEvent) => {
        setAFN1(event.target.value);
    }

    const handleAFN2Change = (event: SelectChangeEvent) => {
        setAFN2(event.target.value);
    }

    const handleJoinAFN = () => {
        const selectedAFN1 = afns.find(afn => afn.idAFN.toString() === afn1);
        const selectedAFN2 = afns.find(afn => afn.idAFN.toString() === afn2);

        if(selectedAFN1 && selectedAFN2){
            selectedAFN1.concatenacionAFN(selectedAFN2);

            // Aquí pasamos el AFN1 modificado
            onAFNConcatenated(selectedAFN1);
            
            // Alerta
            ejecutarAlerta('success', 'AFNs concatenados', 'bottom-end');
            setAFN1('');
            setAFN2('');
            handleClose();
        } else {
            // Alerta
            ejecutarAlerta('error', 'No se han seleccionado los dos AFNs', 'bottom-end');
            setAFN1('');
            setAFN2('');
            handleClose();
        }
    };

    return (
        <div>
            {/*Cambia los botones (deshabilitar)*/}
            {afns.length < 2 ? (
                <Button
                    className="bg-custom1 text-custom1 buttons-space items-center justify-center h-full"
                    sx={{
                        "&:disabled": {
                            color: "#4D4D4D",
                            backgroundColor: "#E6E6E6"
                        }
                    }}
                    variant="contained"
                    startIcon={<JoinInner />}
                    onClick={handleOpen}
                    disabled={afns.length < 2}>
                        Concatenar AFN
                </Button>
                ) : (     
                <div onClick={handleOpen} className="disabled">
                    <ShinyButton
                        className="bg-custom1 text-custom1 buttons-space items-center justify-center h-full"
                    >
                        <span className="text-custom1">
                            <JoinInner /> Concatenar AFN
                        </span>
                    </ShinyButton>
                </div>
                )
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Concatenar AFN
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Selecciona los dos AFN que deseas concatenar
                        </Typography>
                        <FormControl sx={{ mt: 2, minWidth: 120 }} size="small" color="purple">
                            <InputLabel id="afn1-select-label">1er AFN</InputLabel>
                            <Select
                                labelId="afn1-select-label"
                                id="afn-select"
                                value={afn1}
                                label="AFN 1"
                                onChange={handleAFN1Change}
                            >
                                {afns.map((afn) => (
                                    <MenuItem key={afn.idAFN} value={afn.idAFN.toString()}>
                                        AFN {afn.idAFN}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 2, ml:2, minWidth: 120 }} size="small" color="purple">
                            <InputLabel id="afn2-select-label">2do AFN</InputLabel>
                            <Select
                                labelId="afn2-select-label"
                                id="afn-select"
                                value={afn2}
                                label="AFN 2"
                                onChange={handleAFN2Change}
                            >
                                {afns.map((afn) => (
                                    <MenuItem key={afn.idAFN} value={afn.idAFN.toString()}>
                                        AFN {afn.idAFN}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    <Box>
                        <Button
                            variant="contained"
                            className="bg-custom1 py-2 px-6"
                            endIcon={<JoinInner />}
                            onClick={handleJoinAFN}
                        >
                            Concatenar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ConcatenateAFNButton;