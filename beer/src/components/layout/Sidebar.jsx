import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';

const drawerWidth = 240;

const menuItems = [
  { text: 'ໜ້າຫຼັກ', icon: <DashboardIcon />, path: '/' },
  { text: 'ການຂາຍໃໝ່', icon: <ShoppingCartIcon />, path: '/sales/new' },
  { text: 'ປະຫວັດການຂາຍ', icon: <ReceiptIcon />, path: '/sales' },
  { text: 'ລາຍການສິນຄ້າ', icon: <InventoryIcon />, path: '/products' },
  { text: 'ນຳເຂົ້າສິນຄ້າ', icon: <AddShoppingCartIcon />, path: '/products/import' },
  { text: 'ລູກຄ້າ', icon: <PeopleIcon />, path: '/customers' },
  { text: 'ລາຍການໜີ້', icon: <AccountBalanceIcon />, path: '/debts' },
];

const Sidebar = ({ open, toggleDrawer }) => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          whiteSpace: 'nowrap',
          overflowX: 'hidden',
          transition: (theme) => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ...(!open && {
            width: theme => theme.spacing(7),
            transition: (theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }),
        },
      }}
      open={open}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ opacity: open ? 1 : 0 }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;