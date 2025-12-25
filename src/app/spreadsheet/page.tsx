"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, Plus, Trash2, Edit3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import "ag-grid-community/styles/ag-theme-quartz.css";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  id: number;
  product: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  supplier: string;
  date: string;
}

export default function SpreadsheetPage() {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<RowData[]>([
    {
      id: 1,
      product: "Laptop",
      category: "Electronics",
      quantity: 10,
      price: 999.99,
      total: 9999.9,
      status: "In Stock",
      supplier: "Tech Corp",
      date: "2025-01-15",
    },
    {
      id: 2,
      product: "Mouse",
      category: "Accessories",
      quantity: 50,
      price: 19.99,
      total: 999.5,
      status: "In Stock",
      supplier: "Accessory Plus",
      date: "2025-01-16",
    },
    {
      id: 3,
      product: "Keyboard",
      category: "Accessories",
      quantity: 30,
      price: 49.99,
      total: 1499.7,
      status: "Low Stock",
      supplier: "Tech Corp",
      date: "2025-01-17",
    },
    {
      id: 4,
      product: "Monitor",
      category: "Electronics",
      quantity: 15,
      price: 299.99,
      total: 4499.85,
      status: "In Stock",
      supplier: "Display Co",
      date: "2025-01-18",
    },
    {
      id: 5,
      product: "Webcam",
      category: "Electronics",
      quantity: 5,
      price: 79.99,
      total: 399.95,
      status: "Low Stock",
      supplier: "Tech Corp",
      date: "2025-01-19",
    },
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef<RowData>[]>([
    {
      field: "id",
      headerName: "ID",
      width: 80,
      editable: false,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
      { field: "product", headerName: "Product", editable: true, flex: 1 },
      {
        field: "category",
        headerName: "Category",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Electronics", "Accessories", "Office", "Furniture"],
        },
      },
      {
        field: "quantity",
        headerName: "Quantity",
        editable: true,
        type: "numericColumn",
      },
      {
        field: "price",
        headerName: "Price ($)",
        editable: true,
        type: "numericColumn",
        valueFormatter: (params) => `$${params.value.toFixed(2)}`,
      },
      {
        field: "total",
        headerName: "Total ($)",
        editable: false,
        type: "numericColumn",
        valueFormatter: (params) => `$${params.value.toFixed(2)}`,
        valueGetter: (params) => {
          if (params.data) {
            return params.data.quantity * params.data.price;
          }
          return 0;
        },
      },
      {
        field: "status",
        headerName: "Status",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["In Stock", "Low Stock", "Out of Stock", "On Order"],
        },
        cellStyle: (params) => {
          if (params.value === "In Stock") {
            return { backgroundColor: "#dcfce7", color: "#166534" };
          } else if (params.value === "Low Stock") {
            return { backgroundColor: "#fef3c7", color: "#92400e" };
          } else if (params.value === "Out of Stock") {
            return { backgroundColor: "#fee2e2", color: "#991b1b" };
          }
          return {};
        },
      },
      { field: "supplier", headerName: "Supplier", editable: true, flex: 1 },
      {
        field: "date",
        headerName: "Date",
        editable: true,
        cellEditor: "agDateStringCellEditor",
      },
  ]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
    }),
    []
  );

  const deleteColumn = useCallback((field: string) => {
    if (field === "id") {
      alert("Cannot delete ID column");
      return;
    }
    if (confirm(`Delete column "${field}"?`)) {
      setColumnDefs(columnDefs.filter(col => col.field !== field));
    }
  }, [columnDefs]);

  const renameColumn = useCallback((field: string) => {
    if (field === "id") {
      alert("Cannot rename ID column");
      return;
    }
    const newName = prompt("Enter new column name:");
    if (newName) {
      setColumnDefs(columnDefs.map(col => 
        col.field === field ? { ...col, headerName: newName } : col
      ));
    }
  }, [columnDefs]);

  const getContextMenuItems = useCallback((params: any) => {
    if (!params.column) return [];
    
    const field = params.column.getColId();
    
    return [
      {
        name: "Rename Column",
        action: () => renameColumn(field),
        icon: '<span>✏️</span>',
      },
      {
        name: "Delete Column",
        action: () => deleteColumn(field),
        icon: '<span>🗑️</span>',
      },
      "separator",
      "copy",
      "copyWithHeaders",
      "paste",
    ];
  }, [renameColumn, deleteColumn]);

  const addRow = useCallback(() => {
    const newId = Math.max(...rowData.map((r) => r.id), 0) + 1;
    const newRow: RowData = {
      id: newId,
      product: "",
      category: "Electronics",
      quantity: 0,
      price: 0,
      total: 0,
      status: "In Stock",
      supplier: "",
      date: new Date().toISOString().split("T")[0],
    };
    const newData = [...rowData, newRow];
    setRowData(newData);
  }, [rowData]);

  const deleteSelected = useCallback(() => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      const selectedIds = selectedRows.map((row) => row.id);
      const newData = rowData.filter((row) => !selectedIds.includes(row.id));
      setRowData(newData);
      gridRef.current?.api.deselectAll();
    }
  }, [rowData]);

  const exportToCSV = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv();
  }, []);

  const addColumn = useCallback(() => {
    const columnName = prompt("Enter column name:");
    if (columnName) {
      const fieldName = columnName.toLowerCase().replace(/\s+/g, "_");
      const newColumn: ColDef = {
        field: fieldName,
        headerName: columnName,
        editable: true,
        width: 150,
      };
      setColumnDefs([...columnDefs, newColumn]);
      
      // Add empty value for this field in all existing rows
      const updatedRows = rowData.map(row => ({
        ...row,
        [fieldName]: "",
      }));
      setRowData(updatedRows);
    }
  }, [columnDefs, rowData]);

  const importFromCSV = () => {
    // Create file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          // Basic CSV parsing (you might want a library for complex CSVs)
          const lines = text.split("\n");
          const headers = lines[0].split(",");
          const data = lines.slice(1).map((line, index) => {
            const values = line.split(",");
            return {
              id: rowData.length + index + 1,
              product: values[1] || "",
              category: values[2] || "Electronics",
              quantity: parseInt(values[3]) || 0,
              price: parseFloat(values[4]) || 0,
              total: 0,
              status: values[6] || "In Stock",
              supplier: values[7] || "",
              date: values[8] || new Date().toISOString().split("T")[0],
            };
          });
          setRowData([...rowData, ...data]);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Spreadsheet
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Excel-like data entry and management
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Inventory</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={addRow}
              >
                <Plus className="h-4 w-4" />
                Add Row
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={addColumn}
              >
                <Plus className="h-4 w-4" />
                Add Column
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Manage Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Edit Columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {columnDefs.map((col) => (
                    col.field !== "id" && (
                      <DropdownMenuItem
                        key={col.field}
                        className="flex items-center justify-between"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <span className="flex-1">{col.headerName}</span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => renameColumn(col.field!)}
                          >
                            ✏️
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => deleteColumn(col.field!)}
                          >
                            🗑️
                          </Button>
                        </div>
                      </DropdownMenuItem>
                    )
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={deleteSelected}
              >
                <Trash2 className="h-4 w-4" />
                Delete Rows
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={importFromCSV}
              >
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={exportToCSV}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            className="ag-theme-quartz dark:ag-theme-quartz-dark" 
            style={{ height: 600 }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection="multiple"
              animateRows={true}
              pagination={true}
              paginationPageSize={20}
              onCellValueChanged={(event) => {
                console.log("Cell value changed:", event);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Excel-like Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Column Management
              </h4>
              <ul className="space-y-1">
                <li>• Click "Manage Columns" button</li>
                <li>• Click ✏️ to rename columns</li>
                <li>• Click 🗑️ to delete columns</li>
                <li>• Drag column headers to reorder</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Keyboard Navigation
              </h4>
              <ul className="space-y-1">
                <li>• <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Tab</kbd> - Move to next cell</li>
                <li>• <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Enter</kbd> - Edit cell / Move down</li>
                <li>• <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Arrow keys</kbd> - Navigate cells</li>
                <li>• <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+C/V</kbd> - Copy/Paste</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Features
              </h4>
              <ul className="space-y-1">
                <li>• Double-click to edit cells</li>
                <li>• Dropdown editors for Category & Status</li>
                <li>• Sortable columns (click header)</li>
                <li>• Resizable columns (drag edge)</li>
                <li>• Filter data (column menu)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
