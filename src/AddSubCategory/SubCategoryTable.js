// material
import { Grid, Typography } from "@mui/material";
import SubCategoryTableBodyUI from "./SubCategoryTableBodyUI";

export default function SubCategoryTable(props) {
  const {
    subCategoryData,
    subCategoryDetails,
    setSubCategoryDetails,
    categoryFilter,
    subCategoryFilter,
    selectedFilter,
    setSubCategoryBool,
  } = props;
  return (
    <Grid>
      <Grid sx={{ paddingBottom: "10px", paddingLeft: "10px" }}>
        <Typography variant="h4" color="error" sx={{ fontWeight: 800 }}>
          Sub-Categories List
          {selectedFilter ? ` for ${categoryFilter.toUpperCase()}` : ""}
        </Typography>
      </Grid>
      <Grid container>
        {subCategoryData
          ?.map((data, i) => {
            return (
              <SubCategoryTableBodyUI
                category={data.category_name}
                subCategory={data.subcategory_name}
                id={i + 1}
                key={`${data.sub_category_id}-${i}`}
                subCatIdData={data.sub_category_id}
                catIdData={data.category_id}
                subCategoryDetails={subCategoryDetails}
                setSubCategoryDetails={setSubCategoryDetails}
                subCategoryImage={data.subcategory_image}
                setSubCategoryBool={setSubCategoryBool}
              />
            );
          })
          .filter((item) => {
            if (categoryFilter) {
              if (item.props.category === categoryFilter) return true;
              else return false;
            } else return true;
          })
          .filter((item) => {
            if (subCategoryFilter) {
              if (
                item.props.subCategory
                  .substring(0, subCategoryFilter.length)
                  .toLowerCase() === subCategoryFilter.toLowerCase()
              )
                return true;
              else return false;
            }
            return true;
          })}
      </Grid>
    </Grid>
  );
}
