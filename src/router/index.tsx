import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import StoryRefinerMain from "../views/StoryRefiner/StoryRefinerMain";

export default function Router() {
  return (
    <Suspense fallback={<StoryRefinerMain />}>
      <Routes>
        {/* Auto redirect root to /home */}
        <Route path="/" element={<Navigate to="/story-analysis" replace />} />
        {/*  @ts-ignore */}
        {routes.map(({ id, component, path }) => (
          <Route key={id} element={component} path={path} />
        ))}
      </Routes>
    </Suspense>
  );
}
