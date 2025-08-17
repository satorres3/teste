import { WorkspaceCard } from "@/components/WorkspaceCard";

export default function Hub() {
  const workspaces = [
    { id: "1", title: "Data Security", description: "Protect digital assets." },
    { id: "2", title: "Sales", description: "Drive growth and revenue." },
  ];

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2">
      {workspaces.map((ws) => (
        <WorkspaceCard key={ws.id} {...ws} />
      ))}
    </div>
  );
}
