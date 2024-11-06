import './table.scss';
import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Edit3 } from 'react-feather';
import { Trash2 } from 'react-feather';

export interface Coluna {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Coluna[];
  data: Record<string, string | number>[];
  titleModal: string;
  onDelete: (id: number | string) => void;
  onEdit: (id: number | string) => void;
}

const Table = ({ columns, data, titleModal, onDelete, onEdit }: TableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<number | string>('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, rowId: number | string) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowId);
};

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow('');
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
        onDelete(selectedRow); 
        handleClose();
    }
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      onEdit(selectedRow);  
    }
  };

  return (
    <div className="container-table">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.header}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.accessor}>{row[col.accessor]}</td>
              ))}
              <td className='icon'>
                <IconButton onClick={(event) => handleMenuOpen(event, row.id)} sx={{width: 40}}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedRow === row.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleEdit} style={{display: 'flex', gap: 8}}><Edit3 width={20} color='#667085' />Editar</MenuItem>
                  <MenuItem onClick={handleOpen}  style={{display: 'flex', gap: 8}}><Trash2 width={20} color='#667085' />Excluir</MenuItem>
                </Menu>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle sx={{fontWeight: 600, fontSize: 16, borderBottom: '1px solid #ECECEC'}}>Deletar {titleModal}</DialogTitle>
            <DialogContent>
            <DialogContentText sx={{fontWeight: 500, fontSize: 14, marginTop: 6, marginBottom: 4}}>
                Tem certeza de que deseja excluir este item? Essa ação não pode ser desfeita.
            </DialogContentText>
            </DialogContent>
            <DialogActions className='container-exclusao'>
            <Button onClick={handleClose} className='botao-excluir'>
                Cancelar
            </Button>
            <Button onClick={handleDelete} className='botao-excluir' autoFocus>
                Confirmar
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default Table;