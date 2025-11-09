import { useState, useEffect } from "react";
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

// Helper function to extract default values from the configuration array
const getDefaultValues = (configurations) => {
  const defaultValues = {};
  configurations.forEach((config) => {
    // Use fieldName as the key, and value from the data, or an empty string
    defaultValues[config.fieldName] = config.value || "";
  });
  return defaultValues;
};

// Helper function to render the appropriate field component
const renderField = (config, field, formErrors, calculateNetWeight) => {
  const { fieldType, fieldLabel, fieldName, isRequired, options, width } =
    config;

  // Custom classes for grid layout (based on your 'width' logic)
  const widthClass =
    width === "full" ? "col-span-1 md:col-span-2" : "col-span-1";

  // Determine if a field requires a custom input type
  let inputType = fieldType === "number" ? "number" : "text";
  if (fieldType === "date") inputType = "datetime-local"; // For date/time input

  const label = `${fieldLabel}${isRequired ? " *" : ""}`;

  switch (fieldType) {
    case "text":
    case "number":
    case "date":
      return (
        <FormItem className={widthClass}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={inputType}
              placeholder={`Enter ${fieldLabel}`}
              {...field}
              // Only apply blur handler for weight calculation if relevant
              onBlur={() => {
                field.onBlur();
                if (
                  fieldName === "gross_weight" ||
                  fieldName === "tare_weight"
                ) {
                  calculateNetWeight();
                }
              }}
            />
          </FormControl>
          <FormMessage>{formErrors[fieldName]}</FormMessage>
        </FormItem>
      );
    case "select":
      return (
        <FormItem className={widthClass}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${fieldLabel}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option || option.label}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage>{formErrors[fieldName]}</FormMessage>
        </FormItem>
      );
    case "textarea":
      return (
        <FormItem className={widthClass}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={`Enter ${fieldLabel}`}
              className="min-h-[80px]"
              {...field}
            />
          </FormControl>
          <FormMessage>{formErrors[fieldName]}</FormMessage>
        </FormItem>
      );
    default:
      return null;
  }
};

const WeighbridgeForm = ({ onClose, vehicleData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Destructure the configurations array
  const configurations = vehicleData?.WeighbridgeFieldConfigurations || [];

  const form = useForm({
    defaultValues: getDefaultValues(configurations),
  });

  // Watch all fields dynamically
  const formValues = form.watch();

  // Reset form when vehicleData changes
  useEffect(() => {
    if (vehicleData) {
      form.reset(getDefaultValues(configurations));
    }
  }, [vehicleData, form.reset]);

  const calculateNetWeight = () => {
    const grossWeight = formValues.gross_weight;
    const tareWeight = formValues.tare_weight;

    if (grossWeight && tareWeight) {
      const gross = parseFloat(grossWeight);
      const tare = parseFloat(tareWeight);
      if (!isNaN(gross) && !isNaN(tare)) {
        const net = gross - tare;
        form.setValue("net_weight", net.toFixed(2));
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    configurations.forEach((config) => {
      const fieldName = config.fieldName;
      const value = data[fieldName];

      // 1. Required field check
      if (config.isRequired && !value) {
        errors[fieldName] = `${config.fieldLabel} is required`;
      }

      // 2. Number validation for number fields
      if (config.fieldType === "number" && value && isNaN(parseFloat(value))) {
        errors[
          fieldName
        ] = `Please enter a valid number for ${config.fieldLabel}`;
      }
    });
    return errors;
  };

  const onSubmit = async (data) => {
    const errors = validateForm(data);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Show validation toast/message if available
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Transform the flat form data back into the expected array structure
      const updatedConfigurations = configurations.map((config) => ({
        ...config,
        value: data[config.fieldName], // Update the value from form submission
      }));

      const submissionData = {
        ...vehicleData,
        WeighbridgeFieldConfigurations: updatedConfigurations,
        // Add/Update other top-level fields like 'status' if needed
        status: "weigh_bridge_complete",
        updatedAt: new Date().toISOString(),
      };

      console.log("Weighbridge Submitted Data: ", submissionData);

      // Show success toast/message if available

      // Reset form, errors, and close dialog
      form.reset(getDefaultValues(configurations));
      setFormErrors({});
      onOpenChange(false);
    } catch (error) {
      // Show failure toast/message if available
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {configurations.map((config) => (
              <FormField
                key={config.fieldName}
                control={form.control}
                name={config.fieldName}
                render={({ field }) =>
                  renderField(config, field, formErrors, calculateNetWeight)
                }
              />
            ))}
          </div>

          {/* You may want to manually add the 'net_weight' field if it's not in the config */}
          <FormField
            control={form.control}
            name="net_weight" // Assuming you might want to add this field name
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Net Weight (KG) - Calculated</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Auto-calculated"
                    {...field}
                    disabled={true} // Net weight is usually display-only
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
              onClick={() => onClose()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Data"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default WeighbridgeForm;
