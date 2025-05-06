import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/Layout';

// ນຳເຂົ້າໜ້າຕ່າງໆ (Pages)
// ຕົວຢ່າງການນຳເຂົ້າໜ້າຕ່າງໆ (ທ່ານສາມາດປ່ຽນແປງໂຕນຳເຂົ້າຕາມໂຄງສ້າງໂຄງການຂອງທ່ານ)
/*
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import ManageData from './pages/ManageData';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
*/
// ສ້າງ theme ຂອງແອັບ
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // ສີຫຼັກ - ທ່ານສາມາດປັບປ່ຽນໄດ້
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057', // ສີຮອງ - ທ່ານສາມາດປັບປ່ຽນໄດ້
    },
    background: {
      default: '#f5f5f5', // ສີພື້ນຫຼັງ - ທ່ານສາມາດປັບປ່ຽນໄດ້
    },
  },
  typography: {
    fontFamily: [
      'Noto Sans Lao',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// ສ່ວນປະກອບສຳລັບຫນ້າທີ່ບໍ່ພົບ
function NotFound() {
  return (
    <Layout title="ບໍ່ພົບຫນ້າ">
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <h2>404 - ບໍ່ພົບຫນ້າທີ່ຕ້ອງການ</h2>
        <p>ຫນ້າທີ່ທ່ານຄົ້ນຫາບໍ່ພົບໃນລະບົບ</p>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* ຣີເຊັດ CSS ເລີ່ມຕົ້ນ */}
      <Router>
        <Routes>
          {/* ຫນ້າຕ່າງໆໃນລະບົບ */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/manage-data" element={<ManageData />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
          
          {/* ເມື່ອເຂົ້າທີ່ URL "/" ໃຫ້ນຳທາງໄປຫນ້າ Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* ຫນ້າ 404 ສຳລັບ URL ທີ່ບໍ່ພົບ */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;