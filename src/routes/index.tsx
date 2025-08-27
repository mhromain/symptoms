import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    // Redirect to home if authenticated, login if not
    if (context.isAuthed) {
      throw redirect({
        to: "/home",
      });
    }
    throw redirect({
      to: "/login",
    });
  },
});
