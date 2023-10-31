import { MouseEventHandler } from "react"

interface BotonProps{
  onClick: MouseEventHandler<HTMLButtonElement>,
  txt: string,
  tw?: string
}

export const Boton = ({onClick, txt, tw}: BotonProps) => {
  return <button className={`rounded-lg bg-amber-100 text-amber-800 p-2 ${tw}`} onClick={onClick}>{txt}</button>
}