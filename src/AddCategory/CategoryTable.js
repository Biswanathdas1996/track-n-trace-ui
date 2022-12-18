// material
import { Grid, Typography } from "@mui/material";
import CategoryTableBodyUI from "./CategoryTableBodyUI";

export default function CategoryTable(props) {
  const { categoryData, categoryDetails, setCategoryDetails, categoryFilter } =
    props;

  return (
    <Grid>
      <Grid sx={{ paddingBottom: "10px", paddingLeft: "10px" }}>
        <Typography variant="h4" color="error" sx={{ fontWeight: 800 }}>
          Categories List
        </Typography>
      </Grid>
      <Grid container>
        {categoryData?.map((category, i) => {
          if (categoryFilter) {
            if (
              category.category_name
                ?.substring(0, categoryFilter.length)
                .toLowerCase() === categoryFilter.toLowerCase()
            ) {
              return (
                <CategoryTableBodyUI
                  category={category.category_name}
                  id={i + 1}
                  key={`${category}-${i}`}
                  idData={category.category_id}
                  categoryDetails={categoryDetails}
                  setCategoryDetails={setCategoryDetails}
                  categoryImage={category.category_image}
                />
              );
            } else return null;
          } else {
            return (
              <CategoryTableBodyUI
                category={category.category_name}
                id={i + 1}
                key={`${category}-${i}`}
                idData={category.category_id}
                categoryDetails={categoryDetails}
                setCategoryDetails={setCategoryDetails}
                categoryImage={category.category_image}
              />
            );
          }
        })}
      </Grid>
    </Grid>
  );
}
