import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useToken } from "../Context/token";
import { useUser } from "../Context/user";
import { getRequestLoggedIn } from "../functions/apiClient";
import { logout } from "../endpoint";
import { Grid } from "@mui/material";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = ({ role }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [token, setToken] = useToken();
  const user = useUser();
  const userFirstName = user?.user_fname;
  const userRole = user?.role_type;

  const navigation = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

  return (
    <AppBar
      position="static"
      color="primary"
      // style={{ background: "rgb(217 57 84 / 70%)" }}
      style={{ background: "#AD1B02" }}
    >
      <Container maxWidth="95%">
        <Toolbar disableGutters>
          <Grid container sm={2}>
            <Grid item sm={1} sx={{ marginTop: "5px" }}>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2 }} />
            </Grid>
            <Grid item sm={11}>
              <Grid container sm={12} sx={{ paddingLeft: "10px" }}>
                <Grid item sm={12}>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/dashboard"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".2rem",
                      color: "inherit",
                      textDecoration: "none",
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key={3} onClick={handleCloseNavMenu}>
                <Typography textAlign="center" href="/category">
                  Category
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key={1}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              href="/dashboard"
            >
              Dashboard
            </Button>
            {role === "1" && (
              <>
                <Button
                  key={10}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/createWorkflow"
                >
                  Initiate Work Flow
                </Button>
                <Button
                  key={2}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/distributer"
                >
                  Distributers
                </Button>
                <Button
                  key={3}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/category"
                >
                  Category
                </Button>

                <Button
                  key={4}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/sub-category"
                >
                  Sub Category
                </Button>
                <Button
                  key={5}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/product"
                >
                  Product
                </Button>
                {/* <Button
              key={6}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              href="/tokens"
            >
              Tokens
            </Button> */}
                <Button
                  key={6}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/tokens"
                >
                  Tokens
                </Button>
                <Button
                  key={7}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/uploadBulkData"
                >
                  Upload Bulk Data
                </Button>
                <Button
                  key={8}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/publishBulkArt"
                >
                  Create Bulk token
                </Button>
                <Button
                  key={9}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href="/publishArt"
                >
                  Create Order Token
                </Button>
              </>
            )}
            {role === "2" && (
              <Button
                key={10}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                href="/viewAssignedTokens"
              >
                View Assigned Tokens
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userFirstName} src="/static/images/avatar/6.jpg" />
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
