import React from "react";
import { Skeleton, Grid } from "@mui/material";
const SkeletonComponent = ({ number }) => {
  const arr = Array(number).fill(0);
  return (
    <Grid container>
      <Grid sx={{ paddingBottom: "10px" }}>
        <Skeleton
          width={200}
          height={70}
          variant="reactangle"
          animation="wave"
        />
      </Grid>
      <Grid container>
        {arr.map((item, index) => (
          <Grid sx={{ padding: "10px" }}>
            <Skeleton
              width={300}
              height={450}
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
