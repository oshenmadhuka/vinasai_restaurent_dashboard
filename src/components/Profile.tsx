import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Tab,
  Tabs,
  Alert,
  DialogActions,
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      sx={{ pt: 3 }}
    >
      {value === index && children}
    </Box>
  );
}

interface ProfileProps {
  open: boolean;
  onClose: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState('');

  // Email change state
  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    password: '',
  });
  const [emailErrors, setEmailErrors] = useState({
    newEmail: '',
    password: '',
  });

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSuccess('');
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      newEmail: !emailForm.newEmail ? 'Email is required' : !validateEmail(emailForm.newEmail) ? 'Invalid email format' : '',
      password: !emailForm.password ? 'Password is required' : '',
    };
    setEmailErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) return;

    setLoading(true);
    try {
      // Add your email change logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setSuccess('Email updated successfully');
      setEmailForm({ newEmail: '', password: '' });
    } catch (error) {
      console.error('Email change failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      currentPassword: !passwordForm.currentPassword ? 'Current password is required' : '',
      newPassword: !passwordForm.newPassword ? 'New password is required' : passwordForm.newPassword.length < 8 ? 'Password must be at least 8 characters' : '',
      confirmPassword: !passwordForm.confirmPassword ? 'Please confirm your password' : passwordForm.newPassword !== passwordForm.confirmPassword ? 'Passwords do not match' : '',
    };
    setPasswordErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) return;

    setLoading(true);
    try {
      // Add your password change logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setSuccess('Password updated successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Password change failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmEmail !== 'user@example.com') { // Replace with actual user email
      return;
    }

    setLoading(true);
    try {
      // Add your account deletion logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      onClose();
      // Redirect to login page or show success message
    } catch (error) {
      console.error('Account deletion failed:', error);
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <DialogTitle sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Profile Settings</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ px: 3, py: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              mb: 2,
              '& .MuiTab-root': {
                minHeight: 48,
                fontWeight: 500,
              },
            }}
          >
            <Tab label="Email" />
            <Tab label="Password" />
            <Tab label="Delete Account" />
          </Tabs>

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <TabPanel value={activeTab} index={0}>
            <form onSubmit={handleEmailChange}>
              <TextField
                fullWidth
                label="New Email"
                type="email"
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                error={!!emailErrors.newEmail}
                helperText={emailErrors.newEmail}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={emailForm.password}
                onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                error={!!emailErrors.password}
                helperText={emailErrors.password}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={<SaveIcon />}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Updating Email...' : 'Update Email'}
              </Button>
            </form>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <form onSubmit={handlePasswordChange}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                error={!!passwordErrors.currentPassword}
                helperText={passwordErrors.currentPassword}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                error={!!passwordErrors.newPassword}
                helperText={passwordErrors.newPassword}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                error={!!passwordErrors.confirmPassword}
                helperText={passwordErrors.confirmPassword}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={<SaveIcon />}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Updating Password...' : 'Update Password'}
              </Button>
            </form>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Alert severity="warning" sx={{ mb: 3 }}>
            Permanently removes your account and all its contents. The account will be not be recoverable. Proceed with caution.
            </Alert>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              To delete your account, please type your email address (user@example.com) to confirm:
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter your email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              color="error"
              disabled={confirmEmail !== 'user@example.com'} // Replace with actual user email
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
              sx={{ py: 1.5 }}
            >
              Delete Account
            </Button>
          </TabPanel>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="error" />
          <Typography variant="h6" component="span">
            Delete Account
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ borderColor: alpha(theme.palette.divider, 0.2) }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 