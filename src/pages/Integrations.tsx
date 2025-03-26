import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Alert,
} from '@mui/material';
import {
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';

interface IntegrationStatus {
  connected: boolean;
  lastSync: string;
  error?: string;
}

export const Integrations: React.FC = () => {
  const [cloverStatus, setCloverStatus] = useState<IntegrationStatus>({
    connected: false,
    lastSync: 'Never',
  });
  const [shopifyStatus, setShopifyStatus] = useState<IntegrationStatus>({
    connected: false,
    lastSync: 'Never',
  });
  const [cloverApiKey, setCloverApiKey] = useState('');
  const [shopifyApiKey, setShopifyApiKey] = useState('');

  const handleCloverConnect = () => {
    if (!cloverApiKey) {
      setCloverStatus({
        ...cloverStatus,
        error: 'Please enter an API key',
      });
      return;
    }
    setCloverStatus({
      connected: true,
      lastSync: new Date().toLocaleString(),
    });
  };

  const handleShopifyConnect = () => {
    if (!shopifyApiKey) {
      setShopifyStatus({
        ...shopifyStatus,
        error: 'Please enter an API key',
      });
      return;
    }
    setShopifyStatus({
      connected: true,
      lastSync: new Date().toLocaleString(),
    });
  };

  const handleSync = (platform: 'clover' | 'shopify') => {
    if (platform === 'clover') {
      setCloverStatus({
        ...cloverStatus,
        lastSync: new Date().toLocaleString(),
      });
    } else {
      setShopifyStatus({
        ...shopifyStatus,
        lastSync: new Date().toLocaleString(),
      });
    }
  };

  return (
    <Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StoreIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Clover Integration</Typography>
              </Box>
              
              {/* <FormControlLabel
                control={
                  <Switch
                    checked={cloverStatus.connected}
                    onChange={(e) => {
                      setCloverStatus({
                        ...cloverStatus,
                        connected: e.target.checked,
                        error: undefined,
                      });
                      if (!e.target.checked) {
                        setCloverApiKey('');
                      }
                    }}
                  />
                }
                label="Connected"
              /> */}

              {cloverStatus.connected && (
                <>
                  <TextField
                    fullWidth
                    label="API Key"
                    type="password"
                    value={cloverApiKey}
                    onChange={(e) => setCloverApiKey(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Last Sync"
                    value={cloverStatus.lastSync}
                    margin="normal"
                    disabled
                  />
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<SyncIcon />}
                      onClick={() => handleSync('clover')}
                    >
                      Sync Now
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setCloverStatus({
                          connected: false,
                          lastSync: 'Never',
                        });
                        setCloverApiKey('');
                      }}
                    >
                      Disconnect
                    </Button>
                  </Box>
                </>
              )}

              {!cloverStatus.connected && (
                <>
                  <TextField
                    fullWidth
                    label="API Key"
                    type="password"
                    value={cloverApiKey}
                    onChange={(e) => setCloverApiKey(e.target.value)}
                    margin="normal"
                  />
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleCloverConnect}
                      disabled={!cloverApiKey}
                    >
                      Connect Clover
                    </Button>
                  </Box>
                </>
              )}

              {cloverStatus.error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {cloverStatus.error}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCartIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Shopify Integration</Typography>
              </Box>
              
              {/* <FormControlLabel
                control={
                  <Switch
                    checked={shopifyStatus.connected}
                    onChange={(e) => {
                      setShopifyStatus({
                        ...shopifyStatus,
                        connected: e.target.checked,
                        error: undefined,
                      });
                      if (!e.target.checked) {
                        setShopifyApiKey('');
                      }
                    }}
                  />
                }
                label="Connected"
              /> */}

              {shopifyStatus.connected && (
                <>
                  <TextField
                    fullWidth
                    label="API Key"
                    type="password"
                    value={shopifyApiKey}
                    onChange={(e) => setShopifyApiKey(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Last Sync"
                    value={shopifyStatus.lastSync}
                    margin="normal"
                    disabled
                  />
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<SyncIcon />}
                      onClick={() => handleSync('shopify')}
                    >
                      Sync Now
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setShopifyStatus({
                          connected: false,
                          lastSync: 'Never',
                        });
                        setShopifyApiKey('');
                      }}
                    >
                      Disconnect
                    </Button>
                  </Box>
                </>
              )}

              {!shopifyStatus.connected && (
                <>
                  <TextField
                    fullWidth
                    label="API Key"
                    type="password"
                    value={shopifyApiKey}
                    onChange={(e) => setShopifyApiKey(e.target.value)}
                    margin="normal"
                  />
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleShopifyConnect}
                      disabled={!shopifyApiKey}
                    >
                      Connect Shopify
                    </Button>
                  </Box>
                </>
              )}

              {shopifyStatus.error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {shopifyStatus.error}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Tracking
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Enable real-time order tracking and updates through your connected platforms.
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Real-time Order Updates"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}; 