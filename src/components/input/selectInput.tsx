import { ChangeEventHandler, PropsWithChildren } from "react"

interface SelectInputProps extends PropsWithChildren{
  value: string,
  onChange: ChangeEventHandler<HTMLSelectElement>
}

export default function SelectInput({value, onChange, children} : SelectInputProps){
  return <select className="bg-transparent p-2 border-b border-dashed border-amber-100" value={value} onChange={onChange}>
        {children}
      </select>
}