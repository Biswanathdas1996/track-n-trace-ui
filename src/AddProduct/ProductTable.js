// material
import { Grid, Typography } from "@mui/material";
import ProductTableBodyUI from "./ProductTableBodyUI";

export default function ProductTable(props) {
  const {
    productData,
    prodDetails,
    setProdDetails,
    categoryFilter,
    subCategoryFilter,
    productFilter,
    selectedFilter,
    setProductBool,
  } = props;
  return (
    <Grid>
      <Grid sx={{ paddingBottom: "10px", paddingLeft: "10px" }}>
        <Typography variant="h4" color="error">
          Product List{" "}
          {selectedFilter
            ? `for ${subCategoryFilter.toUpperCase()} under ${categoryFilter.toUpperCase()}`
            : ""}
        </Typography>
      </Grid>
      <Grid container>
        {productData
          ?.map((data, i) => {
            return (
              <ProductTableBodyUI
                category={data.category_name}
                productImage={data.product_image}
                subCategory={data.subcategory_name}
                product={data.product_name}
                id={i + 1}
                key={`${data.productid}-${i}`}
                prodIdData={data.productid}
                subCatIdData={data.sub_category_id}
                catIdData={data.category_id}
                prodDetails={prodDetails}
                setProdDetails={setProdDetails}
                setProductBool={setProductBool}
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
              if (item.props.subCategory === subCategoryFilter) return true;
              else return false;
            } else return true;
          })

          .filter((item) => {
            if (productFilter) {
              if (
                item.props.product
                  .substring(0, productFilter.length)
                  .toLowerCase() === productFilter.toLowerCase()
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
