// components/Dashboard/DashboardHome.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StoreIcon from '@mui/icons-material/Store';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

// Mock data for dashboard
const mockSummary = {
  totalSales: 2500000,
  todaySales: 450000,
  totalProducts: 4,
  lowStockProducts: 1,
  totalCustomers: 3,
  pendingDebts: 1
};

const mockRecentSales = [
  {
    sale_id: 1,
    customer_name: 'ທ້າວ ສົມໃຈ',
    sale_date: '2025-05-06 09:30:00',
    total_amount: 250000,
    payment_type: 'cash'
  },
  {
    sale_id: 2,
    customer_name: 'ນາງ ຈັນສຸກ',
    sale_date: '2025-05-05 16:45:00',
    total_amount: 360000,
    payment_type: 'transfer'
  },
  {
    sale_id: 3,
    customer_name: 'ທ້າວ ສີທັດ',
    sale_date: '2025-05-04 10:15:00',
    total_amount: 180000,
    payment_type: 'credit'
  }
];

const mockLowStockProducts = [
  { product_id: 4, product_name: 'ນ້ຳມັນພືດ', unit: 'ຂວດ', qty: 3, min_qty: 10 }
];

const mockPendingDebts = [
  {
    debt_id: 3,
    customer_name: 'ທ້າວ ສີທັດ',
    product_name: 'ເຂົ້າໜຽວ',
    debt_date: '2025-05-04',
    qty: 50,
    amount: 750000,
    status: 'pending'
  }
];

// Mock sales data by day for the chart
const mockSalesByDay = [
  { day: 'ຈັນ', amount: 310000 },
  { day: 'ອັງຄານ', amount: 250000 },
  { day: 'ພຸດ', amount: 380000 },
  { day: 'ພະຫັດ', amount: 420000 },
  { day: 'ສຸກ', amount: 550000 },
  { day: 'ເສົາ', amount: 680000 },
  { day: 'ອາທິດ', amount: 450000 }
];

