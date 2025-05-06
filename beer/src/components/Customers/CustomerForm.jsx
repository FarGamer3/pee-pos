import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';

// Mock data - would be replaced with actual API calls
const mockCustomers = [
  { customer_id: 1, cus_name: 'ທ້າວ ສົມໃຈ', phone: '02055512345', address: 'ບ້ານສະພັງເມິກ' },
  { customer_id: 2, cus_name: 'ນາງ ຈັນສຸກ', phone: '02099987654', address: 'ບ້ານໂນນສະຫວ່າງ' },
  { customer_id: 3, cus_name: 'ທ້າວ ສີທັດ', phone: '02077745678', address: 'ບ້ານທາດຫຼວງ' }
];

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    cus_name: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      // In a real app, this would be an API call
      const customer = mockCustomers.find(c => c.customer_id === parseInt(id));
      if (customer) {
        setFormData(customer);
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.cus_name) newErrors.cus_name = 'ກະລຸນາປ້ອນຊື່ລູກຄ້າ';
    if (!formData.phone) newErrors.phone = 'ກະລຸນາປ້ອນເບີໂທລະສັບ';
    else if (!/^\d+$/.test(formData.phone)) newErrors.phone = 'ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // In a real app, this would be an API call to save the customer
      console.log('Submit form data:', formData);
      navigate('/customers');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1">
            {isEditMode ? 'ແກ້ໄຂຂໍ້ມູນລູກຄ້າ' : 'ເພີ່ມລູກຄ້າໃໝ່'}
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/customers')}
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
                label="ຊື່ລູກຄ້າ"
                name="cus_name"
                value={formData.cus_name}
                onChange={handleChange}
                error={!!errors.cus_name}
                helperText={errors.cus_name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="ເບີໂທລະສັບ"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ທີ່ຢູ່"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
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

export default CustomerForm;