type Props = {
  label: string;
  required?: boolean;
};

export const EmployeeFormLabel = ({ label, required = false }: Props) => {
  return (
    <label className="mb-1 block pl-0.5 text-sm font-medium">
      <span>{label}</span>
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  );
};
