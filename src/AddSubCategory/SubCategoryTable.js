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
import SubCategoryTableBodyUI from "./SubCategoryTableBodyUI";

const TABLE_HEAD = [
  { id: "id", label: "ID", alignRight: false },
  { id: "catName", label: "Category", alignRight: false },
  { id: "subCatName", label: "Sub-Category", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];

export default function SubCategoryTable(props) {
  const { subCategoryData, subCategoryDetails, setSubCategoryDetails } = props;

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
