// App.js - Main application component
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Layout/Dashboard';
import DashboardHome from './components/Dashboard/DashboardHome';
import ProductList from './components/Products/ProductList';
import ProductForm from './components/Products/ProductForm';
import Import from './components/Products/Import';
import NewSale from './components/Sales/NewSale';
import SalesList from './components/Sales/SalesList';
import SaleDetail from './components/Sales/SaleDetail';
import CustomerList from './components/Customers/CustomerList';
import CustomerForm from './components/Customers/CustomerForm';
import DebtList from './components/Debt/DebtList';
import DebtForm from './components/Debt/DebtForm';

// Create a theme with Lao language support
const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans Lao", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="sales">
              <Route index element={<SalesList />} />
              <Route path="new" element={<NewSale />} />
              <Route path=":id" element={<SaleDetail />} />
            </Route>
            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path="new" element={<ProductForm />} />
              <Route path="edit/:id" element={<ProductForm />} />
              <Route path="import" element={<Import />} />
            </Route>
            <Route path="customers">
              <Route index element={<CustomerList />} />
              <Route path="new" element={<CustomerForm />} />
              <Route path="edit/:id" element={<CustomerForm />} />
            </Route>
            <Route path="debts">
              <Route index element={<DebtList />} />
              <Route path="new" element={<DebtForm />} />
              <Route path="edit/:id" element={<DebtForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;