export function TexturaTejido() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 20h40M20 0v40M0 0l40 40M40 0L0 40' stroke-width='0.5' stroke='%23000' opacity='0.3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
  );
}
