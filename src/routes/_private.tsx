import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  beforeLoad: ({ context }) => {
    // Redirect unauthenticated users to login
    if (!context.isAuthed) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: PrivateLayout,
});

function PrivateLayout() {
  return (
    <div className="h-dvh max-w-6xl">
      <nav className="py-4 px-8 sticky top-0 bg-background z-10">
        <img src="/symptoms.png" className="h-5" />
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
