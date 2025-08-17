import { NavLink } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export function Sidebar() {
  const { user, logout } = useAuth();
  const links = [
    { to: "/hub", label: "Hub" },
    { to: "/settings", label: "Settings" },
    { to: "/knowledge", label: "Knowledge" },
  ];
  return (
    <aside className="w-48 p-4 border-r space-y-2">
      {user && (
        <div className="mb-4 space-y-1">
          <div className="text-sm break-words">{user.email}</div>
          <button className="text-xs text-red-500" onClick={logout}>
            Logout
          </button>
        </div>
      )}
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
