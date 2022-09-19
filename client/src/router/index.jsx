import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import routersObj from "./config";

const Loading = () => {
  return <div>loading...</div>;
};

const getRoutes = routers => {
  return routers.map(e => {
    const { path = "", component: Component, childrenList = [], title } = e;

    const arr = (
      <Route
        path={path}
        element={
          <Suspense fallback={<Loading />}>
            <Component title={title}>
              {/* Outlet 用作子路由页面出口 */}
              {childrenList.length ? <Outlet /> : null}
            </Component>
          </Suspense>
        }
        key={title}
      >
        {childrenList.length ? getRoutes(childrenList) : ""}
      </Route>
    );

    return arr;
  });
};

const App = () => {
  console.log("App ===> render");

  useEffect(() => {
    console.log("App ===> useEffect");
  });

  return (
    <BrowserRouter>
      <Routes>{getRoutes(routersObj)}</Routes>
    </BrowserRouter>
  );
};

export default App;
