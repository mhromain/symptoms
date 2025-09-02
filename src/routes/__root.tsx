import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouterContext {
  queryClient: QueryClient;
  isAuthed: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return <Outlet />;
  },
});
