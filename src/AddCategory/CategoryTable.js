import React, { useState, useContext } from "react";
// material
import { Button, Grid, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getRequestLoggedIn, postRequestLoggedIn } from "../functions/apiClient";
import { categoryList, deleteCategory } from "../endpoint";
import { ApplicationContext } from "../Context/ApplicationContext";
import CategoryTableBodyUI from "./CategoryTableBodyUI";

export default function CategoryTable(props) {
  const { categoryData, categoryDetails, setCategoryDetails, categoryFilter } =
    props;
    const { setCategoryDataArray } = useContext(ApplicationContext);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [delCatId, setDelCatId] = useState(null);
    const [delCatName, setDelCatName] = useState(null);

    const cancelDelete = () => {
      setOpenDeleteModal(false);
    };

    const deleteModal = (catId, catName) => {
      setDelCatId(catId);
      setDelCatName(catName);
    };

    const getCategoryList = async () => {
      const res = await getRequestLoggedIn(categoryList);
      if (res?.status_code === "200") {
        return res;
      }
      return null;
    };
    const handleDeleteCategory = async (id) => {
      const data = {
        category_id: id,
      };
      const res = await postRequestLoggedIn(deleteCategory, data);
      if (res?.status_code === "200") {
        const resData = await getCategoryList();
        const catArr = resData?.categoryList;
        setCategoryDataArray([...catArr]);
      }
      setOpenDeleteModal(false);
      setDelCatId(null);
      setDelCatName(null);
    };

  return (
    <Grid>
      <Grid sx={{ paddingBottom: "10px", paddingLeft: "10px" }}>
        <Typography variant="h4" color="error" sx={{ fontWeight: 800 }}>
          Categories List
        </Typography>
      </Grid>
      {(openDeleteModal) && (
        <Dialog open={openDeleteModal} onClose={cancelDelete}>
          <DialogTitle
            sx={{ paddingBottom: "0px", fontWeight: 800}}
          >Delete Category</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "#000000", marginTop: "5px"}}
            >
              Deleting <strong>{delCatName}</strong> will delete all its associated sub-categories and products.
            </DialogContentText>
            <DialogContentText
              sx={{ color: "#000000", marginBottom: "8px", marginTop: "5px"}}
            >
              Are you sure you want to permanently delete this category?
            </DialogContentText>
            {/* <DialogContentText
              sx={{ color: "#000000", marginTop: "15px", marginBottom: "8px"}}
            >
              Please enter the deletion reason for future reference.
            </DialogContentText>
            <TextField
              sx={{ 
                width: "100%",
                ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"},
                ".css-1x5jdmq": { padding: "6px 14px"},
                ".css-p0rm37": {top: "-8px"},
                ".css-1bp1ao6": {borderRadius: "8px"},
              }}
              label="Category"
              id="fullWidth"
              value={categoryDetails?.categoryName}
              required
              name="categoryName"
              onChange={(e) =>
                setCategoryDetails({
                  ...categoryDetails,
                  categoryName: e.target.value,
                })
              }
            /> */}
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
            onClick={() => handleDeleteCategory(delCatId)}
          >
            Delete
          </Button>
          </DialogActions>
        </Dialog>
      )}
      <div className="catContainer">
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
                    setOpenDeleteModal={setOpenDeleteModal}
                    deleteModal={deleteModal}
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
                  setOpenDeleteModal={setOpenDeleteModal}
                  deleteModal={deleteModal}
                />
              );
            }
          })}
        </Grid>
      </div>
    </Grid>
  );
}
