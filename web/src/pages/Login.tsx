import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <Button>Sign in</Button>
    </div>
  );
}
