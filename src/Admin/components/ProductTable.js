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
  { id: "id", label: "Token", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "product", label: "Product", alignRight: false },
  { id: "Actions", label: "Actions", alignRight: false },
];

export default function UserTable(props) {
  const { tokens } = props;

  return (
    <>
      <Card className="user-table-container" style={{ marginTop: 10 }}>
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
              {tokens?.map((token) => {
                return <ProductTableBodyUI token={token} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}