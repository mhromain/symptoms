// src/routes/login.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/login")({
  component: Login,
});

function Login() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const login = async () => {
    // const user = await apiFetch<{ id: string; username: string }>(
    //   "/authentication/2FA_login",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({ username: "mhadmin", password: "mhadmin" }),
    //   }
    // );
    useAuth.getState().login({ id: "1", username: "mhadmin" });
    queryClient.invalidateQueries({ queryKey: ["session"] });
    navigate({ to: "/home" });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <img src="/symptoms.png" className="h-8 mb-1" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Identifiant</Label>
                    <Input id="username" placeholder="Aa" required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full" onClick={login}>
                    Connexion LDAP
                  </Button>
                </div>
              </form>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/image.jpg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover brightness-70"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
