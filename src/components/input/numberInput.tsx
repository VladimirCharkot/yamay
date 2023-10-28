import { useEffect, useState } from 'react';

interface NumberInputProps {
  value: number,
  onChange: (n: number) => void
  // setNaN: Dispatch<SetStateAction<boolean>>
}

const NumberInput = ({ value, onChange }: NumberInputProps) => {
  const [valorTexto, setValorTexto] = useState(value ? value.toString() :'')
  const [focus, setFocus] = useState(false)
  const [nan, setNaN] = useState(false)

  useEffect(() => {
    if (valorTexto != "") {
      const n = parseInt(valorTexto)
      if (!isNaN(n)) {
        onChange(n)
        setNaN(false)
      } else {
        setNaN(true)
      }
    } else {
      onChange(0)
    }
  }, [valorTexto])

  return (<><input className={`bg-transparent border-b border-dashed border-amber-100 focus:outline-none text-center ${value == 0 ? 'text-[#82bcab]' : ''}`}
      pattern="[0-9]*"
      value={value == 0 && !focus ? "-" : "$" + valorTexto}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onKeyDown={(e) => {
        if (!/[0-9]/.test(e.key) && !["Backspace", "ArrowRight", "ArrowLeft"].includes(e.key)) {
          e.preventDefault()
        } else {
          if (/[0-9]/.test(e.key)) { setValorTexto(v => v + e.key) }
          if (e.key == "Backspace") { setValorTexto(v => v.slice(0, v.length - 1)) }
        }
      }}
      onChange={() => {}} />
  </>)
}

export default NumberInput