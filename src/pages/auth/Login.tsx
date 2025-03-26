import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  useTheme,
  alpha,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: !formData.email ? 'Email is required' : !validateEmail(formData.email) ? 'Invalid email format' : '',
      password: !formData.password ? 'Password is required' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setLoading(true);
    try {
      // Test credentials check
      if (formData.email === 'root@gmail.com' && formData.password === '12345678') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Set authentication state to true
        localStorage.setItem('isAuthenticated', 'true');
        // Force a window reload to update authentication state
        window.location.href = '/';
      } else {
        setErrors({
          email: 'Invalid credentials',
          password: 'Invalid credentials',
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Card
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 480,
          borderRadius: 3,
          boxShadow: theme.shadows[8],
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome Back
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange('password')}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
          />

          <Box sx={{ mb: 3, textAlign: 'right' }}>
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={() => navigate('/forgot-password')}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              ...(loading && {
                bgcolor: alpha(theme.palette.primary.main, 0.7),
              }),
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: 'text.secondary' }}
          >
            Test credentials: root@gmail.com / 12345678
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Don't have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => navigate('/signup')}
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </Box>
  );
}; 