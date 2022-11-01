export const login = "/login.php";
export const logout = "/logout.php";
export const registration = "/registration.php";
export const createToken = "/createToken.php";
export const verifyUser = (token) => `/verifyUser.php?auth-token=${token}`;
export const categoryList = "/categoryList.php";
export const subCategoryList = "/sub_categoryList.php";
export const productList = "/productList.php";
export const distributerList = "/distributerList.php";
export const deleteCategory = "/deleteCategory.php";
export const deleteSubCategory = "/deleteSubCategory.php";
export const deleteProduct = "/deleteProduct.php";
export const addEditCategory = "/add_edit_category.php";
export const addEditSubCategory = "/add_edit_subcategory.php";
export const addEditProduct = "/add_edit_product.php";

export const subCategoryListForCat = (id) =>
  `/sub_categoryList.php?cat_id=${id}`;
export const subCategoryDetails = (id) => subCategoryDetails(id);

export const productDetailForSubCat = (catId, subCatId) =>
  `/productList?cat_id=${catId}&subcat_id=${subCatId}`;
export const productDetails = (id) => `productDetails?product_id=${id}`;