const DashboardHome = () => {
  const [summary, setSummary] = useState(null);
  const [recentSales, setRecentSales] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [pendingDebts, setPendingDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salesByDay, setSalesByDay] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading data from API
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        setTimeout(() => {
          setSummary(mockSummary);
          setRecentSales(mockRecentSales);
          setLowStockProducts(mockLowStockProducts);
          setPendingDebts(mockPendingDebts);
          setSalesByDay(mockSalesByDay);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("ມີຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('lo-LA', options);
  };

  const getPaymentTypeLabel = (type) => {
    switch (type) {
      case 'cash':
        return { label: 'ເງິນສົດ', color: 'success' };
      case 'transfer':
        return { label: 'ໂອນເງິນ', color: 'info' };
      case 'mixed':
        return { label: 'ປະສົມ', color: 'primary' };
      case 'credit':
        return { label: 'ຕິດໜີ້', color: 'error' };
      default:
        return { label: type, color: 'default' };
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          ກຳລັງໂຫຼດຂໍ້ມູນ...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!summary) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Typography>ບໍ່ພົບຂໍ້ມູນ</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <StoreIcon sx={{ mr: 1 }} fontSize="large" color="primary" />
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 0 }}>
          ພາບລວມຮ້ານ
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e3f2fd'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoneyIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary">
                ຍອດຂາຍທັງໝົດ
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {summary.totalSales.toLocaleString()} ກີບ
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e8f5e9'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ShoppingCartIcon color="success" fontSize="large" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="success.main">
                ຍອດຂາຍມື້ນີ້
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {summary.todaySales.toLocaleString()} ກີບ
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#ede7f6'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InventoryIcon color="secondary" fontSize="large" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="secondary.main">
                ສິນຄ້າທັງໝົດ
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {summary.totalProducts} ລາຍການ
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#fff3e0'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WarningIcon color="warning" fontSize="large" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="warning.main">
                ສິນຄ້າໃກ້ໝົດ
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {summary.lowStockProducts} ລາຍການ
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e1f5fe'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PeopleIcon color="info" fontSize="large" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="info.main">
                ລູກຄ້າທັງໝົດ
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {summary.totalCustomers} ຄົນ
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#ffebee'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccountBalanceIcon color="error" fontSize="large" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="error.main">
                ລາຍການໜີ້ຄ້າງ
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {summary.pendingDebts} ລາຍການ
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Sales Chart and Latest Activity */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                ຍອດຂາຍປະຈຳອາທິດ
              </Typography>
              <Button component={Link} to="/reports" size="small">
                ເບິ່ງລາຍງານເພີ່ມເຕີມ
              </Button>
            </Box>
            
            {/* Chart for Weekly Sales */}
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', mt: 4, px: 2 }}>
              {salesByDay.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '12%' }}>
                  <Box 
                    sx={{ 
                      width: '100%', 
                      bgcolor: 'primary.main',
                      height: `${(item.amount / 700000) * 250}px`,
                      borderRadius: '4px 4px 0 0',
                      minHeight: 20,
                      position: 'relative',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      }
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        position: 'absolute', 
                        top: -25, 
                        left: 0, 
                        width: '100%', 
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      {Math.round(item.amount / 1000)}K
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {item.day}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              ກິດຈະກຳລ່າສຸດ
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.light' }}>
                    <ShoppingCartIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="ການຂາຍໃໝ່" 
                  secondary="ທ້າວ ສົມໃຈ, 250,000 ກີບ" 
                />
                <Typography variant="caption" color="text.secondary">
                  10 ນາທີກ່ອນ
                </Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'warning.light' }}>
                    <InventoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="ນຳເຂົ້າສິນຄ້າ" 
                  secondary="ເບຍລາວ, 20 ລັງ" 
                />
                <Typography variant="caption" color="text.secondary">
                  2 ຊົ່ວໂມງກ່ອນ
                </Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'error.light' }}>
                    <AccountBalanceIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="ບັນທຶກໜີ້" 
                  secondary="ນາງ ຈັນສຸກ, ນ້ຳດື່ມ 10 ແພັກ" 
                />
                <Typography variant="caption" color="text.secondary">
                  ມື້ວານນີ້
                </Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'info.light' }}>
                    <PeopleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="ລູກຄ້າໃໝ່" 
                  secondary="ທ້າວ ສີທັດ" 
                />
                <Typography variant="caption" color="text.secondary">
                  2 ມື້ກ່ອນ
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Sales and Low Stock */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                <ReceiptIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                ການຂາຍລ່າສຸດ
              </Typography>
              <Button component={Link} to="/sales" size="small">
                ເບິ່ງທັງໝົດ
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ລະຫັດ</TableCell>
                    <TableCell>ວັນທີຂາຍ</TableCell>
                    <TableCell>ລູກຄ້າ</TableCell>
                    <TableCell align="right">ຈຳນວນເງິນ</TableCell>
                    <TableCell align="center">ການຊຳລະ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentSales.map((sale) => {
                    const paymentType = getPaymentTypeLabel(sale.payment_type);
                    
                    return (
                      <TableRow key={sale.sale_id}>
                        <TableCell>{sale.sale_id}</TableCell>
                        <TableCell>{formatDate(sale.sale_date)}</TableCell>
                        <TableCell>{sale.customer_name || 'ລູກຄ້າທົ່ວໄປ'}</TableCell>
                        <TableCell align="right">{sale.total_amount.toLocaleString()} ກີບ</TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={paymentType.label}
                            color={paymentType.color}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <Paper sx={{ p: 2 }}>
                <Typography component="h2" variant="h6" color="warning.main" gutterBottom>
                  <WarningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  ສິນຄ້າໃກ້ໝົດ
                </Typography>
                <List sx={{ width: '100%' }}>
                  {lowStockProducts.length === 0 ? (
                    <ListItem>
                      <ListItemText primary="ບໍ່ມີສິນຄ້າໃກ້ໝົດໃນຂະນະນີ້" />
                    </ListItem>
                  ) : (
                    lowStockProducts.map((product) => (
                      <ListItem key={product.product_id}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'warning.light' }}>
                            <WarningIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={product.product_name} 
                          secondary={`ຄົງເຫຼືອ ${product.qty} ${product.unit}`} 
                        />
                      </ListItem>
                    ))
                  )}
                </List>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    component={Link} 
                    to="/products/import" 
                    size="small"
                    color="warning"
                  >
                    ນຳເຂົ້າສິນຄ້າ
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item>
              <Paper sx={{ p: 2 }}>
                <Typography component="h2" variant="h6" color="error.main" gutterBottom>
                  <LocalAtmIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  ລາຍການໜີ້ຄ້າງ
                </Typography>
                <List sx={{ width: '100%' }}>
                  {pendingDebts.length === 0 ? (
                    <ListItem>
                      <ListItemText primary="ບໍ່ມີລາຍການໜີ້ຄ້າງໃນຂະນະນີ້" />
                    </ListItem>
                  ) : (
                    pendingDebts.map((debt) => (
                      <ListItem key={debt.debt_id}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'error.light' }}>
                            <AccountBalanceIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={debt.customer_name} 
                          secondary={`${debt.product_name}, ${debt.amount.toLocaleString()} ກີບ`} 
                        />
                      </ListItem>
                    ))
                  )}
                </List>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    component={Link} 
                    to="/debts" 
                    size="small"
                    color="error"
                  >
                    ເບິ່ງລາຍການໜີ້
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <TrendingUpIcon sx={{ mr: 1 }} />
          ການເຂົ້າເຖິງດ່ວນ
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <ShoppingCartIcon color="primary" fontSize="large" />
                <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                  ການຂາຍໃໝ່
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  component={Link} 
                  to="/sales/new"
                  color="primary"
                >
                  ເຂົ້າເຖິງ
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <InventoryIcon color="secondary" fontSize="large" />
                <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                  ສິນຄ້າ
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  component={Link} 
                  to="/products"
                  color="secondary"
                >
                  ເຂົ້າເຖິງ
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUpIcon color="success" fontSize="large" />
                <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                  ນຳເຂົ້າສິນຄ້າ
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  component={Link} 
                  to="/products/import"
                  color="success"
                >
                  ເຂົ້າເຖິງ
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <PeopleIcon color="info" fontSize="large" />
                <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                  ລູກຄ້າ
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  component={Link} 
                  to="/customers"
                  color="info"
                >
                  ເຂົ້າເຖິງ
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <AccountBalanceIcon color="error" fontSize="large" />
                <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                  ລາຍການໜີ້
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  component={Link} 
                  to="/debts"
                  color="error"
                >
                  ເຂົ້າເຖິງ
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingDownIcon color="warning" fontSize="large" />
                <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                  ປະຫວັດການຂາຍ
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  component={Link} 
                  to="/sales"
                  color="warning"
                >
                  ເຂົ້າເຖິງ
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardHome;