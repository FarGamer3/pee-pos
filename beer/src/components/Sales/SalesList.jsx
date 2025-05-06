import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Mock data for sales
const mockSales = [
  {
    sale_id: 1,
    customer_id: 1,
    customer_name: 'ທ້າວ ສົມໃຈ',
    sale_date: '2025-05-05 14:30:00',
    total_amount: 250000,
    cash_amount: 250000,
    transfer_amount: 0,
    payment_type: 'cash'
  },
  {
    sale_id: 2,
    customer_id: 2,
    customer_name: 'ນາງ ຈັນສຸກ',
    sale_date: '2025-05-05 16:45:00',
    total_amount: 360000,
    cash_amount: 0,
    transfer_amount: 360000,
    payment_type: 'transfer'
  },
  {
    sale_id: 3,
    customer_id: 3,
    customer_name: 'ທ້າວ ສີທັດ',
    sale_date: '2025-05-04 10:15:00',
    total_amount: 180000,
    cash_amount: 0,
    transfer_amount: 0,
    payment_type: 'credit'
  }
];

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    setSales(mockSales);
  }, []);

  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      searchTerm === '' || 
      sale.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.sale_id.toString().includes(searchTerm);
    
    const matchesDate = 
      !dateFilter || 
      new Date(sale.sale_date).toDateString() === dateFilter.toDateString();
    
    return matchesSearch && matchesDate;
  });

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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          ປະຫວັດການຂາຍ
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/sales/new"
          startIcon={<AddIcon />}
        >
          ການຂາຍໃໝ່
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          sx={{ flexGrow: 1 }}
          variant="outlined"
          placeholder="ຄົ້ນຫາຕາມລະຫັດຫຼືຊື່ລູກຄ້າ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="ກັ່ນຕອງຕາມວັນທີ"
            value={dateFilter}
            onChange={(newValue) => {
              setDateFilter(newValue);
            }}
            slotProps={{ textField: { variant: 'outlined' } }}
          />
        </LocalizationProvider>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ລະຫັດ</TableCell>
              <TableCell>ວັນທີຂາຍ</TableCell>
              <TableCell>ລູກຄ້າ</TableCell>
              <TableCell align="right">ຈຳນວນເງິນ</TableCell>
              <TableCell align="center">ປະເພດການຊຳລະ</TableCell>
              <TableCell align="center">ລາຍລະອຽດ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  ບໍ່ພົບຂໍ້ມູນການຂາຍ
                </TableCell>
              </TableRow>
            ) : (
              filteredSales.map((sale) => {
                const paymentType = getPaymentTypeLabel(sale.payment_type);
                
                return (
                  <TableRow key={sale.sale_id}>
                    <TableCell>{sale.sale_id}</TableCell>
                    <TableCell>{formatDate(sale.sale_date)}</TableCell>
                    <TableCell>
                      {sale.customer_name || 'ລູກຄ້າທົ່ວໄປ'}
                    </TableCell>
                    <TableCell align="right">{sale.total_amount.toLocaleString()} ກີບ</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={paymentType.label}
                        color={paymentType.color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        component={Link} 
                        to={`/sales/${sale.sale_id}`}
                        color="primary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesList;