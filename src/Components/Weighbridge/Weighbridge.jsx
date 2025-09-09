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
  Clock,
  MapPin,
  Calendar,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useWeighBridgeHooks from "../../hooks/useWeighBridgeHooks";
import { formatTime } from "../../util/utility";
import { set } from "date-fns/set";
import WeighbridgeForm from "./WeighbridgeForm";

const Weighbridge = () => {
  const {
    vehicleData,
    totalPages,
    paginatedCourses,
    currentPage,
    weighbridgeAction,
    setCurrentPage,
    setSearchTerm,
    setWeighbridgeAction,
  } = useWeighBridgeHooks();
  const [dialogOpen, setDialogOpen] = useState(false);
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
            Vehicle Tracking
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
              <TableHead>Vehicle Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasVehicleData &&
              paginatedCourses?.map((vehicle, index) => (
                <TableRow
                  key={vehicle.vehicleId + "id" + index}
                  className="hover:bg-accent/50"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium text-enterprise-navy">
                        {vehicle.vehicleNo}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {vehicle.driverName}
                      </div>
                    </div>
                  </TableCell>
                  {/* <TableCell className="font-mono text-sm">
                  {vehicle.poNumber}
                </TableCell> */}
                  <TableCell>{getStatusBadge(1, "Low")}</TableCell>
                  <TableCell>{getPriorityBadge("Medium")}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{"Test"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {vehicle?.weight || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{vehicle?.inDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {formatTime(vehicle?.inTime)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setWeighbridgeAction({ vehicleId: vehicle.vehicleId });
                        setDialogOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
    </Card>
  );
};

export default Weighbridge;
