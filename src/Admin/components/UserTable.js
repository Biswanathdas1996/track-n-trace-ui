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
import TableBodyUI from "./TableBody";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "guid", label: "GUID", alignRight: false },
  { id: "employeeid", label: "Employee Id", alignRight: false },
  { id: "coins", label: "Address", alignRight: false },
  { id: "balance", label: "Balance", alignRight: false },
  { id: "button", label: "Actions", alignRight: false },
];

export default function UserTable(props) {
  const { users } = props;

  return (
    <>
      <Card className="user-table-container" style={{ marginTop: 10 }}>
        <TableContainer className="user-table-container">
          <Table>
            <TableHead style={{ background: "#d93954" }}>
              <TableRow>
                {TABLE_HEAD.map((headCell, i) => (
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
              {users?.map((person, i) => {
                return (
                  <TableBodyUI
                    user={person}
                    key={person.employeeID + "-" + i}
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
