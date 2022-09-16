import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

export default function FileSystemNavigator() {
  let history = useNavigate();
  return (
    <Card>
      <CardContent>
        <h3>Products</h3>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          <TreeItem nodeId="1" label="Electronics">
            <TreeItem nodeId="2" label="Mobile">
              <TreeItem
                nodeId="3"
                label="Mobile 1"
                onClick={() => history("/products")}
              />
              <TreeItem
                nodeId="4"
                label="Mobile 2"
                onClick={() => history("/products")}
              />
              <TreeItem
                nodeId="5"
                label="Mobile 3"
                onClick={() => history("/products")}
              />
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="6" label="Appliances">
            <TreeItem nodeId="7" label="Fridge">
              <TreeItem
                nodeId="8"
                label="Fridge 1"
                onClick={() => history("/products")}
              />
              <TreeItem
                nodeId="9"
                label="Fridge 2"
                onClick={() => history("/products")}
              />
              <TreeItem
                nodeId="10"
                label="Fridge 3"
                onClick={() => history("/products")}
              />
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="11" label="Appliances">
            <TreeItem nodeId="12" label="Fridge">
              <TreeItem
                nodeId="13"
                label="Fridge 1"
                onClick={() => history("/products")}
              />
              <TreeItem
                nodeId="14"
                label="Fridge 2"
                onClick={() => history("/products")}
              />
            </TreeItem>
          </TreeItem>
        </TreeView>
      </CardContent>
    </Card>
  );
}
