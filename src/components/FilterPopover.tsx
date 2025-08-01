import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FilterPopoverProps } from '@/interfaces/BaseInterface';

// This component renders a popover for filtering items by status.
// It accepts props for anchor element, open state, close handler, selected status, status change handler, status options, and filter title.
// The popover displays a list of checkboxes for each status option, allowing users to select multiple statuses to filter the items displayed in the parent component.
const FilterPopover: React.FC<FilterPopoverProps> = ({
  anchorEl,
  open,
  onClose,
  selectedStatus,
  onStatusChange,
  statusOptions = ['Live', 'Draft'],
  filterTitle = 'Filter by Status',
}) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    slotProps={{ paper: { sx: { p: 2, width: 220 } } }}
  >
    <Typography fontWeight={600} mb={1} color="text.primary">
      {filterTitle}
    </Typography>
    <Stack direction="column" spacing={1}>
      {statusOptions.map((status) => (
        <Box key={status} display="flex" alignItems="center">
          <Checkbox
            checked={selectedStatus.includes(status)}
            onChange={() => onStatusChange(status)}
            sx={{ color: '#6366f1' }}
          />
          <Typography variant="body2" color="text.primary">
            {status}
          </Typography>
        </Box>
      ))}
    </Stack>
  </Popover>
);

export default FilterPopover;
