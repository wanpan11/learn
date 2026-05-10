import type { InitialData } from './types'
import { useState } from 'react'

interface AppProps {
  initialData: InitialData
}

export function App({ initialData }: AppProps) {
  return (
    <main className="container">
      <h1>Manual SSR Demo With TypeScript</h1>
      <p className="description">
        This page is rendered to HTML on the server, then hydrated in the browser.
      </p>

      <section className="card">
        <h2>Data rendered on server</h2>
        <p>
          Message:{' '}
          {initialData.message}
        </p>
        <p>
          Server time:{' '}
          {initialData.serverTime}
        </p>
      </section>

      <section className="card">
        <h2>Hydration result</h2>
        <Counter />
      </section>
    </main>
  )
}

function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="counter">
      <p>
        Count:{' '}
        {count}
      </p>
      <button type="button" onClick={() => setCount(value => value + 1)}>
        Click after hydration
      </button>
    </div>
  )
}
