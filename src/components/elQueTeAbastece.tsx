import useStorage from "./context/storage"

export default function ElQueTeMuestraLosPedidos() {
  const {pedidoAbasto} = useStorage()
  const grid = `grid grid-cols-[3fr_1fr_1fr]`

  return <>
  <h2>Abasto</h2>
  <p>Según los pedidos en lista habrá que tener:</p>
  {pedidoAbasto().map(a => <div key={a.verdura} className={grid}>
    <p>{a.verdura}</p>
    <p className="justify-self-end">{a.cantidad}</p>
    <p className="justify-self-start">{a.unidad}</p>
  </div>)}</>
}