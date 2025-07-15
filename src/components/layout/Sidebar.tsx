import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SidebarProps } from '@/interfaces/LayoutInterface';

// Define the width of the sidebar drawer
const expandedWidth = 260;
const collapsedWidth = 64;

// This component renders the sidebar for the application.
// It includes navigation links for Dashboard, Channels, and Frameworks.
const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const router = useRouter();
  const [openFrameworks, setOpenFrameworks] = React.useState(true);
  const [openChannels, setOpenChannels] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.setProperty(
        '--sidebar-width',
        `${collapsed ? collapsedWidth : expandedWidth}px`
      );
    }
  }, [collapsed]);

  const handleFrameworksClick = () => setOpenFrameworks((prev) => !prev);
  const handleChannelsClick = () => setOpenChannels((prev) => !prev);
  const handleCollapseToggle = () => setCollapsed((prev) => !prev);

  const isActive = (href: string) => router.pathname === href;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 56,
          px: collapsed ? 1 : 2,
          borderBottom: 1,
          borderColor: 'divider',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        <LayersIcon sx={{ color: 'primary.main', mr: collapsed ? 0 : 1 }} />
        {!collapsed && (
          <Typography variant="h6" fontWeight={600} color="primary.main">
            Taxonomy Editor
          </Typography>
        )}
      </Box>
      <List sx={{ pt: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            component={NextLink}
            href="/"
            selected={isActive('/')}
            onClick={onMobileClose}
            sx={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1 : 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
              <DashboardIcon color={isActive('/') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText primary="Dashboard" sx={{ ml: 1.5 }} />
            )}
          </ListItemButton>
        </ListItem>
        <ListItemButton
          onClick={handleChannelsClick}
          sx={{
            mt: 1,
            justifyContent: collapsed ? 'center' : 'flex-start',
            px: collapsed ? 1 : 2,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
            <LayersIcon color={openChannels ? 'primary' : 'inherit'} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Channels" sx={{ ml: 1.5 }} />}
          {!collapsed && (openChannels ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        <Collapse in={openChannels && !collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/channels/create"
                selected={isActive('/channels/create')}
                onClick={onMobileClose}
              >
                <ListItemText primary="Create New Channel" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/channels"
                selected={isActive('/channels')}
                onClick={onMobileClose}
              >
                <ListItemText primary="View All Channels" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
        <ListItemButton
          onClick={handleFrameworksClick}
          sx={{
            mt: 1,
            justifyContent: collapsed ? 'center' : 'flex-start',
            px: collapsed ? 1 : 2,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
            <LayersIcon color={openFrameworks ? 'primary' : 'inherit'} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Frameworks" sx={{ ml: 1.5 }} />}
          {!collapsed && (openFrameworks ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        <Collapse
          in={openFrameworks && !collapsed}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/frameworks/create"
                selected={isActive('/frameworks/create')}
                onClick={onMobileClose}
              >
                <ListItemText primary="Create New Framework" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/frameworks"
                selected={isActive('/frameworks')}
                onClick={onMobileClose}
              >
                <ListItemText primary="View All Frameworks" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/frameworks/manage"
                selected={isActive('/frameworks/manage')}
                onClick={onMobileClose}
              >
                <ListItemText primary="Manage Taxonomy" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      {/* Collapse/Expand toggle button (desktop only) */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
          py: 0,
          mt: 'auto',
        }}
      >
        <Box
          onClick={handleCollapseToggle}
          sx={{
            width: '100%',
            cursor: 'pointer',
            bgcolor: 'primary.main',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 48,
            transition: 'background 0.2s',
            borderTop: '1px solid',
            borderColor: 'divider',
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: 0.5,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          {collapsed ? (
            <ChevronRightIcon sx={{ color: '#fff' }} />
          ) : (
            <ChevronLeftIcon sx={{ color: '#fff' }} />
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: expandedWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: collapsed ? collapsedWidth : expandedWidth,
            boxSizing: 'border-box',
            transition: 'width 0.2s',
            overflowX: 'hidden',
            // Removed --sidebar-width from here
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
