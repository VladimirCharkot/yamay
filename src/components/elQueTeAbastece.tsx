import useStorage from "./context/storage"

export default function ElQueTeMuestraLosPedidos() {
  const { pedidoAbasto } = useStorage()
  const grid = `grid grid-cols-[3fr_1fr_1fr]`
  console.log(pedidoAbasto())
  return <>
    <h2>Abasto</h2>
    <p>Según los pedidos en lista habrá que tener:</p>
    {pedidoAbasto().map(a => <div key={a.verdura} className={grid}>
      <p>{a.verdura}</p>
      {a.unidad == "kg" && a.cantidad < 1 && <>
        <p className="justify-self-end">{a.cantidad * 1000}</p>
        <p className="justify-self-start">gr</p>
      </>}
      {(a.unidad != "kg" || a.cantidad >= 1) && <>
        <p className="justify-self-end">{a.cantidad}</p>
        <p className="justify-self-start">{a.unidad}</p>
      </>}
    </div>)}</>
}