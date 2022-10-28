// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import ProductTableBodyUI from "./ProductTableBodyUI";

const TABLE_HEAD = [
  { id: "id", label: "ID", alignRight: false },
  { id: "catName", label: "Category", alignRight: false },
  { id: "subCatName", label: "Sub-Category", alignRight: false },
  { id: "productName", label: "Product", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];

export default function ProductTable(props) {
  const { productData, prodDetails, setProdDetails } = props;
  console.log("productData", productData);

  return (
    <>
      <Card
        className="user-table-container"
        sx={{ boxShadow: 0, mb: 3, mt: 1 }}
      >
        <TableContainer className="user-table-container">
          <Table>
            <TableHead style={{ background: "#d93954" }}>
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell
                    sx={{ fontWeight: "bold", color: "white" }}
                    key={headCell.id}
                    align="center"
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productData?.map((data, i) => {
                return (
                  <ProductTableBodyUI
                    category={data.category_name}
                    subCategory={data.subcategory_name}
                    product={data.product_name}
                    id={i + 1}
                    key={`${data.productid}-${i}`}
                    prodIdData={data.productid}
                    subCatIdData={data.sub_category_id}
                    catIdData={data.category_id}
                    prodDetails={prodDetails}
                    setProdDetails={setProdDetails}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
