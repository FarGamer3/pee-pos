import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock data - would be replaced with actual API calls
const mockProducts = [
  { product_id: 1, product_name: 'ເບຍລາວ', brand: 'Beerlao', unit: 'ລັງ', qty: 50, price: 120000.00 },
  { product_id: 2, product_name: 'ນ້ຳດື່ມ', brand: 'ນ້ຳໃສ', unit: 'ແພັກ', qty: 100, price: 15000.00 },
  { product_id: 3, product_name: 'ເຂົ້າໜຽວ', brand: '', unit: 'ກິໂລ', qty: 200, price: 15000.00 },
  { product_id: 4, product_name: 'ນ້ຳມັນພືດ', brand: 'ດອກຄຳໃຫຍ່', unit: 'ຂວດ', qty: 30, price: 18000.00 }
];

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    product_name: '',
    brand: '',
    unit: '',
    qty: 0,
    price: 0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      // In a real app, this would be an API call
      const product = mockProducts.find(p => p.product_id === parseInt(id));
      if (product) {
        setFormData(product);
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'qty' || name === 'price' ? Number(value) : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.product_name) newErrors.product_name = 'ກະລຸນາປ້ອນຊື່ສິນຄ້າ';
    if (!formData.unit) newErrors.unit = 'ກະລຸນາປ້ອນຫົວໜ່ວຍ';
    if (formData.price <= 0) newErrors.price = 'ລາຄາຕ້ອງຫຼາຍກວ່າ 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // In a real app, this would be an API call to save the product
      console.log('Submit form data:', formData);
      navigate('/products');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          {isEditMode ? 'ແກ້ໄຂຂໍ້ມູນສິນຄ້າ' : 'ເພີ່ມສິນຄ້າໃໝ່'}
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/products')}
        >
          ກັບຄືນ
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="ຊື່ສິນຄ້າ"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                error={!!errors.product_name}
                helperText={errors.product_name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ຍີ່ຫໍ້"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="ຫົວໜ່ວຍ"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                error={!!errors.unit}
                helperText={errors.unit}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="ລາຄາ"
                name="price"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ກີບ</InputAdornment>,
                }}
              />
            </Grid>
            {isEditMode && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  disabled
                  label="ຈຳນວນຄົງເຫຼືອ"
                  name="qty"
                  value={formData.qty}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{formData.unit}</InputAdornment>,
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  size="large"
                >
                  ບັນທຶກ
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ProductForm;