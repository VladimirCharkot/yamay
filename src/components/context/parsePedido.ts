import { useContext, useEffect, useRef } from "react"
import { AppContext } from "./appContext"
import Fuse from "fuse.js"

const floatRegex = /([0-9]*[.])?[0-9]+/
const kilosRegex = /(([0-9]*[.])?[0-9]+) ?(kg?|kilos?)/
const gramosRegex = /(([0-9]*[.])?[0-9]+) ?(grms|grs|gs|gr|g)/
const atadosRegex = /(\d+?) ?atados?/
const docenasRegex = /(\d+?) ?doc(enas?)?/
const litrosRegex = /(([0-9]*[.])?[0-9]+) ?(l|lt|lts|ltrs|litros?)/
const unidadesRegex = /(\d+?) ?u?/

const parseMedida = (linea: string) => {
  const matchKilos = linea.match(kilosRegex)
  const matchGramos = linea.match(gramosRegex)
  const matchAtado = linea.match(atadosRegex)
  const matchDocenas = linea.match(docenasRegex)
  const matchLitros = linea.match(litrosRegex)
  const matchUnidades = linea.match(unidadesRegex)
  if (matchKilos) return { texto: matchKilos[0], cantidad: parseFloat(matchKilos[0]), unidad: 'kg' }
  if (matchGramos) return { texto: matchGramos[0], cantidad: parseFloat(matchGramos[0]) / 1000, unidad: 'kg' }
  if (matchAtado) return { texto: matchAtado[0], cantidad: parseInt(matchAtado[0]), unidad: 'at' }
  if (matchDocenas) return { texto: matchDocenas[0], cantidad: parseInt(matchDocenas[0]), unidad: 'doc' }
  if (matchLitros) return { texto: matchLitros[0], cantidad: parseFloat(matchLitros[0]), unidad: 'l' }
  if (matchUnidades) return { texto: matchUnidades[0], cantidad: parseInt(matchUnidades[0]), unidad: 'u' }
}

const unidadesAfines: Record<string, string[]> = {
  'kg': ['kg'],
  'at': ['at', 'u'],
  'l': ['l', 'u'],
  'u': ['at', 'u', 'l']
}

export default function useParser(){

    const { productos, textoPedido, setPedido } = useContext(AppContext);

    const fuse = useRef<Fuse<IProducto> | null>(null);
  
    // Cuando la lista de productos cambie, recreamos el buscador fuzzy
    useEffect(() => {
      const prods = Array.from(productos)

      const options = {
        includeScore: true,
        keys: ['nombre'],
        threshold: 0.6
      }

      fuse.current = new Fuse(prods, options);
    }, [productos]);

    
    // Cuando el texto cambie, procesamos el pedido
    useEffect(() => {

      // Spliteamos por línea
      const lineas = textoPedido.split('\n')

      // Parseamos las medidas y las extraemos
      const conMedidas = lineas.map(txt => ({ txt, medidaPedida: parseMedida(txt) }))
      const medidasStripeadas = conMedidas.map(r => ({ ...r, txtSinMedida: r.medidaPedida ? r.txt.replace(r.medidaPedida.texto, "").trim() : r.txt }))

      // Matcheamos contra la lista de productos
      const matchsEncontrados = medidasStripeadas.map(r => ({ ...r, match: fuse.current ? fuse.current.search(r.txtSinMedida) : null }))
      
      // Agregamos 
      const results = matchsEncontrados.map(r => ({
        ...r,
        productoMatcheado: r.match ? r.match[0]?.item.nombre : null,
        // productoMatcheado: r.match.length > 0 ? r.match[0].item.nombre + ` (${r.match[0].score?.toFixed(2)})` : "No match",
        matchMedidas: r.medidaPedida && r.match && r.match[0] && unidadesAfines[r.medidaPedida.unidad].includes(r.match[0].item.unidad),
        precioCalculado: r.medidaPedida && r.match && r.match[0] && (unidadesAfines[r.medidaPedida.unidad].includes(r.match[0].item.unidad) ? r.medidaPedida.cantidad * r.match[0].item.precio : 0)
      }))
  
      const productosPedidos: IProductoPedido[] = results.map(r => ({
        ...r,
        textoOriginal: r.txt,
  
        cantidadPedida: r.medidaPedida?.cantidad ?? 0,
        unidadPedida: (r.medidaPedida?.unidad ?? 'u') as TUnidad,
  
        precioLista: r.match && r.match[0] ? r.match[0].item.precio : 0,
        unidadLista: (r.medidaPedida?.unidad ?? 'u') as TUnidad,
  
        nombre: r.productoMatcheado ?? "No encontrado",
      })).map(r => ({
        ...r,
        precio: r.precioLista ? r.cantidadPedida * r.precioLista : 0
      }))
  
      console.log(productosPedidos)

      const tienePrecio = (p: any) => p.precio !== undefined && p.precio !== null
  
      setPedido(p => ({ ...p, productos: productosPedidos, total: productosPedidos.filter(tienePrecio).reduce((acc, r) => acc + r.precio, 0) }))
    }, [setPedido, textoPedido])

}