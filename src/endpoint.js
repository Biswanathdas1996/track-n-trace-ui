export const login = "/login.php";
export const logout = "/logout.php";
export const registration = "/registration.php";
export const createToken = "/createToken.php";
export const addTokenData = "/addTokenData.php";
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
export const assignToken = "/assignToken.php";
export const unAssignToken = "/unAssignToken.php";

export const subCategoryListForCat = (id) =>
  `/sub_categoryList.php?cat_id=${id}`;
export const subCategoryDetailsEp = (id) =>
  `/subcategoryDetails.php?subcat_id=${id}`;

export const productDetailForSubCat = (catId, subCatId) =>
  `/productList.php?cat_id=${catId}&subcat_id=${subCatId}`;
export const productDetails = (id) => `/productDetails.php?product_id=${id}`;

export const categoryDetailsEp = (id) => `/categoryDetails.php?cat_id=${id}`;

export const getAllTokensData = (blankFlag, assignedFlag) =>
  `/getAllTokensData.php?assignedFlag=${assignedFlag}&blankTokenFlag=${blankFlag}`;

export const getTokenDetails = (token) => `/tokenDetails.php?tokenId=${token}`;
