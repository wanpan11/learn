import type { InitialData } from './types'
import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { INITIAL_DATA_KEY } from './types'

declare global {
  interface Window {
    [INITIAL_DATA_KEY]?: InitialData
  }
}

const rootElement = document.getElementById('root')
const initialData = window[INITIAL_DATA_KEY]

if (!rootElement || !initialData) {
  throw new Error('Missing root element or initial SSR data.')
}

hydrateRoot(rootElement, <App initialData={initialData} />)
