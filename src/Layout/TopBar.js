import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useToken } from "../Context/token";
import { useUser } from "../Context/user";
import { getRequestLoggedIn } from "../functions/apiClient";
import { logout } from "../endpoint";
import { Grid } from "@mui/material";
import pwcLogo from "../trkNdTrcIcons/pwcLogo.png";

const settings = ["Profile", "Logout"];

const ResponsiveAppBar = ({ role }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [token, setToken] = useToken();
  const user = useUser();
  // console.log('TopBar1 ==>>',user);
  const userFirstName = user?.user_fname;
  const userLastName = user?.user_lname;
  const userRole = user?.role_type;

  const navigation = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (e) => {
    if (e.target.innerHTML === "Logout") {
      const res = await getRequestLoggedIn(logout);
      if (res?.status_code === "200") {
        setToken(0);
        navigation("/");
      }
    }
    if (e.target.innerHTML === "Profile") {
      navigation("/profile");
    }
    setAnchorElUser(null);
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <AppBar
      position="static"
      color="primary"
      style={{ background: "#C52A1A" }}
    >
      <Container maxWidth="95%">
        <Toolbar disableGutters>
          <Grid container sm={4}>
            <Grid item sm={1} sx={{ marginTop: "5px" }}>
              <img src={pwcLogo} style={{ marginTop: "15px"}} />
            </Grid>
            <Grid item sm={10}>
              <Grid container sm={12} sx={{ paddingLeft: "25px" }}>
                <Grid item sm={12}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      mr: 2,
                      fontFamily: "Helvetica",
                      fontWeight: 700,
                      letterSpacing: ".2rem",
                      color: "inherit",
                      textDecoration: "none",
                      width: "180px"
                    }}
                  >
                    Track & Trace
                  </Typography>
                </Grid>
                <Grid item sm={12} sx={{ fontSize: "16px" }}>
                  {userRole}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ flexGrow: 0 }} style={{ marginLeft: "70%"}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                  sx={{ fontWeight: 600, textTransform: "uppercase" }}
                  alt={userFirstName}
                  src="/static/images/avatar/6.jpg"
                  {...stringAvatar(userFirstName + " " + userLastName)}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e) => handleCloseUserMenu(e)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
