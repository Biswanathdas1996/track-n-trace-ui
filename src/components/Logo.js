import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

import pwcLogo from '../trkNdTrcIcons/pwcLoginLogo.png';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 50, height: 50, ...sx }}>
      <img src={pwcLogo} alt='PwC_Logo' style={{ width: "120px"}} />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/dashboard">{logo}</RouterLink>;
}
