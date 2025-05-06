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
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

// Mock data - would be replaced with actual API calls
const mockCustomers = [
  { customer_id: 1, cus_name: 'ທ້າວ ສົມໃຈ', phone: '02055512345', address: 'ບ້ານສະພັງເມິກ' },
  { customer_id: 2, cus_name: 'ນາງ ຈັນສຸກ', phone: '02099987654', address: 'ບ້ານໂນນສະຫວ່າງ' },
  { customer_id: 3, cus_name: 'ທ້າວ ສີທັດ', phone: '02077745678', address: 'ບ້ານທາດຫຼວງ' }
];

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    setCustomers(mockCustomers);
  }, []);

  const filteredCustomers = customers.filter(customer => 
    customer.cus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    (customer.address && customer.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          ລາຍການລູກຄ້າ
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/customers/new"
          startIcon={<AddIcon />}
        >
          ເພີ່ມລູກຄ້າໃໝ່
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="ຄົ້ນຫາລູກຄ້າ..."
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
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ລະຫັດ</TableCell>
              <TableCell>ຊື່ລູກຄ້າ</TableCell>
              <TableCell>ເບີໂທ</TableCell>
              <TableCell>ທີ່ຢູ່</TableCell>
              <TableCell align="right">ຈັດການ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  ບໍ່ພົບຂໍ້ມູນລູກຄ້າ
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.customer_id}>
                  <TableCell>{customer.customer_id}</TableCell>
                  <TableCell>{customer.cus_name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address || '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      component={Link} 
                      to={`/customers/edit/${customer.customer_id}`}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerList;
