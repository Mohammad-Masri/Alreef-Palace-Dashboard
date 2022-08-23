import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../Iconify';

// ----------------------------------------------------------------------

export default function MyTableActionMenu({
  objectId,
  showOption,
  handleClickShow,
  showPaymentsOption,
  handleClickShowPayments,
  deleteOption,
  handleClickDelete,
  editOption,
  handleClickEdit,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {showOption == true ? (
          <MenuItem
            sx={{ color: 'text.secondary' }}
            onClick={() => {
              handleClickShow(objectId);
            }}
          >
            <ListItemIcon>
              <Iconify icon="bx:show" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="عرض التفاصيل" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : (
          <></>
        )}

        {showPaymentsOption == true ? (
          <MenuItem
            sx={{ color: 'text.secondary' }}
            onClick={() => {
              handleClickShowPayments(objectId);
            }}
          >
            <ListItemIcon>
              <Iconify icon="ant-design:history-outlined" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="عرض سجل الدفعات" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : (
          <></>
        )}

        {editOption == true ? (
          <MenuItem
            sx={{ color: 'text.secondary' }}
            onClick={() => {
              handleClickEdit(objectId);
            }}
          >
            <ListItemIcon>
              <Iconify icon="eva:edit-fill" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="تعديل" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : (
          <></>
        )}

        {deleteOption == true ? (
          <MenuItem
            sx={{ color: 'text.secondary' }}
            onClick={() => {
              handleClickDelete(objectId);
            }}
          >
            <ListItemIcon>
              <Iconify icon="eva:trash-2-outline" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="حذف" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : (
          <></>
        )}
      </Menu>
    </>
  );
}
