export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ cursor: "auto" }} className="[&_*]:!cursor-auto">
      {children}
    </div>
  );
}
