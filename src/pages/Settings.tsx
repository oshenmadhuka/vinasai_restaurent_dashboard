import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  useTheme,
  alpha,
  IconButton,
  Collapse,
  Alert,
} from '@mui/material';
import {
  Save as SaveIcon,
  Restaurant as RestaurantIcon,
  AccessTime as TimeIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

export const Settings: React.FC = () => {
  const theme = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);

  const [settings, setSettings] = useState({
    restaurantName: 'Dinefy Restaurant',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    website: 'https://example.com',
    email: 'info@dinefy.com',
    openingHours: {
      monday: '9:00 AM - 10:00 PM',
      tuesday: '9:00 AM - 10:00 PM',
      wednesday: '9:00 AM - 10:00 PM',
      thursday: '9:00 AM - 10:00 PM',
      friday: '9:00 AM - 11:00 PM',
      saturday: '10:00 AM - 11:00 PM',
      sunday: '10:00 AM - 9:00 PM',
    },
    features: {
      takeReservations: true,
      takeOrders: true,
      provideMenuInfo: true,
      handleComplaints: true,
    },
    greetingMessage: 'Welcome to Dinefy Restaurant! How can I assist you today?',
    endingMessage: 'Thank you for calling Dinefy Restaurant! Have a great day!',
  });

  const handleSave = () => {
    // TODO: Implement settings save
    console.log('Saving settings:', settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
      }}>
        {/* <Typography variant="h4" sx={{ 
          fontWeight: 600,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Restaurant Details
        </Typography> */}
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: 'white',
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            }
          }}
        >
          Save Changes
        </Button>
      </Box>

      <Collapse in={showSuccess}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setShowSuccess(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 3 }}
        >
          Settings saved successfully!
        </Alert>
      </Collapse>

      <Section title="Basic Information" icon={<RestaurantIcon />}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Restaurant Name"
              value={settings.restaurantName}
              onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone Number"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Website"
              value={settings.website}
              onChange={(e) => setSettings({ ...settings, website: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </Grid>
        </Grid>
      </Section>

      <Section title="Opening Hours" icon={<TimeIcon />}>
        <Grid container spacing={3}>
          {Object.entries(settings.openingHours).map(([day, hours]) => (
            <Grid item xs={12} sm={6} md={4} key={day}>
              <TextField
                fullWidth
                label={day.charAt(0).toUpperCase() + day.slice(1)}
                value={hours}
                onChange={(e) => setSettings({
                  ...settings,
                  openingHours: {
                    ...settings.openingHours,
                    [day]: e.target.value,
                  },
                })}
              />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Dinefy Features" icon={<PhoneIcon />}>
        <Grid container spacing={2}>
          {Object.entries(settings.features).map(([feature, enabled]) => (
            <Grid item xs={12} sm={6} key={feature}>
              <FormControlLabel
                control={
                  <Switch
                    checked={enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      features: {
                        ...settings.features,
                        [feature]: e.target.checked,
                      },
                    })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.5),
                      },
                    }}
                  />
                }
                label={feature
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())}
              />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Greeting and Ending Message" icon={<LanguageIcon />}>
        <TextField
          fullWidth
          multiline
          rows={2}
          margin='dense'
          value={settings.greetingMessage}
          onChange={(e) => setSettings({ ...settings, greetingMessage: e.target.value })}
          placeholder="Enter the greeting message that the callbot will use..."
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: alpha(theme.palette.background.paper, 0.5),
            },
          }}
        />
        <TextField
          fullWidth
          multiline
          rows={2}
          margin='dense'
          value={settings.endingMessage}
          onChange={(e) => setSettings({ ...settings, endingMessage: e.target.value })}
          placeholder="Enter the ending message that the callbot will use..."
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: alpha(theme.palette.background.paper, 0.5),
            },
          }}
        />
      </Section>
    </Box>
  );
}; 