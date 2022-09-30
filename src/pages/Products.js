import React, { useState } from 'react';
// material
import { Container, Stack, Typography, Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// components
import Page from '../components/Page';
import AddProductData from "../components/AddProductData";
import EditProductData from "../components/EditProductData";
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <Typography variant="h4" gutterBottom>
            Products
            </Typography>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="Products Module">
                  <Tab label="Generated Products" value="0" />
                  <Tab label="Add Product Data" value="1" />
                  <Tab label="Update Product Data" value="2" />
                </TabList>
              </Box>
              <TabPanel value="0">
                <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
                  <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <ProductFilterSidebar
                      isOpenFilter={openFilter}
                      onOpenFilter={handleOpenFilter}
                      onCloseFilter={handleCloseFilter}
                    />
                    <ProductSort />
                  </Stack>
                </Stack>
                <ProductList products={PRODUCTS} />
                <ProductCartWidget />
              </TabPanel>
              <TabPanel value="1"><AddProductData /></TabPanel>
              <TabPanel value="2"><EditProductData /></TabPanel>
            </TabContext>
          </Box>
        </Stack>

      </Container>
    </Page>
  );
}
