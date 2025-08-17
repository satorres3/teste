import { useCallback } from "react";

interface FileDropzoneProps {
  onFiles: (files: FileList) => void;
}

export function FileDropzone({ onFiles }: FileDropzoneProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files) {
        onFiles(e.dataTransfer.files);
      }
    },
    [onFiles]
  );

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="flex h-32 w-full items-center justify-center rounded border-2 border-dashed"
    >
      <p className="text-sm text-muted-foreground">Drop files here</p>
    </div>
  );
}
