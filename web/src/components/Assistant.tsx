interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export function Assistant({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-2">
      {messages.map((m) => (
        <div
          key={m.id}
          className={m.role === "user" ? "text-right" : "text-left"}
        >
          <span
            className={
              m.role === "user"
                ? "inline-block bg-primary text-primary-foreground px-3 py-2 rounded-lg"
                : "inline-block bg-muted px-3 py-2 rounded-lg"
            }
          >
            {m.content}
          </span>
        </div>
      ))}
    </div>
  );
}
