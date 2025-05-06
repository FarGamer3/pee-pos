import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  Container
} from '@mui/material';
import {
  Home as HomeIcon,
  Category as CategoryIcon,
  ShoppingCart as SalesIcon,
  Settings as SettingsIcon,
  Assessment as ReportIcon,
  Menu as MenuIcon,
  Notifications as NotificationIcon,
  Person as PersonIcon
} from '@mui/icons-material';

// Drawer width
const drawerWidth = 250;

export default function Layout({ children, title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // ປັບປຸງເມນູຕາມຄວາມຕ້ອງການ
  const menuItems = [
    { text: 'ໜ້າຫຼັກ', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'ຂາຍ', icon: <SalesIcon />, path: '/sales' },
    { text: 'ຈັດການຂໍ້ມູນ', icon: <CategoryIcon />, path: '/manage-data' },
    { text: 'ຕິດຕັ້ງ', icon: <SettingsIcon />, path: '/settings' },
    { text: 'ລາຍງານ', icon: <ReportIcon />, path: '/reports' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <Avatar
          alt="Logo"
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'white'
          }}
        />
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                py: 1.5
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationIcon />
            </Badge>
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              Admin_user
            </Typography>
            <Avatar sx={{ width: 32, height: 32 }}>
              <PersonIcon />
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar / Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: (theme) => theme.palette.primary.main,
              color: 'white'
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: (theme) => theme.palette.primary.main,
              color: 'white'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        {title && (
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{
              color: 'black', 
              fontWeight: 'bold',
              mb: 3,
              ml: { xs: 0, md: 5 }
            }}
          >
            {title}
          </Typography>
        )}
        
        <Container maxWidth="xl" disableGutters>
          {children}
        </Container>
      </Box>
    </Box>
  );
}ຫ