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

// Component for navigation items
const NavItem: React.FC<{
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  collapsed: boolean;
  onMobileClose: () => void;
}> = ({ href, label, icon, isActive, collapsed, onMobileClose }) => (
  <ListItem disablePadding>
    <ListItemButton
      component={NextLink}
      href={href}
      selected={isActive}
      onClick={onMobileClose}
      sx={{
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 1 : 2,
      }}
    >
      <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
        {icon}
      </ListItemIcon>
      {!collapsed && <ListItemText primary={label} sx={{ ml: 1.5 }} />}
    </ListItemButton>
  </ListItem>
);

// Component for collapsible sections
const CollapsibleSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  collapsed: boolean;
  children: React.ReactNode;
}> = ({ title, icon, isOpen, onToggle, collapsed, children }) => (
  <>
    <ListItemButton
      onClick={onToggle}
      sx={{
        mt: 1,
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 1 : 2,
      }}
    >
      <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
        {icon}
      </ListItemIcon>
      {!collapsed && <ListItemText primary={title} sx={{ ml: 1.5 }} />}
      {!collapsed && (isOpen ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
    <Collapse in={isOpen && !collapsed} timeout="auto" unmountOnExit>
      <List component="div" disablePadding sx={{ pl: 4 }}>
        {children}
      </List>
    </Collapse>
  </>
);

// Component for sidebar header
const SidebarHeader: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
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
);

// Component for collapse toggle
const CollapseToggle: React.FC<{
  collapsed: boolean;
  onToggle: () => void;
}> = ({ collapsed, onToggle }) => (
  <Box
    sx={{
      display: { xs: 'none', lg: 'flex' },
      justifyContent: 'center',
      py: 0,
      mt: 'auto',
    }}
  >
    <Box
      onClick={onToggle}
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
);

// Component for submenu items
const SubMenuItem: React.FC<{
  href: string;
  label: string;
  isActive: boolean;
  onMobileClose: () => void;
}> = ({ href, label, isActive, onMobileClose }) => (
  <ListItem disablePadding>
    <ListItemButton
      component={NextLink}
      href={href}
      selected={isActive}
      onClick={onMobileClose}
    >
      <ListItemText primary={label} />
    </ListItemButton>
  </ListItem>
);

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
      <SidebarHeader collapsed={collapsed} />

      <List sx={{ pt: 2 }}>
        <NavItem
          href="/"
          label="Dashboard"
          icon={<DashboardIcon color={isActive('/') ? 'primary' : 'inherit'} />}
          isActive={isActive('/')}
          collapsed={collapsed}
          onMobileClose={onMobileClose}
        />

        <CollapsibleSection
          title="Channels"
          icon={<LayersIcon color={openChannels ? 'primary' : 'inherit'} />}
          isOpen={openChannels}
          onToggle={handleChannelsClick}
          collapsed={collapsed}
        >
          <SubMenuItem
            href="/channels/create"
            label="Create New Channel"
            isActive={isActive('/channels/create')}
            onMobileClose={onMobileClose}
          />
          <SubMenuItem
            href="/channels"
            label="View All Channels"
            isActive={isActive('/channels')}
            onMobileClose={onMobileClose}
          />
        </CollapsibleSection>

        <CollapsibleSection
          title="Frameworks"
          icon={<LayersIcon color={openFrameworks ? 'primary' : 'inherit'} />}
          isOpen={openFrameworks}
          onToggle={handleFrameworksClick}
          collapsed={collapsed}
        >
          <SubMenuItem
            href="/frameworks/create"
            label="Create New Framework"
            isActive={isActive('/frameworks/create')}
            onMobileClose={onMobileClose}
          />
          <SubMenuItem
            href="/frameworks"
            label="View All Frameworks"
            isActive={isActive('/frameworks')}
            onMobileClose={onMobileClose}
          />
          <SubMenuItem
            href="/frameworks/manage"
            label="Manage Taxonomy"
            isActive={isActive('/frameworks/manage')}
            onMobileClose={onMobileClose}
          />
        </CollapsibleSection>
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <CollapseToggle collapsed={collapsed} onToggle={handleCollapseToggle} />
    </Box>
  );

  return (
    <>
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
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
