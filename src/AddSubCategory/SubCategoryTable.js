import React, { useState, useContext } from "react";
// material
import { Button, Grid, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getRequestLoggedIn, postRequestLoggedIn } from "../functions/apiClient";
import { subCategoryList, deleteSubCategory } from "../endpoint";
import { ApplicationContext } from "../Context/ApplicationContext";
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

  const { setSubCategoryDataArray } = useContext(ApplicationContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [delSubCatId, setDelSubCatId] = useState(null);
  const [delSubCatName, setDelSubCatName] = useState(null);

  const cancelDelete = () => {
    setOpenDeleteModal(false);
  };

  const deleteModal = (subCatId, subCatName) => {
    setDelSubCatId(subCatId);
    setDelSubCatName(subCatName);
  };

  const getSubCategoryList = async () => {
    const res = await getRequestLoggedIn(subCategoryList);
    if (res?.status_code === "200") {
      return res.sub_categoryList;
    }
    return null;
  };

  const handleDeleteSubCategory = async (id) => {
    const data = {
      subcategory_id: id,
    };
    const res = await postRequestLoggedIn(deleteSubCategory, data);
    if (res?.status_code === "200") {
      const resData = await getSubCategoryList();
      setSubCategoryDataArray(resData);
    }
    setOpenDeleteModal(false);
    setDelSubCatId(null);
    setDelSubCatName(null);
  };

  return (
    <Grid>
      <Grid sx={{ paddingBottom: "10px", paddingLeft: "10px" }}>
        <Typography variant="h4" color="error" sx={{ fontWeight: 800 }}>
          Sub-Categories List
          {selectedFilter ? ` for ${categoryFilter.toUpperCase()}` : ""}
        </Typography>
      </Grid>
      {(openDeleteModal) && (
        <Dialog open={openDeleteModal} onClose={cancelDelete}>
          <DialogTitle
            sx={{ paddingBottom: "0px", fontWeight: 800}}
          >Delete Sub-Category</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "#000000", marginTop: "5px"}}
            >
              Deleting <strong>{delSubCatName}</strong> will delete all its associated products.
            </DialogContentText>
            <DialogContentText
              sx={{ color: "#000000", marginTop: "5px", marginBottom: "8px"}}
            >
              Are you sure you want to permanently delete this sub-category?
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
            onClick={() => handleDeleteSubCategory(delSubCatId)}
          >
            Delete
          </Button>
          </DialogActions>
        </Dialog>
      )}
      <div className="subCatContainer">
        <Grid container>
          {subCategoryData?.map((data, i) => {
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
      </div>
    </Grid>
  );
}
