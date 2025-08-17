import { NavLink } from "react-router-dom";

export function Sidebar() {
  const links = [
    { to: "/hub", label: "Hub" },
    { to: "/settings", label: "Settings" },
    { to: "/knowledge", label: "Knowledge" },
  ];
  return (
    <aside className="w-48 p-4 border-r space-y-2">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            `block rounded px-2 py-1 ${isActive ? "bg-accent" : "hover:bg-muted"}`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </aside>
  );
}
