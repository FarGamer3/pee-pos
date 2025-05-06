import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputAdornment
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import InventoryIcon from '@mui/icons-material/Inventory';

// Mock data - would be replaced with actual API calls
const mockProducts = [
  { product_id: 1, product_name: 'ເບຍລາວ', brand: 'Beerlao', unit: 'ລັງ', qty: 50, price: 120000.00 },
  { product_id: 2, product_name: 'ນ້ຳດື່ມ', brand: 'ນ້ຳໃສ', unit: 'ແພັກ', qty: 100, price: 15000.00 },
  { product_id: 3, product_name: 'ເຂົ້າໜຽວ', brand: '', unit: 'ກິໂລ', qty: 200, price: 15000.00 },
  { product_id: 4, product_name: 'ນ້ຳມັນພືດ', brand: 'ດອກຄຳໃຫຍ່', unit: 'ຂວດ', qty: 30, price: 18000.00 }
];

const Import = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
  const [formData, setFormData] = useState({
    product_id: '',
    qty: 1,
    total_cost: 0,
    supplier: ''
  });

  const [errors, setErrors] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(mockProducts);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'product_id' || name === 'qty' || name === 'total_cost' ? Number(value) : value,
    });

    if (name === 'product_id') {
      const product = products.find(p => p.product_id === Number(value));
      setSelectedProduct(product);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.product_id) newErrors.product_id = 'ກະລຸນາເລືອກສິນຄ້າ';
    if (formData.qty <= 0) newErrors.qty = 'ຈຳນວນຕ້ອງຫຼາຍກວ່າ 0';
    if (formData.total_cost <= 0) newErrors.total_cost = 'ມູນຄ່າຕ້ອງຫຼາຍກວ່າ 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // In a real app, this would be an API call to save the import
      console.log('Import data:', formData);
      navigate('/products');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <InventoryIcon sx={{ mr: 1 }} />
        <Typography variant="h5" component="h1">
          ນຳເຂົ້າສິນຄ້າ
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                select
                label="ເລືອກສິນຄ້າ"
                name="product_id"
                value={formData.product_id}
                onChange={handleChange}
                error={!!errors.product_id}
                helperText={errors.product_id}
              >
                <MenuItem value="">
                  <em>ເລືອກສິນຄ້າ</em>
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.product_id} value={product.product_id}>
                    {product.product_name} ({product.brand ? `${product.brand}, ` : ''}{product.unit})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            {selectedProduct && (
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ຂໍ້ມູນສິນຄ້າປັດຈຸບັນ
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6} md={3}>
                      <Typography variant="body2" color="text.secondary">
                        ລາຄາຂາຍ:
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedProduct.price.toLocaleString()} ກີບ
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="body2" color="text.secondary">
                        ຈຳນວນຄົງເຫຼືອ:
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedProduct.qty} {selectedProduct.unit}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="ຈຳນວນນຳເຂົ້າ"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
                error={!!errors.qty}
                helperText={errors.qty}
                InputProps={{
                  endAdornment: selectedProduct && (
                    <InputAdornment position="end">{selectedProduct.unit}</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="ມູນຄ່ານຳເຂົ້າ"
                name="total_cost"
                value={formData.total_cost}
                onChange={handleChange}
                error={!!errors.total_cost}
                helperText={errors.total_cost}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ກີບ</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ຜູ້ສະໜອງ"
                name="supplier"
                value={formData.supplier}
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
                  ບັນທຶກການນຳເຂົ້າ
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Import;