import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  // Avatar,
  Badge,
  alpha,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  IntegrationInstructions as IntegrationIcon,
  Payment as PaymentIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Profile } from './Profile';

const drawerWidth = 280;

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

const menuItems = [
  { text: 'Overview', icon: <DashboardIcon />, path: '/' },
  { text: 'Restaurant Details', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Call Logs', icon: <HistoryIcon />, path: '/recordings' },
  { text: 'Integrations', icon: <IntegrationIcon />, path: '/integrations' },
  { text: 'Billing', icon: <PaymentIcon />, path: '/billing' },
];

// Add mock notifications data
const mockNotifications = [
  {
    id: 1,
    title: 'New Call Received',
    message: 'Customer called to place an order',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: 2,
    title: 'Order Confirmed',
    message: 'Order #1234 has been confirmed',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'System Update',
    message: 'System maintenance completed successfully',
    time: '2 hours ago',
    read: true,
  },
];

export const Layout: React.FC<LayoutProps> = ({ children, darkMode, onDarkModeToggle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close the mobile drawer after navigation
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: theme.palette.mode === 'dark' 
        ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`
        : `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
    }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* <Avatar 
          sx={{ 
            width: 40, 
            height: 40,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        >
          CB
        </Avatar> */}
        <Typography 
          variant="h5" 
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
          }}
        >
          Dinefy Dashboard
        </Typography>
      </Box>
      
      <Divider sx={{ 
        opacity: 0.1,
        mx: 2,
      }} />

      <List sx={{ flex: 1, px: 2, py: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.2s ease-in-out',
                ...(isActive && {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  },
                  '& .MuiListItemText-primary': {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  },
                }),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, isActive ? 0.15 : 0.05),
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{
                minWidth: 40,
                color: isActive ? 'primary.main' : 'text.secondary',
                transition: 'color 0.2s ease-in-out',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.9375rem',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s ease-in-out',
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Free Minutes
          </Typography>
          <Typography variant="body2" color="primary" fontWeight="medium">
            750 / 1000
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 8,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '75%',
              height: '100%',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: 4,
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ opacity: 0.1, mx: 2 }} />

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Version
          </Typography>
          <Typography variant="body2" color="text.secondary">
            1.0.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            {menuItems.find((item) => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>

          <IconButton
            onClick={handleNotificationsClick}
            sx={{ 
              mr: 1,
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleProfileMenuClick}
            sx={{ 
              mr: 1,
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            <AccountIcon />
          </IconButton>
          
          <IconButton 
            onClick={onDarkModeToggle}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 360,
            maxHeight: 480,
            borderRadius: 2,
            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
        </Box>
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => {
                setNotifications(notifications.map(n => 
                  n.id === notification.id ? { ...n, read: true } : n
                ));
                handleNotificationsClose();
              }}
              sx={{
                py: 1.5,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                bgcolor: notification.read ? 'transparent' : alpha(theme.palette.primary.main, 0.05),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {notification.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {notification.message}
              </Typography>
            </MenuItem>
          ))}
        </Box>
        <Divider />
        {/* <Box sx={{ p: 1, textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            color="primary"
            sx={{ 
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            View All Notifications
          </Typography>
        </Box> */}
      </Menu>

      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
          }
        }}
      >
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            setProfileOpen(true);
          }}
          sx={{
            py: 1.5,
            px: 2,
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          <ListItemIcon>
            <AccountIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            handleLogout();
          }}
          sx={{
            py: 1.5,
            px: 2,
            color: 'error.main',
            '&:hover': {
              bgcolor: alpha(theme.palette.error.main, 0.05),
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>

      <Profile open={profileOpen} onClose={() => setProfileOpen(false)} />
    </Box>
  );
}; 