import { Patrick_Hand_SC } from 'next/font/google'
import { useState } from 'react'
import ElQueTeLenvantaPedidos from '@/components/elQueTeLevantaPedidos'
import ElQueTeIngresaLosPrecios from '@/components/elQueTeIngresaLosPrecios'
import ElQueTeMuestraPedidos from '@/components/elQueTeMuestraPedidos'
import MenuItem from '@/components/layout/barraItem'
import Barra from '@/components/layout/barra'

const patrick = Patrick_Hand_SC({ subsets: ['latin'], weight: "400" })

export default function Home() {
  const [tab, setTab] = useState('precios')

  // const colores = ["#F8F0E5", "#EADBC8", "#DAC0A3","#102C57"]

  const color_main = `${patrick.className} text-amber-100 bg-amber-950`
  const layout_main = 'flex flex-col min-h-screen items-center'

  return (
    <main className={`${color_main} ${layout_main}`} >
      <Barra>
        <MenuItem onClick={() => setTab('precios')} >Precios y costos</MenuItem>
        <MenuItem onClick={() => setTab('ingresar_pedido')} >Ingresar pedido</MenuItem>
        <MenuItem onClick={() => setTab('ver_pedidos')} >Ver pedidos</MenuItem>
      </Barra>
      <div className='p-12'>
        {tab == "precios" && <ElQueTeIngresaLosPrecios />}
        {tab == "ingresar_pedido" && <ElQueTeLenvantaPedidos />}
        {tab == "ver_pedidos" && <ElQueTeMuestraPedidos  />}
      </div>
    </main>
  )
}



