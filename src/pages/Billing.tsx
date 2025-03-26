import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  useTheme,
  alpha,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Add as AddIcon,
  AccountBalanceWallet as WalletIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

// Mock data for demonstration
const usageData = [
  { date: '2024-01', minutes: 120 },
  { date: '2024-02', minutes: 145 },
  { date: '2024-03', minutes: 180 },
  { date: '2024-04', minutes: 160 },
  { date: '2024-05', minutes: 200 },
  { date: '2024-06', minutes: 220 },
];

const paymentHistory = [
  {
    id: 1,
    date: '2024-06-15',
    purchaseId: 'PUR-001',
    amount: 50.00,
    minutes: 1000,
  },
  {
    id: 2,
    date: '2024-05-15',
    purchaseId: 'PUR-002',
    amount: 25.00,
    minutes: 500,
  },
];

// Rate: $0.05 per minute (20 minutes per dollar)
const RATE_PER_MINUTE = 0.05;

export const Billing: React.FC = () => {
  const theme = useTheme();
  const [openAddCard, setOpenAddCard] = useState(false);
  const [openBuyMinutes, setOpenBuyMinutes] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [amount, setAmount] = useState('');
  const [calculatedMinutes, setCalculatedMinutes] = useState(0);

  useEffect(() => {
    const dollarAmount = parseFloat(amount) || 0;
    const minutes = Math.floor(dollarAmount / RATE_PER_MINUTE);
    setCalculatedMinutes(minutes);
  }, [amount]);

  const handleAddCard = () => {
    // TODO: Implement card addition
    console.log('Adding card...');
    setOpenAddCard(false);
  };

  const handleBuyMinutes = () => {
    // TODO: Implement minutes purchase
    console.log('Buying minutes...', { amount, minutes: calculatedMinutes });
    setOpenBuyMinutes(false);
    setAmount('');
  };

  const totalMinutes = usageData.reduce((sum, data) => sum + data.minutes, 0);
  const remainingMinutes = 1000 - totalMinutes; // Assuming 1000 free minutes
  const usagePercentage = (totalMinutes / 1000) * 100;

  return (
    <Box>
      {/* <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 600,
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 4
      }}>
        Billing & Usage
      </Typography> */}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
            backdropFilter: 'blur(20px)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <WalletIcon sx={{ fontSize: 28, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Usage
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Free Minutes Remaining
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight="medium">
                    {remainingMinutes} / 1000
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={usagePercentage}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    }
                  }}
                />
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenBuyMinutes(true)}
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: 'white',
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  }
                }}
              >
                Buy More Minutes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardIcon sx={{ fontSize: 28, color: 'secondary.main', mr: 2 }} />
                  <Typography variant="h6">
                    Payment Methods
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<CreditCardIcon />}
                  onClick={() => setOpenAddCard(true)}
                  sx={{
                    borderColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                    '&:hover': {
                      borderColor: theme.palette.secondary.dark,
                      backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                    }
                  }}
                >
                  Add Card
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ 
                p: 3, 
                textAlign: 'center',
                bgcolor: alpha(theme.palette.secondary.main, 0.05),
                borderRadius: 2
              }}>
                No payment methods added yet.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ReceiptIcon sx={{ fontSize: 28, color: 'tertiary.main', mr: 2 }} />
                <Typography variant="h6">
                  Payment History
                </Typography>
              </Box>
              <TableContainer component={Paper} variant="outlined" sx={{ 
                borderRadius: 2,
                '& .MuiTableCell-root': {
                  borderColor: alpha(theme.palette.divider, 0.1),
                },
              }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Purchase ID</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Minutes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow key={payment.id} sx={{
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                        }
                      }}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.purchaseId}</TableCell>
                        <TableCell align="right" sx={{ color: 'primary.main', fontWeight: 500 }}>
                          ${payment.amount.toFixed(2)}
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'secondary.main', fontWeight: 500 }}>
                          {payment.minutes}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Card Dialog */}
      <Dialog 
        open={openAddCard} 
        onClose={() => setOpenAddCard(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          pb: 2
        }}>
          Add Payment Method
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
        <TextField
            fullWidth
            label="Cardholder Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            margin="normal"
            placeholder="Name on Card"
          />
          <TextField
            fullWidth
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Expiry Date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            margin="normal"
            placeholder="MM/YY"
          />
          <TextField
            fullWidth
            label="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            margin="normal"
            type="password"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Button 
            onClick={() => setOpenAddCard(false)}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddCard} 
            variant="contained"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              }
            }}
          >
            Add Card
          </Button>
        </DialogActions>
      </Dialog>

      {/* Buy Minutes Dialog */}
      <Dialog 
        open={openBuyMinutes} 
        onClose={() => setOpenBuyMinutes(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          pb: 2
        }}>
          Buy More Minutes
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ mb: 3, p: 2, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Rate: ${RATE_PER_MINUTE.toFixed(2)} per minute
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <Box sx={{ 
            mt: 3,
            p: 2,
            bgcolor: alpha(theme.palette.success.main, 0.05),
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="body2" color="text.secondary">
              You will receive:
            </Typography>
            <Typography variant="h6" color="success.main" fontWeight="medium">
              {calculatedMinutes} minutes
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Button 
            onClick={() => {
              setOpenBuyMinutes(false);
              setAmount('');
            }}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBuyMinutes} 
            variant="contained"
            disabled={!amount || parseFloat(amount) <= 0}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              }
            }}
          >
            Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 