import { ReactElement } from 'react'
import './global.css'

export default function RootLayout({ children }): ReactElement {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}
