import { Assistant } from "@/components/Assistant";
import { FileDropzone } from "@/components/FileDropzone";

export default function Workspace() {
  const messages = [
    { id: 1, role: "assistant" as const, content: "Hello!" },
    { id: 2, role: "user" as const, content: "Hi there" },
  ];

  return (
    <div className="p-4 space-y-4">
      <Assistant messages={messages} />
      <FileDropzone onFiles={(files) => console.log(files)} />
    </div>
  );
}
