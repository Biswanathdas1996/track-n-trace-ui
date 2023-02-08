import React, { useState, useContext } from "react";
// material
import { Button, Grid, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getRequestLoggedIn, postRequestLoggedIn } from "../functions/apiClient";
import { deleteProduct, productList } from "../endpoint";
import { ApplicationContext } from "../Context/ApplicationContext";
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

  const { setProductDataArray } = useContext(ApplicationContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [delProdId, setDelProdId] = useState(null);
  const [delProdName, setDelProdName] = useState(null);

  const cancelDelete = () => {
    setOpenDeleteModal(false);
  };

  const deleteModal = (prodId, prodName) => {
    setDelProdId(prodId);
    setDelProdName(prodName);
  };

  const getProductList = async () => {
    const res = await getRequestLoggedIn(productList);
    if (res?.status_code === "200") {
      return res.productList;
    }
    return null;
  };

  const handleDeleteProduct = async (id) => {
    const data = {
      product_id: id,
    };
    const res = await postRequestLoggedIn(deleteProduct, data);
    if (res?.status_code === "200") {
      const resData = await getProductList();
      setProductDataArray(resData);
      //window.location.reload();
    }
    setOpenDeleteModal(false);
    setDelProdId(null);
    setDelProdName(null);
  };

  return (
    <Grid>
      <Grid sx={{ paddingBottom: "2px", paddingLeft: "10px" }}>
        <Typography variant="h4" color="error" sx={{ fontWeight: 800 }}>
          Products List
          {selectedFilter
            ? ` for ${subCategoryFilter.toUpperCase()} under ${categoryFilter.toUpperCase()}`
            : ""}
        </Typography>
      </Grid>
      {(openDeleteModal) && (
        <Dialog open={openDeleteModal} onClose={cancelDelete}>
          <DialogTitle
            sx={{ paddingBottom: "0px", fontWeight: 800}}
          >Delete Product</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "#000000", marginTop: "5px"}}
            >
              The deletion of <strong>{delProdName}</strong> cannot be reverted.
            </DialogContentText>
            <DialogContentText
              sx={{ color: "#000000", marginTop: "5px", marginBottom: "8px"}}
            >
              Are you sure you want to permanently delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button
            type="button"
            variant="outlined"
            style={{
              padding: "2px 16px",
              borderRadius: 4,
            }}
            className="cancel-button"
            onClick={cancelDelete}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="contained"
            style={{ margin: 10, padding: "3px 16px", borderRadius: 4 }}
            onClick={() => handleDeleteProduct(delProdId)}
          >
            Delete
          </Button>
          </DialogActions>
        </Dialog>
      )}
      <div className="prodContainer">
        <Grid container>
          {productData?.map((data, i) => {
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
                setOpenDeleteModal={setOpenDeleteModal}
                deleteModal={deleteModal}
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
      </div>
    </Grid>
  );
}
