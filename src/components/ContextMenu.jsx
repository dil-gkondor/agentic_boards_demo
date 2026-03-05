import React from 'react';
import { Menu, MenuItem } from '@mui/material';

export default function ContextMenu({ open, x, y, onClose, onAction }) {
  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={open ? { top: y, left: x } : undefined}
    >
      {['Open', 'Duplicate', 'Escalate'].map((action) => (
        <MenuItem key={action} onClick={() => onAction(action)}>
          {action}
        </MenuItem>
      ))}
    </Menu>
  );
}
