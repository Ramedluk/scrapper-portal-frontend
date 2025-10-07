export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "success":
      return "success";
    case "partial":
      return "warning";
    case "failed":
      return "error";
    case "started":
      return "processing";
    default:
      return "default";
  }
};

export const getStatusText = (status: string) => {
  switch (status?.toLowerCase()) {
    case "success":
      return "Completed";
    case "partial":
      return "Partially Completed";
    case "failed":
      return "Failed";
    case "started":
      return "In Progress";
    default:
      return "Unknown";
  }
};
