import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useUser } from "../Context/user";
const Profile = () => {
  const user = useUser();
  const {
    role_type,
    state_name,
    user_email,
    user_fname,
    user_id,
    user_lname,
    user_phone,
    zone,
  } = user;
  return (
    <Grid item sx={{ padding: "10px" }}>
      <Box
        width="900px"
        sx={{
          margin: "auto",
          paddingTop: "50px",
        }}
      >
        {user_fname && (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "30px",
              background: "#ebecf0",
              boxShadow: "8px 8px 4px #d3d3d3",
            }}
          >
            <Grid
              container
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              <Grid item sm={12}>
                <Typography
                  variant="h3"
                  color="error"
                  sx={{ paddingBottom: "20px" }}
                >
                  Hi, {user_fname + " " + user_lname}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", paddingBottom: "10px" }}
                >
                  Here are your details:
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h5">
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    Your Email -{" "}
                  </Box>
                  {user_email}{" "}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h5">
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    Your Contact Number -{" "}
                  </Box>
                  {user_phone}{" "}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h5">
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    Your State -{" "}
                  </Box>
                  {state_name}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h5">
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    Your Zone -{" "}
                  </Box>
                  {zone}{" "}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h5">
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    Your Role -{" "}
                  </Box>
                  {role_type}{" "}
                </Typography>
              </Grid>

              <Grid item sm={12}>
                <Typography variant="h5">
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    Your User Id -{" "}
                  </Box>
                  {user_id}{" "}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        )}
      </Box>
    </Grid>
  );
};
export default Profile;
