import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  beforeLoad: ({ context }) => {
    // Redirect authenticated users away from auth pages
    if (context.isAuthed) {
      throw redirect({
        to: "/home",
      });
    }
  },
  component: PublicLayout,
});

function PublicLayout() {
  return <Outlet />;
}
