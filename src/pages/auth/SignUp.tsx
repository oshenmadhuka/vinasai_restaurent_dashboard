import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  LinearProgress,
  InputAdornment,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const passwordStrengthLevels = [
  { label: 'Weak', color: '#f44336' },
  { label: 'Fair', color: '#ff9800' },
  { label: 'Good', color: '#2196f3' },
  { label: 'Strong', color: '#4caf50' },
];

export const SignUp: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear errors when user types
    setErrors((prev) => ({ ...prev, [field]: '' }));

    // Validate confirm password when either password changes
    if (field === 'password' || field === 'confirmPassword') {
      if (field === 'confirmPassword' && value !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else if (field === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      fullName: !formData.fullName ? 'Full name is required' : '',
      email: !formData.email ? 'Email is required' : !validateEmail(formData.email) ? 'Invalid email format' : '',
      password: !formData.password ? 'Password is required' : formData.password.length < 8 ? 'Password must be at least 8 characters' : '',
      confirmPassword: !formData.confirmPassword ? 'Please confirm your password' : formData.password !== formData.confirmPassword ? 'Passwords do not match' : '',
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setLoading(true);
    try {
      // Add your signup logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

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
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName}
            sx={{ mb: 2 }}
          />

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

          {formData.password && (
            <Box sx={{ mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={(passwordStrength / 4) * 100}
                sx={{
                  height: 6,
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    bgcolor: passwordStrengthLevels[passwordStrength - 1]?.color,
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  display: 'block',
                  color: passwordStrengthLevels[passwordStrength - 1]?.color,
                }}
              >
                Password Strength: {passwordStrengthLevels[passwordStrength - 1]?.label || 'Weak'}
              </Typography>
            </Box>
          )}

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Already have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => navigate('/login')}
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </Box>
  );
}; 