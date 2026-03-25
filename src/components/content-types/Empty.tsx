interface EmptyProps {
  contentType: string;
}

export function CustomNoComponent({ contentType }: EmptyProps) {
  return (
    <div className="empty-component">
      There is no component for&nbsp;<strong>{contentType}</strong>&nbsp;content type.
    </div>
  );
}
