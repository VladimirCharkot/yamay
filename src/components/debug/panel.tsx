import { useState } from "react"

export default function PanelDeDebug(){
  const nightMode = useState(false)
  const lightColors = `bg-white text-black`
  const darkColors = `bg-black text-white`
  return <div className={`absolute ${nightMode ? darkColors : lightColors}`}>
    
  </div>
}