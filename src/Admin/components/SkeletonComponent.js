import React from "react";
import { Skeleton, Grid } from "@mui/material";
const SkeletonComponent = ({ number }) => {
  const arr = Array(number).fill(0);
  return (
    <Grid>
      <Grid container>
        <Grid item sm={12} sx={{ paddingBottom: "10px" }}>
          <Skeleton
            width={150}
            height={50}
            variant="reactangle"
            animation="wave"
          />
        </Grid>
        <Grid sx={{ paddingBottom: "10px" }}>
          <Skeleton
            width={200}
            height={50}
            variant="reactangle"
            animation="wave"
          />
        </Grid>
      </Grid>

      <Grid container>
        {arr.map((item, index) => (
          <Grid sx={{ padding: "10px" }}>
            <Skeleton
              width={200}
              height={300}
              variant="reactangle"
              animation="wave"
              key={index + 1}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default SkeletonComponent;
