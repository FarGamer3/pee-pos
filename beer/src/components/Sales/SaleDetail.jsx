import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Mock data
const mockSaleDetails = {
  sale: {
    sale_id: 1,
    customer_id: 1,
    customer_name: 'ທ້າວ ສົມໃຈ',
    phone: '02055512345',
    address: 'ບ້ານສະພັງເມິກ',
    sale_date: '2025-05-05 14:30:00',
    total_amount: 250000,
    cash_amount: 250000,
    transfer_amount: 0,
    payment_type: 'cash'
  },
  items: [
    {
      product_id: 1,
      product_name: 'ເບຍລາວ',
      unit: 'ລັງ',
      qty: 2,
      price: 120000,
      amount: 240000
    },
    {
      product_id: 2,
      product_name: 'ນ້ຳດື່ມ',
      unit: 'ແພັກ',
      qty: 1,
      price: 10000,
      amount: 10000
    }
  ]
};

const SaleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saleData, setSaleData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to fetch sale details
    // For demo, we use the mock data
    setSaleData(mockSaleDetails);
    setLoading(false);
  }, [id]);

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Typography>ກຳລັງໂຫຼດຂໍ້ມູນ...</Typography>
      </Box>
    );
  }

  if (!saleData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Typography>ບໍ່ພົບຂໍ້ມູນການຂາຍ</Typography>
      </Box>
    );
  }

  const { sale, items } = saleData;
  const paymentType = getPaymentTypeLabel(sale.payment_type);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          ລາຍລະອຽດການຂາຍ #{sale.sale_id}
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/sales')}
        >
          ກັບຄືນ
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ReceiptIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                ຂໍ້ມູນການຂາຍ
              </Typography>
            </Box>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  ລະຫັດການຂາຍ
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {sale.sale_id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  ວັນທີຂາຍ
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(sale.sale_date)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  ລູກຄ້າ
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {sale.customer_name || 'ລູກຄ້າທົ່ວໄປ'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  ປະເພດການຊຳລະ
                </Typography>
                <Chip 
                  label={paymentType.label}
                  color={paymentType.color}
                  size="small"
                />
              </Grid>
              {sale.phone && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    ເບີໂທລະສັບ
                  </Typography>
                  <Typography variant="body1">
                    {sale.phone}
                  </Typography>
                </Grid>
              )}
              {sale.address && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    ທີ່ຢູ່
                  </Typography>
                  <Typography variant="body1">
                    {sale.address}
                  </Typography>
                </Grid>
              )}
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 2 }}>
              ລາຍການສິນຄ້າ
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ລາຍການ</TableCell>
                    <TableCell align="center">ຈຳນວນ</TableCell>
                    <TableCell align="right">ລາຄາ</TableCell>
                    <TableCell align="right">ລວມ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.product_name}</TableCell>
                      <TableCell align="center">{item.qty} {item.unit}</TableCell>
                      <TableCell align="right">{item.price.toLocaleString()} ກີບ</TableCell>
                      <TableCell align="right">{item.amount.toLocaleString()} ກີບ</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ສະຫຼຸບການຊຳລະເງິນ
              </Typography>
              
              <Box sx={{ mt: 3, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">
                      ລວມເງິນ:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" align="right">
                      {sale.total_amount.toLocaleString()} ກີບ
                    </Typography>
                  </Grid>
                  
                  {sale.payment_type !== 'credit' && (
                    <>
                      {sale.cash_amount > 0 && (
                        <>
                          <Grid item xs={6}>
                            <Typography variant="body1">
                              ຈ່າຍເງິນສົດ:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1" align="right">
                              {sale.cash_amount.toLocaleString()} ກີບ
                            </Typography>
                          </Grid>
                        </>
                      )}
                      
                      {sale.transfer_amount > 0 && (
                        <>
                          <Grid item xs={6}>
                            <Typography variant="body1">
                              ຈ່າຍໂອນເງິນ:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1" align="right">
                              {sale.transfer_amount.toLocaleString()} ກີບ
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </>
                  )}
                  
                  {sale.payment_type === 'credit' && (
                    <>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" color="error">
                          ຍັງຄ້າງຊຳລະ:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h6" align="right" color="error">
                          {sale.total_amount.toLocaleString()} ກີບ
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<ReceiptIcon />}
                  size="large"
                >
                  ພິມໃບບິນ
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SaleDetail;