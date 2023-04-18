export const EditButton = ({ label, onEdit, disable }) => (
  <a href="/#" role="button" type="button" onClick={onEdit} disabled={disable}>
    {label}
  </a>
);
