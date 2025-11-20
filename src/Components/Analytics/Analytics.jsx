import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAnalytics from "../../hooks/useAnalytics";

const Analytics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useAnalytics();
  const getStatusColor = (status) => {
    switch (status) {
      case "gate_in":
      case "on-weigh_bridge_in":
        return "bg-success/10 text-success border-success/20";
      case "gate_out":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "entry_draft":
      case "at-loading":
      case "unloading":
        return "bg-warning/10 text-warning border-warning/20";
      case "weigh_bridge_out":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "with_po":
        return "bg-primary/10 text-primary border-primary/20 text-blue-500";
      case "without_po":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "vacant":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  const getTypeName = (value) => {
    if (value === "with_po") {
      return "With PurchaseOrder";
    } else if (value === "without_po") {
      return "Without PurchaseOrder";
    } else if (value === "vacant") {
      return "Vacant";
    } else if (value === "other") {
      return "Other";
    } else {
      return "undefined";
    }
  };

  const getStatus = (value) => {
    switch (value) {
      case "gate_in":
        return "Gate In";
      case "weigh_bridge_in":
        return "Weighbridge In";
      case "unloading":
        return "Unloading";
      case "gate_out":
        return "Completed";
      case "entry_draft":
        return "Draft Saved";
      case "weigh_bridge_out":
        return "Weighbridge out";
      default:
        return "undefined";
    }
  };

  return (
    <div className="space-y-6 container mx-auto px-1 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vehicle History</h2>
          <p className="text-muted-foreground mt-2">
            Complete log of all gate activities
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Records</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by vehicle number, gate entry ID, or PO/DO number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <div className="overflow-x-auto">
              {data ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {data?.fieldConfig?.length != 0 &&
                        data?.fieldConfig?.map((config) => {
                          return <TableHead>{config?.fieldLabel}</TableHead>;
                        })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.vehicleData?.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={14}
                          className="text-center py-8 text-muted-foreground"
                        >
                          No records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.vehicleData.map((record) => (
                        <TableRow
                          key={record.id}
                          className={!record.out_time ? "bg-warning/5" : ""}
                        >
                          {data?.fieldConfig?.length != 0 &&
                            data?.fieldConfig?.map((config) => {
                              return (
                                <TableCell
                                  className={`${
                                    config?.fieldName === "gateEntryNumber"
                                      ? "font-medium"
                                      : config?.fieldName === "vehicle_number"
                                      ? "font-bold"
                                      : config?.fieldName === "driver_name"
                                      ? "font-medium text-sm"
                                      : "text-sm"
                                  }`}
                                >
                                  {config?.fieldName === "entry_type" ? (
                                    <Badge
                                      variant="outline"
                                      className={getTypeColor(
                                        record.entry_type
                                      )}
                                    >
                                      {getTypeName(record[config?.fieldName])}
                                    </Badge>
                                  ) : config?.fieldName === "out_date" ? (
                                    <span className="text-warning font-medium text-yellow-400">
                                      {record[config?.fieldName] ||
                                        "Still In Yard"}
                                    </span>
                                  ) : config?.fieldName === "status" ? (
                                    <Badge
                                      variant="outline"
                                      className={getStatusColor(
                                        record[config?.fieldName]
                                      )}
                                    >
                                      {getStatus(record[config?.fieldName])}
                                    </Badge>
                                  ) : (
                                    record[config?.fieldName]
                                  )}
                                </TableCell>
                              );
                            })}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Data found</h3>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
