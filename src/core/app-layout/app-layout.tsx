import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routes, RouteType } from "../../routing";

const AppLayout: React.FC = () => {
  return (
    <>
      <main className="h-full">
        <section className="h-full">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route: RouteType) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </Routes>
          </Suspense>
        </section>
      </main>
    </>
  );
};

export default AppLayout;
