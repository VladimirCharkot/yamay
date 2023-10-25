import { PropsWithChildren } from "react"

export default function Barra ({ children }: PropsWithChildren){
  const color_barra = `bg-amber-200 text-amber-950`
  const layout_barra = `flex flex-row h-1/16 w-full`
  const box_barra = `border-b p-12`

  return <nav className={`${color_barra} ${layout_barra} ${box_barra}`}>
    {children}
  </nav>
}