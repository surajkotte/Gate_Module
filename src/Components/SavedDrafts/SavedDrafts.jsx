import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSavedDrafts from "../../hooks/useSavedDrafts";
import { Search, Filter, Download, MessageSquareText, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { fi } from "date-fns/locale/fi";
import { ButtonIcon } from "@radix-ui/react-icons";

const SavedDrafts = () => {
  const [dialogOpen, setDialogOpen] = useState({
    type: "",
    id: "",
    state: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const totalPages = 1; // Placeholder, replace with actual calculation
  const { savedDrafts, vehicleData } = useSavedDrafts();
  return (
    <Card className="mb-8 w-full max-w-7xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-enterprise-navy">
            Saved Drafts
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
              placeholder="Search by vehicle number or driver..."
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
              {savedDrafts &&
                savedDrafts.length > 0 &&
                savedDrafts.map((draft, index) => (
                  <TableHead key={index}>{draft.fieldLabel}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleData &&
              vehicleData.length > 0 &&
              vehicleData.map((vehicle, index) => {
                return (
                  <TableRow
                    key={vehicle?._id || index}
                    className="hover:bg-accent/50"
                  >
                    {savedDrafts &&
                      savedDrafts.length > 0 &&
                      savedDrafts.map((draft, idx) => {
                        const field = vehicle?.HeaderFieldConfigurations?.find(
                          (field) => field.fieldName === draft.id
                        );
                        return field?.fieldType === "textarea" ? (
                          <TableCell key={idx}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setDialogOpen({
                                  type: field?.fieldName,
                                  id: vehicle?._id,
                                  state: true,
                                })
                              }
                            >
                              <MessageSquareText className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell
                            key={idx}
                            className={`${
                              draft.id === "vehicle_number" ? "font-bold" : ""
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
        {!vehicleData && (
          <div className="text-center py-8">
            <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Data found</h3>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedDrafts;
