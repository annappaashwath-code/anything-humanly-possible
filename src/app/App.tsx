import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AmbientSoundToggle } from "./components/AmbientSoundEngine";
import { UniversalGestureLayer } from "./components/UniversalGestureLayer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-white" style={{ fontFamily: "'Onest', sans-serif" }}>
      <RouterProvider router={router} />
      <AmbientSoundToggle />
      <UniversalGestureLayer />
    </div>
  );
}
