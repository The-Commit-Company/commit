import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/toaster.tsx'
import './utils/namespace'


if (import.meta.env.DEV) {
  fetch('/api/method/commit.www.commit.get_context_for_dev', {
    method: 'POST',
  })
    .then(response => response.json())
    .then((values) => {
      const v = JSON.parse(values.message)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (!window.frappe) window.frappe = {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      frappe.boot = v
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      frappe._messages = frappe.boot["__messages"];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      frappe.model.sync(frappe.boot.docs);

    })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
)
