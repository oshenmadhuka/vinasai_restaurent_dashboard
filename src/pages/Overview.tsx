import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  alpha,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  AccessTime,
  CallEnd,
  Stars,
  ShoppingCart,
} from '@mui/icons-material';

const callData = [
  { date: '2024-01-01', calls: 65, minutes: 120, orders: 12, satisfaction: 4.5 },
  { date: '2024-01-02', calls: 59, minutes: 110, orders: 8, satisfaction: 4.2 },
  { date: '2024-01-03', calls: 80, minutes: 150, orders: 15, satisfaction: 4.8 },
  { date: '2024-01-04', calls: 81, minutes: 140, orders: 14, satisfaction: 4.6 },
  { date: '2024-01-05', calls: 56, minutes: 100, orders: 10, satisfaction: 4.3 },
  { date: '2024-01-06', calls: 55, minutes: 95, orders: 9, satisfaction: 4.4 },
  { date: '2024-01-07', calls: 40, minutes: 80, orders: 7, satisfaction: 4.1 },
];

const StatCard = ({ title, value, subtitle, icon, color }: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(color, 0.1),
              color: color,
              mr: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: alpha(color, 0.2),
                transform: 'scale(1.1)',
              },
            }}
          >
            {icon}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1, 
            fontWeight: 600,
            background: `linear-gradient(45deg, ${color}, ${alpha(color, 0.7)})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const Overview: React.FC = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('6m');

  const chartColors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    tertiary: theme.palette.tertiary.main,
    grid: alpha(theme.palette.divider, 0.1),
    text: theme.palette.text.secondary,
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 2,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <Typography variant="body2" color="text.secondary" mb={1}>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ 
                color: entry.color, 
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
      }}>
        {/* <Typography variant="h4" sx={{ 
          fontWeight: 600,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Overview
        </Typography> */}
        <FormControl 
          size="small" 
          sx={{ 
            minWidth: 120,
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              },
            },
          }}
        >
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="7d">Last 7 days</MenuItem>
            <MenuItem value="1m">Last month</MenuItem>
            <MenuItem value="3m">Last 3 months</MenuItem>
            <MenuItem value="6m">Last 6 months</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Calls"
            value="353"
            subtitle="+12% from last month"
            icon={<CallEnd />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Minutes"
            value="1,025"
            subtitle="+8% from last month"
            icon={<AccessTime />}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Orders via Dinefy"
            value="75"
            subtitle="+15% from last month"
            icon={<ShoppingCart />}
            color={theme.palette.tertiary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Satisfaction Rate"
            value="4.7/5"
            subtitle="+0.2 from last month"
            icon={<Stars />}
            color={theme.palette.warning.main}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              height: 'auto',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Call Volume Trends
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={callData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis 
                      dataKey="date" 
                      stroke={chartColors.text}
                      tick={{ fill: chartColors.text }}
                    />
                    <YAxis 
                      stroke={chartColors.text}
                      tick={{ fill: chartColors.text }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="calls"
                      name="Calls"
                      stroke={chartColors.primary}
                      strokeWidth={2}
                      dot={{ fill: chartColors.primary }}
                      activeDot={{ 
                        r: 8,
                        strokeWidth: 2,
                        stroke: theme.palette.background.paper,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      name="Minutes"
                      stroke={chartColors.secondary}
                      strokeWidth={2}
                      dot={{ fill: chartColors.secondary }}
                      activeDot={{ 
                        r: 8,
                        strokeWidth: 2,
                        stroke: theme.palette.background.paper,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              height: 'auto',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Orders Through Callbot
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={callData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis 
                      dataKey="date" 
                      stroke={chartColors.text}
                      tick={{ fill: chartColors.text }}
                    />
                    <YAxis 
                      stroke={chartColors.text}
                      tick={{ fill: chartColors.text }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="orders" 
                      name="Orders"
                      fill={chartColors.tertiary}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}; 