import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/hub" />;
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <Button onClick={login}>Sign in</Button>
    </div>
  );
}
