import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
//import { useToast } from "@/hooks/use-toast";

const requiredFields = [
  "vehicleNumber",
  "weighbridgeNumber",
  "weightType",
  "grossWeight",
  "materialType",
  "operator",
];

const WeighbridgeForm = ({
  open,
  onOpenChange,
  vehicleNumber,
  transporterName,
  vehicleId,
}) => {
  //const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const form = useForm({
    defaultValues: {
      vehicleNumber: vehicleNumber || "",
      weighbridgeNumber: "",
      weightType: "",
      grossWeight: "",
      tareWeight: "",
      netWeight: "",
      materialType: "",
      operator: transporterName || "",
      remarks: "",
    },
  });

  const grossWeight = form.watch("grossWeight");
  const tareWeight = form.watch("tareWeight");

  const calculateNetWeight = () => {
    if (grossWeight && tareWeight) {
      const gross = parseFloat(grossWeight);
      const tare = parseFloat(tareWeight);
      if (!isNaN(gross) && !isNaN(tare)) {
        const net = gross - tare;
        form.setValue("netWeight", net.toFixed(2));
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors[field] = "This field is required";
      }
    });
    if (data.grossWeight && isNaN(parseFloat(data.grossWeight))) {
      errors.grossWeight = "Please enter a valid number";
    }
    if (data.tareWeight && isNaN(parseFloat(data.tareWeight))) {
      errors.tareWeight = "Please enter a valid number";
    }
    return errors;
  };

  const onSubmit = async (data) => {
    const errors = validateForm(data);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      // toast({
      //   title: "Validation Error",
      //   description: "Please fill all required fields and fix errors.",
      //   variant: "destructive",
      // });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Weighbridge ", data);

      // toast({
      //   title: "Weight Recorded Successfully",
      //   description: `Weight recorded for vehicle ${data.vehicleNumber}.`,
      // });

      form.reset();
      setFormErrors({});
      onOpenChange(false);
    } catch (error) {
      // toast({
      //   title: "Weight Recording Failed",
      //   description: "Please try again later.",
      //   variant: "destructive",
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-enterprise-navy">
            Weighbridge Operation
          </DialogTitle>
          <DialogDescription>
            Record vehicle weight measurements. Ensure accurate readings for all
            entries.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="vehicleNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Number *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={vehicleNumber}
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage>{formErrors.vehicleNumber}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weighbridgeNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weighbridge Number *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select weighbridge" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="wb-1">Weighbridge 1</SelectItem>
                        <SelectItem value="wb-2">Weighbridge 2</SelectItem>
                        <SelectItem value="wb-3">Weighbridge 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage>{formErrors.weighbridgeNumber}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weightType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select weight type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="first-weighing">
                          First Weighing (Loaded)
                        </SelectItem>
                        <SelectItem value="second-weighing">
                          Second Weighing (Empty)
                        </SelectItem>
                        <SelectItem value="tare-only">
                          Tare Weight Only
                        </SelectItem>
                        <SelectItem value="gross-only">
                          Gross Weight Only
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage>{formErrors.weightType}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="materialType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="raw-material">
                          Raw Material
                        </SelectItem>
                        <SelectItem value="finished-goods">
                          Finished Goods
                        </SelectItem>
                        <SelectItem value="chemicals">Chemicals</SelectItem>
                        <SelectItem value="fuel">Fuel</SelectItem>
                        <SelectItem value="spare-parts">Spare Parts</SelectItem>
                        <SelectItem value="packaging">
                          Packaging Material
                        </SelectItem>
                        <SelectItem value="waste">Waste Material</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage>{formErrors.materialType}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grossWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Weight (KG) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter gross weight"
                        {...field}
                        onBlur={() => {
                          field.onBlur();
                          calculateNetWeight();
                        }}
                      />
                    </FormControl>
                    <FormMessage>{formErrors.grossWeight}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tareWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tare Weight (KG)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter tare weight"
                        {...field}
                        onBlur={() => {
                          field.onBlur();
                          calculateNetWeight();
                        }}
                      />
                    </FormControl>
                    <FormMessage>{formErrors.tareWeight}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="netWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Weight (KG)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Auto-calculated or manual"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="operator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operator Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={transporterName}
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage>{formErrors.operator}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weighing Remarks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional remarks or observations during weighing"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                //className="bg-warning hover:bg-warning/80 text-white"
              >
                {isSubmitting ? "Recording..." : "Record Weight"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WeighbridgeForm;
