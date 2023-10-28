import { ChangeEventHandler } from "react"

interface TextInputProps{
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  tw?: string
}

export default function TextInput({ value, onChange, tw }: TextInputProps){
  return <input className={`bg-transparent border-b border-dashed border-amber-100 focus:outline-none hover:bg-amber-900 focus:bg-bg-amber-800 w-full p-3 ${tw ?? ''}`} value={value} onChange={onChange}/>
}