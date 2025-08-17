import { Link } from "react-router-dom";

interface WorkspaceCardProps {
  id: string;
  title: string;
  description: string;
}

export function WorkspaceCard({ id, title, description }: WorkspaceCardProps) {
  return (
    <Link
      to={`/workspace/${id}`}
      className="block p-4 border rounded-lg shadow hover:bg-accent"
    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
