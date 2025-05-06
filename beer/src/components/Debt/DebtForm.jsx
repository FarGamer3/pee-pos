import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Autocomplete,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Divider
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Mock data - would be replaced with actual API calls
const mockCustomers = [
  { customer_id: 1, cus_name: 'ທ້າວ ສົມໃຈ', phone: '02055512345', address: 'ບ້ານສະພັງເມິກ' },
  { customer_id: 2, cus_name: 'ນາງ ຈັນສຸກ', phone: '02099987654', address: 'ບ້ານໂນນສະຫວ່າງ' },
  { customer_id: 3, cus_name: 'ທ້າວ ສີທັດ', phone: '02077745678', address: 'ບ້ານທາດຫຼວງ' }
];

const mockProducts = [
  { product_id: 1, product_name: 'ເບຍລາວ', brand: 'Beerlao', unit: 'ລັງ', qty: 50, price: 120000.00 },
  { product_id: 2, product_name: 'ນ້ຳດື່ມ', brand: 'ນ້ຳໃສ', unit: 'ແພັກ', qty: 100, price: 15000.00 },
  { product_id: 3, product_name: 'ເຂົ້າໜຽວ', brand: '', unit: 'ກິໂລ', qty: 200, price: 15000.00 },
  { product_id: 4, product_name: 'ນ້ຳມັນພືດ', brand: 'ດອກຄຳໃຫຍ່', unit: 'ຂວດ', qty: 30, price: 18000.00 }
];

// Mock data for debts
const mockDebts = [
  {
    debt_id: 1,
    customer_id: 1,
    product_id: 1,
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
    product_id: 2,
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
    product_id: 3,
    debt_date: '2025-05-04 11:30:00',
    qty: 50,
    product_price: 15000,
    return_date: null,
    return_qty: 0,
    status: 'pending',
    note: 'ຍັງບໍ່ໄດ້ສົ່ງຄືນ'
  }
];

const DebtForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const isReturnMode = isEditMode;

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    customer_id: '',
    product_id: '',
    debt_date: new Date(),
    qty: 1,
    product_price: 0,
    return_date: null,
    return_qty: 0,
    status: 'pending',
    note: ''
  });

  const [returnNow, setReturnNow] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // In a real app, these would be API calls
    setCustomers(mockCustomers);
    setProducts(mockProducts);

    if (isEditMode) {
      // In a real app, this would be an API call
      const debt = mockDebts.find(d => d.debt_id === parseInt(id));
      if (debt) {
        setFormData({
          ...debt,
          debt_date: new Date(debt.debt_date),
          return_date: debt.return_date ? new Date(debt.return_date) : null
        });
        
        const customer = mockCustomers.find(c => c.customer_id === debt.customer_id);
        setSelectedCustomer(customer);
        
        const product = mockProducts.find(p => p.product_id === debt.product_id);
        setSelectedProduct(product);
      }
    }
  }, [id, isEditMode]);

  const handleCustomerChange = (event, value) => {
    setSelectedCustomer(value);
    if (value) {
      setFormData({
        ...formData,
        customer_id: value.customer_id
      });
    } else {
      setFormData({
        ...formData,
        customer_id: ''
      });
    }
  };

  const handleProductChange = (event, value) => {
    setSelectedProduct(value);
    if (value) {
      setFormData({
        ...formData,
        product_id: value.product_id,
        product_price: value.price
      });
    } else {
      setFormData({
        ...formData,
        product_id: '',
        product_price: 0
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'qty' || name === 'return_qty' || name === 'product_price' 
        ? Number(value) 
        : value,
    });
  };

  const handleDateChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleReturnNowChange = (e) => {
    setReturnNow(e.target.checked);
    if (e.target.checked) {
      setFormData({
        ...formData,
        return_date: new Date(),
      });
    } else {
      setFormData({
        ...formData,
        return_date: null,
        return_qty: 0
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customer_id) newErrors.customer_id = 'ກະລຸນາເລືອກລູກຄ້າ';
    if (!formData.product_id) newErrors.product_id = 'ກະລຸນາເລືອກສິນຄ້າ';
    if (formData.qty <= 0) newErrors.qty = 'ຈຳນວນຕ້ອງຫຼາຍກວ່າ 0';
    if (formData.product_price <= 0) newErrors.product_price = 'ລາຄາຕ້ອງຫຼາຍກວ່າ 0';
    
    if (returnNow) {
      if (formData.return_qty <= 0) {
        newErrors.return_qty = 'ຈຳນວນສົ່ງຄືນຕ້ອງຫຼາຍກວ່າ 0';
      } else if (formData.return_qty > formData.qty) {
        newErrors.return_qty = 'ຈຳນວນສົ່ງຄືນຕ້ອງບໍ່ເກີນຈຳນວນຢືມ';
      }
    }

    if (isReturnMode && !isEditMode) {
      if (formData.return_qty < 0) {
        newErrors.return_qty = 'ຈຳນວນສົ່ງຄືນຕ້ອງບໍ່ນ້ອຍກວ່າ 0';
      } else if (formData.return_qty > formData.qty) {
        newErrors.return_qty = 'ຈຳນວນສົ່ງຄືນຕ້ອງບໍ່ເກີນຈຳນວນຢືມ';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Determine status based on return quantity
      let status = 'pending';
      if (formData.return_qty > 0) {
        status = formData.return_qty === formData.qty ? 'returned' : 'partially_returned';
      }

      const updatedFormData = {
        ...formData,
        status
      };

      // In a real app, this would be an API call to save the debt
      console.log('Submit form data:', updatedFormData);
      navigate('/debts');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalanceIcon sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1">
            {isEditMode 
              ? 'ບັນທຶກການສົ່ງຄືນ' 
              : 'ເພີ່ມລາຍການໜີ້ໃໝ່'}
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/debts')}
        >
          ກັບຄືນ
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disabled={isEditMode}
                options={customers}
                getOptionLabel={(option) => `${option.cus_name} (${option.phone})`}
                isOptionEqualToValue={(option, value) => option.customer_id === value.customer_id}
                value={selectedCustomer}
                onChange={handleCustomerChange}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    required 
                    label="ເລືອກລູກຄ້າ" 
                    error={!!errors.customer_id}
                    helperText={errors.customer_id}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disabled={isEditMode}
                options={products}
                getOptionLabel={(option) => 
                  `${option.product_name} (${option.brand ? option.brand + ', ' : ''}${option.unit})`
                }
                isOptionEqualToValue={(option, value) => option.product_id === value.product_id}
                value={selectedProduct}
                onChange={handleProductChange}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    required 
                    label="ເລືອກສິນຄ້າ" 
                    error={!!errors.product_id}
                    helperText={errors.product_id}
                  />
                )}
              />
            </Grid>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  disabled={isEditMode}
                  label="ວັນທີຢືມ"
                  value={formData.debt_date}
                  onChange={(newValue) => handleDateChange('debt_date', newValue)}
                  slotProps={{ 
                    textField: { 
                      variant: 'outlined',
                      fullWidth: true,
                      required: true
                    } 
                  }}
                />
              </Grid>
            </LocalizationProvider>
            
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                required
                disabled={isEditMode}
                type="number"
                label="ຈຳນວນ"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
                error={!!errors.qty}
                helperText={errors.qty}
                InputProps={{
                  endAdornment: selectedProduct && (
                    <InputAdornment position="end">
                      {selectedProduct.unit}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                required
                disabled={isEditMode}
                type="number"
                label="ລາຄາ"
                name="product_price"
                value={formData.product_price}
                onChange={handleChange}
                error={!!errors.product_price}
                helperText={errors.product_price}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ກີບ</InputAdornment>,
                }}
              />
            </Grid>
            
            {!isEditMode && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={returnNow}
                      onChange={handleReturnNowChange}
                    />
                  }
                  label="ບັນທຶກການສົ່ງຄືນທັນທີ"
                />
              </Grid>
            )}
            
            {(isReturnMode || returnNow) && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ຂໍ້ມູນການສົ່ງຄືນ
                    </Typography>
                  </Divider>
                </Grid>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="ວັນທີສົ່ງຄືນ"
                      value={formData.return_date}
                      onChange={(newValue) => handleDateChange('return_date', newValue)}
                      slotProps={{ 
                        textField: { 
                          variant: 'outlined',
                          fullWidth: true,
                          required: true
                        } 
                      }}
                    />
                  </Grid>
                </LocalizationProvider>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="ຈຳນວນສົ່ງຄືນ"
                    name="return_qty"
                    value={formData.return_qty}
                    onChange={handleChange}
                    error={!!errors.return_qty}
                    helperText={errors.return_qty}
                    InputProps={{
                      endAdornment: selectedProduct && (
                        <InputAdornment position="end">
                          {selectedProduct.unit}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </>
            )}
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="ໝາຍເຫດ"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  size="large"
                >
                  {isReturnMode ? 'ບັນທຶກການສົ່ງຄືນ' : 'ບັນທຶກລາຍການໜີ້'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default DebtForm;