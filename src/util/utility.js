export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
export const formatTime = (dateString) => {
  console.log("Formatting time for:", dateString);
  if (isValidTime(dateString)) {
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  }
  return "00:00:00"; // Default time if invalid
};

export const formatDateTime = (dateString) => {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const isValidTime = (timeString) => {
  const time = new Date(timeString);
  return !isNaN(time.getTime());
};

export const isValidDateTime = (dateTimeString) => {
  const [date, time] = dateTimeString.split(" ");
  return isValidDate(date) && isValidTime(time);
};

export const validateVehicleNumber = (vehicleNumber) => {
  const regex = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/; // Example format: AB12CD1234
  return regex.test(vehicleNumber);
};

export const validateTransporterName = (name) => {
  return name.length > 0 && name.length <= 100; // Example validation
};

export const validateDriverName = (name) => {
  return name.length > 0 && name.length <= 100; // Example validation
};

export const validateLicenseNumber = (licenseNumber) => {
  const regex = /^[A-Z0-9]{1,15}$/; // Example format: Alphanumeric, max 15 characters
  return regex.test(licenseNumber);
};

export const validateWeight = (weight) => {
  return !isNaN(weight) && weight > 0; // Example validation
};

export const validateLRNumber = (lrNumber) => {
  return lrNumber.length > 0 && lrNumber.length <= 50; // Example validation
};

export const validateLRDate = (lrDate) => {
  return isValidDate(lrDate); // Reusing the date validation function
};

export const validateInDate = (inDate) => {
  return isValidDate(inDate); // Reusing the date validation function
};

export const validateFormData = (formData) => {
  return (
    validateVehicleNumber(formData.vehicleNo) &&
    validateTransporterName(formData.transporterName) &&
    validateDriverName(formData.driverName) &&
    validateLicenseNumber(formData.licenseNumber) &&
    validateInDate(formData.inDate) &&
    validateLRNumber(formData.lrNumber) &&
    validateLRDate(formData.lrDate) &&
    (formData.weight ? validateWeight(formData.weight) : true)
  );
};
