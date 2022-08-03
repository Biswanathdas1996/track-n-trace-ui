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
import CategoryTableBodyUI from "./CategoryTableBodyUI";

const TABLE_HEAD = [
  { id: "id", label: "ID", alignRight: false },
  { id: "name", label: "name", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];

export default function CategoryTable(props) {
  const { categoryData } = props;

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
              {categoryData?.map((category, i) => {
                return (
                  <CategoryTableBodyUI
                    category={category}
                    id={i + 1}
                    key={`${category}-${i}`}
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
