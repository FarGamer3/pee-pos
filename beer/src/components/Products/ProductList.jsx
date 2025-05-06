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
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

// Mock data - would be replaced with actual API calls
const mockProducts = [
  { product_id: 1, product_name: 'ເບຍລາວ', brand: 'Beerlao', unit: 'ລັງ', qty: 50, price: 120000.00 },
  { product_id: 2, product_name: 'ນ້ຳດື່ມ', brand: 'ນ້ຳໃສ', unit: 'ແພັກ', qty: 100, price: 15000.00 },
  { product_id: 3, product_name: 'ເຂົ້າໜຽວ', brand: '', unit: 'ກິໂລ', qty: 200, price: 15000.00 },
  { product_id: 4, product_name: 'ນ້ຳມັນພືດ', brand: 'ດອກຄຳໃຫຍ່', unit: 'ຂວດ', qty: 30, price: 18000.00 }
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => 
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          ລາຍການສິນຄ້າ
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/products/new"
          startIcon={<AddIcon />}
        >
          ເພີ່ມສິນຄ້າໃໝ່
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="ຄົ້ນຫາສິນຄ້າ..."
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
              <TableCell>ຊື່ສິນຄ້າ</TableCell>
              <TableCell>ຍີ່ຫໍ້</TableCell>
              <TableCell>ຫົວໜ່ວຍ</TableCell>
              <TableCell align="right">ຈຳນວນຄົງເຫຼືອ</TableCell>
              <TableCell align="right">ລາຄາ</TableCell>
              <TableCell align="right">ຈັດການ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.product_id}>
                <TableCell>{product.product_id}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.brand || '-'}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell align="right">
                  <Chip 
                    label={`${product.qty} ${product.unit}`}
                    color={product.qty < 10 ? "error" : "success"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">{product.price.toLocaleString()} ກີບ</TableCell>
                <TableCell align="right">
                  <IconButton 
                    component={Link} 
                    to={`/products/edit/${product.product_id}`}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;