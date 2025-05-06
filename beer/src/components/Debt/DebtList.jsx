import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Mock data for debts
const mockDebts = [
  {
    debt_id: 1,
    customer_id: 1,
    customer_name: 'ທ້າວ ສົມໃຈ',
    product_id: 1,
    product_name: 'ເບຍລາວ',
    unit: 'ລັງ',
    debt_date: '2025-05-01 10:15:00',
    qty: 10,
    product_price: 120000,
    return_date: '2025-05-05 14:30:00',
    return_qty: 10,
    status: 'returned',
    note: 'ຊຳລະແລ້ວ'
  },
  {
    debt_id: 2,
    customer_id: 2,
    customer_name: 'ນາງ ຈັນສຸກ',
    product_id: 2,
    product_name: 'ນ້ຳດື່ມ',
    unit: 'ແພັກ',
    debt_date: '2025-05-03 16:45:00',
    qty: 20,
    product_price: 15000,
    return_date: '2025-05-04 09:10:00',
    return_qty: 10,
    status: 'partially_returned',
    note: 'ສົ່ງຄືນບາງສ່ວນ'
  },
  {
    debt_id: 3,
    customer_id: 3,
    customer_name: 'ທ້າວ ສີທັດ',
    product_id: 3,
    product_name: 'ເຂົ້າໜຽວ',
    unit: 'ກິໂລ',
    debt_date: '2025-05-04 11:30:00',
    qty: 50,
    product_price: 15000,
    return_date: null,
    return_qty: 0,
    status: 'pending',
    note: 'ຍັງບໍ່ໄດ້ສົ່ງຄືນ'
  }
];

const DebtList = () => {
  const [debts, setDebts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    setDebts(mockDebts);
  }, []);

  const filteredDebts = debts.filter(debt => {
    const matchesSearch = 
      searchTerm === '' || 
      debt.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debt.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = 
      !dateFilter || 
      new Date(debt.debt_date).toDateString() === dateFilter.toDateString();
    
    const matchesStatus = 
      statusFilter === '' || 
      debt.status === statusFilter;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  const getStatusLabel = (status) => {
    switch (status) {
      case 'returned':
        return { label: 'ສົ່ງຄືນແລ້ວ', color: 'success' };
      case 'partially_returned':
        return { label: 'ສົ່ງຄືນບາງສ່ວນ', color: 'warning' };
      case 'pending':
        return { label: 'ຍັງບໍ່ໄດ້ສົ່ງຄືນ', color: 'error' };
      default:
        return { label: status, color: 'default' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('lo-LA', options);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalanceIcon sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1">
            ລາຍການໜີ້
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          component={Link} 
          to="/debts/new"
          startIcon={<AddIcon />}
        >
          ເພີ່ມລາຍການໜີ້
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          sx={{ flexGrow: 1, minWidth: '200px' }}
          variant="outlined"
          placeholder="ຄົ້ນຫາຕາມຊື່ລູກຄ້າຫຼືສິນຄ້າ..."
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
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">ສະຖານະ</InputLabel>
          <Select
            labelId="status-filter-label"
            label="ສະຖານະ"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">ທັງໝົດ</MenuItem>
            <MenuItem value="returned">ສົ່ງຄືນແລ້ວ</MenuItem>
            <MenuItem value="partially_returned">ສົ່ງຄືນບາງສ່ວນ</MenuItem>
            <MenuItem value="pending">ຍັງບໍ່ໄດ້ສົ່ງຄືນ</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ລະຫັດ</TableCell>
              <TableCell>ລູກຄ້າ</TableCell>
              <TableCell>ສິນຄ້າ</TableCell>
              <TableCell align="center">ວັນທີຢືມ</TableCell>
              <TableCell align="right">ຈຳນວນຢືມ</TableCell>
              <TableCell align="center">ວັນທີສົ່ງຄືນ</TableCell>
              <TableCell align="right">ຈຳນວນສົ່ງຄືນ</TableCell>
              <TableCell align="center">ສະຖານະ</TableCell>
              <TableCell align="center">ຈັດການ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDebts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  ບໍ່ພົບຂໍ້ມູນລາຍການໜີ້
                </TableCell>
              </TableRow>
            ) : (
              filteredDebts.map((debt) => {
                const status = getStatusLabel(debt.status);
                const totalAmount = debt.qty * debt.product_price;
                
                return (
                  <TableRow key={debt.debt_id}>
                    <TableCell>{debt.debt_id}</TableCell>
                    <TableCell>{debt.customer_name}</TableCell>
                    <TableCell>{debt.product_name}</TableCell>
                    <TableCell align="center">{formatDate(debt.debt_date)}</TableCell>
                    <TableCell align="right">{debt.qty} {debt.unit}</TableCell>
                    <TableCell align="center">{formatDate(debt.return_date)}</TableCell>
                    <TableCell align="right">{debt.return_qty} {debt.unit}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={status.label}
                        color={status.color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        component={Link} 
                        to={`/debts/edit/${debt.debt_id}`}
                        color="primary"
                      >
                        <EditIcon />
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

export default DebtList;