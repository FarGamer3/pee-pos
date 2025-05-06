import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputAdornment,
  Card,
  CardContent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SaveIcon from '@mui/icons-material/Save';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Mock data - would be replaced with actual API calls
const mockProducts = [
  { product_id: 1, product_name: 'ເບຍລາວ', brand: 'Beerlao', unit: 'ລັງ', qty: 50, price: 120000.00 },
  { product_id: 2, product_name: 'ນ້ຳດື່ມ', brand: 'ນ້ຳໃສ', unit: 'ແພັກ', qty: 100, price: 15000.00 },
  { product_id: 3, product_name: 'ເຂົ້າໜຽວ', brand: '', unit: 'ກິໂລ', qty: 200, price: 15000.00 },
  { product_id: 4, product_name: 'ນ້ຳມັນພືດ', brand: 'ດອກຄຳໃຫຍ່', unit: 'ຂວດ', qty: 30, price: 18000.00 }
];

const mockCustomers = [
  { customer_id: 1, cus_name: 'ທ້າວ ສົມໃຈ', phone: '02055512345', address: 'ບ້ານສະພັງເມິກ' },
  { customer_id: 2, cus_name: 'ນາງ ຈັນສຸກ', phone: '02099987654', address: 'ບ້ານໂນນສະຫວ່າງ' },
  { customer_id: 3, cus_name: 'ທ້າວ ສີທັດ', phone: '02077745678', address: 'ບ້ານທາດຫຼວງ' }
];

