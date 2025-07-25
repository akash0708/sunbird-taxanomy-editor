import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FilterPopover from '@/components/FilterPopover';

interface ListOfExistingItemsProps {
  title: string;
  items: Array<Record<string, unknown>>;
  getItemDetails: (item: Record<string, unknown>) => React.ReactNode;
  onEdit?: (item: Record<string, unknown>) => void;
  editIconTooltip?: string;
  maxHeight?: number;
  emptyText?: string;
  filterEnabled?: boolean;
  filterOptions?: string[];
  selectedFilters?: string[];
  onFilterChange?: (filter: string) => void;
  filterTitle?: string;
  filterFunction?: (
    item: Record<string, unknown>,
    selectedFilters: string[]
  ) => boolean;
}

const ListOfExistingItems: React.FC<ListOfExistingItemsProps> = ({
  title,
  items,
  getItemDetails,
  onEdit,
  editIconTooltip,
  maxHeight = 200,
  emptyText = 'No items available.',
  filterEnabled = false,
  filterOptions = [],
  selectedFilters = [],
  onFilterChange,
  filterTitle = 'Filter',
  filterFunction,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleFilterButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };
  // Filter items if filter is enabled and filterFunction is provided
  const filteredItems =
    filterEnabled && filterFunction && selectedFilters.length > 0
      ? items.filter((item) => filterFunction(item, selectedFilters))
      : items;
  return (
    <Box
      sx={{
        maxHeight,
        overflowY: 'auto',
        border: '1px solid #eee',
        borderRadius: 2,
        background: '#fafbfc',
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{
            textTransform: 'uppercase',
            color: 'text.secondary',
            fontSize: 15,
            p: 2,
          }}
        >
          {title}
        </Typography>
        {filterEnabled && (
          <IconButton
            size="small"
            onClick={handleFilterButtonClick}
            sx={{ mr: 2 }}
            title={filterTitle}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M3 5h18M6 10h12M10 15h4"
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </IconButton>
        )}
        {filterEnabled && (
          <FilterPopover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
            selectedStatus={selectedFilters}
            onStatusChange={onFilterChange || (() => {})}
            statusOptions={filterOptions}
            filterTitle={filterTitle}
          />
        )}
      </Box>
      <List disablePadding>
        {filteredItems.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 3 }}>
            {emptyText}
          </Typography>
        ) : (
          filteredItems.map((item, idx) => (
            <React.Fragment key={String(item.identifier || idx)}>
              <ListItem
                alignItems="flex-start"
                sx={{ display: 'block', py: 2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box sx={{ flex: 1 }}>{getItemDetails(item)}</Box>
                  {onEdit && (
                    <IconButton
                      size="small"
                      onClick={() => onEdit(item)}
                      sx={{ ml: 1 }}
                      title={editIconTooltip || 'Edit'}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </ListItem>
              {idx < filteredItems.length - 1 && <Divider />}
            </React.Fragment>
          ))
        )}
      </List>
    </Box>
  );
};

export default ListOfExistingItems;
