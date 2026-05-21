import type { InitialData } from "./types";
import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useState } from "react";

// ── 类型定义 ──
interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface AppProps {
  initialData: InitialData;
}

// ── 页面组件 ──
export function App({ initialData }: AppProps) {
  return (
    <main className="container">
      <h1>Manual SSR Demo With TypeScript</h1>
      <p className="description">This page is rendered to HTML on the server, then hydrated in the browser.</p>

      <section className="card">
        <h2>Data rendered on server</h2>
        <p>Message: {initialData.message}</p>
        <p>Server time: {initialData.serverTime}</p>
      </section>

      <section className="card">
        <h2>Hydration result</h2>
        <ClientOnly fallback={<p>Count: 0</p>}>
          <Counter />
        </ClientOnly>
      </section>
    </main>
  );
}

// ── 客户端边界 ──
function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : fallback;
}

// ── 计数器组件 ──
function Counter() {
  const [count, setCount] = useState<number>(0);

  // ── 副作用 ──
  useLayoutEffect(() => {
    console.log("[ useLayoutEffect ] ===>");
    setCount(1);

    return () => {
      console.log("[ useLayoutEffect cleanup ] ===>");
    };
  }, []);

  // ── 副作用 ──
  useEffect(() => {
    console.log("Counter component updated");
    console.log("[ count ] ===>", count);

    return () => {
      console.log("[ useEffect cleanup ] ===>");
    };
  }, []);

  // ── 渲染 ──
  return (
    <div className="counter">
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Click after hydration
      </button>
    </div>
  );
}
