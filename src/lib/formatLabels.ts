// To display Gender, Role, and Role Type data using format labels in List Table
// Example: Before: DEVELOPER --- After: Developer
export function getLabelByValue(options: { label: string; value: string }[], value?: string | null) {
  if (!value) return "-";
  return options.find(opt => opt.value === value)?.label ?? value;
}
