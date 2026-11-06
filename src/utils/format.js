export const CATEGORIES = [
  "Electricity", "Plumbing", "AC / Cooling", "Internet / Network",
  "Appliance", "Carpentry", "Painting", "Cleaning", "Other",
];
export const fmtDate = (d) => new Date(d).toLocaleString();
export const fmtStatus = (s) => s.replace("_", " ");
