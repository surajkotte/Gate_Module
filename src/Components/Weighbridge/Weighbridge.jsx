import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Download,
  Eye,
  MessageSquareText,
  ExternalLink,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dialog } from "@/components/ui/dialog";
import useWeighBridgeHooks from "../../hooks/useWeighBridgeHooks";
import WeighbridgeForm from "./WeighbridgeForm";
import WeighbridgeDialog from "./WeighbridgeDialog";

const Weighbridge = () => {
  const {
    vehicleData,
    totalPages,
    paginatedCourses,
    currentPage,
    weighbridgeAction,
    setCurrentPage,
    setSearchTerm,
    weighbridgeHeader,
  } = useWeighBridgeHooks();
  const [dialogOpen, setDialogOpen] = useState("");
  const hasVehicleData = paginatedCourses && paginatedCourses.length > 0;
  const getStatusBadge = (status) => {
    const statusMap = {
      1: { label: "Gate In", statusColor: "bg-primary" },
      2: { label: "Gate Out", statusColor: "bg-destructive" },
      3: { label: "In Progress", statusColor: "bg-yellow-500" },
      4: { label: "Completed", statusColor: "bg-green-500" },
    };
    return (
      <Badge className={`${statusMap[status]?.statusColor} border-0`}>
        {statusMap[status]?.label || "Unknown"}
      </Badge>
    );
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      High: "bg-destructive text-primary",
      Medium: "bg-secondary text-primary",
      Low: "bg-primary text-primary",
    };
    return (
      <Badge className={colors[priority] || "bg-secondary"}>{priority}</Badge>
    );
  };

  return (
    <Card className="mb-8 w-full max-w-7xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-enterprise-navy">
            Weighbridge tracking
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by vehicle number, PO, or driver..."
              className="pl-10"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-status-pending"></div>
              <span>Pending: 1</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-status-completed"></div>
              <span>Completed: 1</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {weighbridgeHeader &&
                weighbridgeHeader?.length != 0 &&
                weighbridgeHeader?.map((data) => {
                  return <TableHead>{data?.fieldLabel}</TableHead>;
                })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleData &&
              vehicleData?.length != 0 &&
              vehicleData?.map((data) => {
                return (
                  <TableRow>
                    {weighbridgeHeader &&
                      weighbridgeHeader?.length != 0 &&
                      weighbridgeHeader?.map((header, idx) => {
                        const field =
                          header?.fieldType === "action"
                            ? { fieldType: "action", value: "" }
                            : header?.fieldType === "type"
                            ? { fieldType: "type", value: data?.entry_type }
                            : data?.WeighbridgeFieldConfigurations?.find(
                                (field) => field.fieldName === header.fieldName
                              );
                        return field?.fieldType === "textarea" ? (
                          <TableCell key={idx + "" + field?.fieldName}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setDialogOpen({
                                  type: field?.fieldType,
                                  id: data?._id,
                                  state: true,
                                });
                              }}
                            >
                              <MessageSquareText className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        ) : field?.fieldType === "action" ? (
                          <TableCell key={idx + "" + field?.fieldName}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setDialogOpen({
                                  type: "action",
                                  id: data?._id,
                                  state: true,
                                });
                              }}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell
                            key={idx + "" + field?.fieldName}
                            className={`${
                              data.fieldName === "vehicle_number"
                                ? "font-bold"
                                : ""
                            }`}
                          >
                            {field?.value || "-"}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {weighbridgeAction?.vehicleId && (
          <WeighbridgeForm
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            vehicleId={weighbridgeAction.vehicleId}
            vehicleNumber={
              paginatedCourses.find(
                (v) => v.vehicleId === weighbridgeAction.vehicleId
              )?.vehicleNo
            }
            transporterName={
              paginatedCourses.find(
                (v) => v.vehicleId === weighbridgeAction.vehicleId
              )?.transporterName
            }
          />
        )}
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        {!hasVehicleData && (
          <div className="text-center py-8">
            <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Data found</h3>
          </div>
        )}
      </CardContent>
      <Dialog
        open={dialogOpen.state}
        onOpenChange={(open) =>
          setDialogOpen((prev) => ({ ...prev, state: open }))
        }
      >
        <WeighbridgeDialog
          type={dialogOpen.type}
          id={dialogOpen.id}
          vehicleData={vehicleData}
          dialogConf={dialogOpen}
          onClose={() => setDialogOpen({ type: "", id: "", state: false })}
        />
      </Dialog>
    </Card>
  );
};

export default Weighbridge;
