import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { UIContext } from 'context/ui';
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from 'context/entries';
const NewEntry = () => {
  const { openAddMenu, closeAddMenu, addmenuOpen } = useContext(UIContext);
  const { addEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    addEntry(inputValue);

    setInputValue('');
    setTouched(false);
    closeAddMenu();
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      {!addmenuOpen ? (
        <Button
          sx={{
            animation: 'anim .5s ease-in',
            '@keyframes anim': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
          endIcon={<AddCircleOutlineOutlined />}
          variant='outlined'
          fullWidth
          onClick={openAddMenu}
        >
          Agregar Tarea
        </Button>
      ) : (
        <Box
          sx={{
            animation: 'anim .5s ease-in',
            '@keyframes anim': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder='Nueva Entrada'
            autoFocus
            multiline
            error={inputValue.length <= 0 && touched}
            onChange={onTextFieldChange}
            value={inputValue}
            onBlur={() => setTouched(true)}
            label='Nueva Entrada'
            helperText='Ingrese un valor'
          ></TextField>
          <Box
            sx={{
              padding: 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              onClick={closeAddMenu}
              variant='text'
              sx={{ flexShrink: 1 }}
            >
              Cancelar
            </Button>
            <Button
              endIcon={<SaveOutlinedIcon />}
              variant='outlined'
              color='secondary'
              sx={{ flexShrink: 1 }}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NewEntry;