const NewSale = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cashAmount, setCashAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);

  useEffect(() => {
    // In a real app, these would be API calls
    setProducts(mockProducts);
    setCustomers(mockCustomers);
  }, []);

  const handleAddToCart = () => {
    if (!selectedProduct || quantity <= 0) return;

    const existingItemIndex = cartItems.findIndex(
      (item) => item.product_id === selectedProduct.product_id
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...cartItems];
      const newQty = updatedItems[existingItemIndex].qty + quantity;
      
      // Check if enough stock
      if (newQty > selectedProduct.qty) {
        alert(`ບໍ່ມີສິນຄ້າພຽງພໍ. ມີສິນຄ້າຄົງເຫຼືອ ${selectedProduct.qty} ${selectedProduct.unit}`);
        return;
      }
      
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        qty: newQty,
        amount: newQty * selectedProduct.price
      };
      
      setCartItems(updatedItems);
    } else {
      // Add new item
      // Check if enough stock
      if (quantity > selectedProduct.qty) {
        alert(`ບໍ່ມີສິນຄ້າພຽງພໍ. ມີສິນຄ້າຄົງເຫຼືອ ${selectedProduct.qty} ${selectedProduct.unit}`);
        return;
      }
      
      const newItem = {
        product_id: selectedProduct.product_id,
        product_name: selectedProduct.product_name,
        unit: selectedProduct.unit,
        qty: quantity,
        price: selectedProduct.price,
        amount: quantity * selectedProduct.price
      };
      
      setCartItems([...cartItems, newItem]);
    }

    // Reset selection
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleRemoveFromCart = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };

  const handleChangeQuantity = (index, change) => {
    const updatedItems = [...cartItems];
    const newQty = updatedItems[index].qty + change;
    
    // Don't allow quantity less than 1
    if (newQty < 1) return;
    
    // Check product stock
    const product = products.find(p => p.product_id === updatedItems[index].product_id);
    if (newQty > product.qty) {
      alert(`ບໍ່ມີສິນຄ້າພຽງພໍ. ມີສິນຄ້າຄົງເຫຼືອ ${product.qty} ${product.unit}`);
      return;
    }
    
    updatedItems[index] = {
      ...updatedItems[index],
      qty: newQty,
      amount: newQty * updatedItems[index].price
    };
    
    setCartItems(updatedItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.amount, 0);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    
    // Reset amounts when changing payment method
    if (event.target.value === 'cash') {
      setTransferAmount(0);
      setCashAmount(calculateTotal());
    } else if (event.target.value === 'transfer') {
      setCashAmount(0);
      setTransferAmount(calculateTotal());
    } else if (event.target.value === 'credit') {
      setCashAmount(0);
      setTransferAmount(0);
    }
  };

  const handleFinishSale = () => {
    if (cartItems.length === 0) {
      alert('ກະລຸນາເພີ່ມສິນຄ້າໃນລາຍການກ່ອນ');
      return;
    }
    
    const totalAmount = calculateTotal();
    
    // For credit sales, customer is required
    if (paymentMethod === 'credit' && !selectedCustomer) {
      alert('ກະລຸນາເລືອກລູກຄ້າສຳລັບການຂາຍແບບຕິດໜີ້');
      return;
    }
    
    // Check if payment amounts match total for cash or transfer
    if (paymentMethod !== 'credit') {
      const paidAmount = cashAmount + transferAmount;
      if (paidAmount < totalAmount) {
        alert('ຈຳນວນເງິນທີ່ຊຳລະບໍ່ພຽງພໍ');
        return;
      }
    }
    
    // Create sale object
    const sale = {
      customer_id: selectedCustomer ? selectedCustomer.customer_id : null,
      total_amount: totalAmount,
      cash_amount: cashAmount,
      transfer_amount: transferAmount,
      payment_type: paymentMethod,
      items: cartItems
    };
    
    console.log('Sale completed:', sale);
    
    // In a real app, this would be an API call to save the sale
    // After successful save, redirect to sales list
    navigate('/sales');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ShoppingCartIcon sx={{ mr: 1 }} />
        <Typography variant="h5" component="h1">
          ການຂາຍໃໝ່
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ເລືອກສິນຄ້າ
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  options={products}
                  getOptionLabel={(option) => 
                    `${option.product_name} (${option.brand ? option.brand + ', ' : ''}${option.unit})`
                  }
                  isOptionEqualToValue={(option, value) => option.product_id === value.product_id}
                  value={selectedProduct}
                  onChange={(event, newValue) => {
                    setSelectedProduct(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="ຄົ້ນຫາສິນຄ້າ" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="ຈຳນວນ"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  InputProps={{
                    endAdornment: selectedProduct && (
                      <InputAdornment position="end">
                        {selectedProduct.unit}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                {selectedProduct && (
                  <TextField
                    fullWidth
                    disabled
                    label="ຄົງເຫຼືອ"
                    value={selectedProduct.qty}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {selectedProduct.unit}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddToCart}
                  disabled={!selectedProduct}
                >
                  ເພີ່ມລາຍການ
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ mb: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ລາຍການ</TableCell>
                    <TableCell align="center">ຈຳນວນ</TableCell>
                    <TableCell align="right">ລາຄາ</TableCell>
                    <TableCell align="right">ລວມ</TableCell>
                    <TableCell align="center">ຈັດການ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        ຍັງບໍ່ມີລາຍການສິນຄ້າ
                      </TableCell>
                    </TableRow>
                  ) : (
                    cartItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleChangeQuantity(index, -1)}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ mx: 1 }}>
                              {item.qty} {item.unit}
                            </Typography>
                            <IconButton 
                              size="small" 
                              onClick={() => handleChangeQuantity(index, 1)}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{item.price.toLocaleString()}</TableCell>
                        <TableCell align="right">{item.amount.toLocaleString()}</TableCell>
                        <TableCell align="center">
                          <IconButton 
                            color="error" 
                            size="small" 
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ຂໍ້ມູນລູກຄ້າ (ສຳລັບການຂາຍເຊື່ອ)
            </Typography>
            
            <Autocomplete
              options={customers}
              getOptionLabel={(option) => `${option.cus_name} (${option.phone})`}
              isOptionEqualToValue={(option, value) => option.customer_id === value.customer_id}
              value={selectedCustomer}
              onChange={(event, newValue) => {
                setSelectedCustomer(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="ເລືອກລູກຄ້າ" fullWidth />
              )}
            />
            
            {selectedCustomer && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  ເບີໂທ: {selectedCustomer.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ທີ່ຢູ່: {selectedCustomer.address}
                </Typography>
              </Box>
            )}
          </Paper>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ການຊຳລະເງິນ
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <RadioGroup
                  name="payment-method"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <FormControlLabel 
                    value="cash" 
                    control={<Radio />} 
                    label="ຈ່າຍເງິນສົດ" 
                  />
                  <FormControlLabel 
                    value="transfer" 
                    control={<Radio />} 
                    label="ໂອນເງິນ" 
                  />
                  <FormControlLabel 
                    value="mixed" 
                    control={<Radio />} 
                    label="ຈ່າຍແບບປະສົມ" 
                  />
                  <FormControlLabel 
                    value="credit" 
                    control={<Radio />} 
                    label="ຕິດໜີ້" 
                  />
                </RadioGroup>
              </FormControl>
              
              {(paymentMethod === 'cash' || paymentMethod === 'mixed') && (
                <TextField
                  fullWidth
                  label="ຈຳນວນເງິນສົດ"
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(parseFloat(e.target.value) || 0)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ກີບ</InputAdornment>,
                  }}
                />
              )}
              
              {(paymentMethod === 'transfer' || paymentMethod === 'mixed') && (
                <TextField
                  fullWidth
                  label="ຈຳນວນເງິນໂອນ"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(parseFloat(e.target.value) || 0)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ກີບ</InputAdornment>,
                  }}
                />
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    ລວມເງິນ:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="right">
                    {calculateTotal().toLocaleString()} ກີບ
                  </Typography>
                </Grid>
                
                {paymentMethod !== 'credit' && (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">
                        ຈ່າຍແລ້ວ:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" align="right" color="primary">
                        {(cashAmount + transferAmount).toLocaleString()} ກີບ
                      </Typography>
                    </Grid>
                    
                    {(cashAmount + transferAmount) > calculateTotal() && (
                      <>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            ເງິນທອນ:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" align="right" color="secondary">
                            {(cashAmount + transferAmount - calculateTotal()).toLocaleString()} ກີບ
                          </Typography>
                        </Grid>
                      </>
                    )}
                  </>
                )}
                
                {paymentMethod === 'credit' && (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">
                        ຕິດໜີ້:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" align="right" color="error">
                        {calculateTotal().toLocaleString()} ກີບ
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
              
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ReceiptIcon />}
                onClick={handleFinishSale}
                sx={{ mt: 3 }}
                disabled={cartItems.length === 0}
              >
                ສຳເລັດການຂາຍ
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewSale;