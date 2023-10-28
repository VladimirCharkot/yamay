import { useContext, useEffect, useRef } from "react"
import { AppContext } from "./appContext"
import Fuse from "fuse.js"

const kilosRegex = /(([0-9]*[.])?[0-9]+) ?(kg?|kilos?)/
const gramosRegex = /(([0-9]*[.])?[0-9]+) ?(grms|grs|gs|gr|g)/
const atadosRegex = /(\d+?) ?(ats?|atados?)/
const docenasRegex = /(\d+?) ?doc(enas?)?/
const litrosRegex = /(([0-9]*[.])?[0-9]+) ?(l|lt|lts|ltrs|litros?)/
const unidadesRegex = /(\d+?) ?(u|un|uni|unid)?/

const parseMedida = (linea: string): IMedida | undefined => {
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

const unidadesAfines: Record<TUnidad, TUnidad[]> = {
  'kg': ['kg'],
  'at': ['at', 'u'],
  'l': ['l', 'u'],
  'u': ['at', 'u', 'l'],
  'doc': ['doc']
}



export default function useParser() {

  const { productos, textoPedido, setTextoPedido, setPedido } = useContext(AppContext);

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


  const matchearTexto = (textoOriginal: string): IMatch => {
    const medidaMatcheada = parseMedida(textoOriginal)
    if (medidaMatcheada && fuse.current) {
      const resultadoMatch = fuse.current.search(textoOriginal.replace(medidaMatcheada.texto, "").trim())
      if (resultadoMatch.length > 0) {
        const productoMatcheado = resultadoMatch[0].item
        return { textoOriginal, productoMatcheado, medidaMatcheada }
      }
    }
    return { textoOriginal }
  }

  const computarProductoPedido = (m: IMatch): IProductoPedido | IMatch => {

    if(!m.productoMatcheado || !m.medidaMatcheada) return m

    // Si la unidad pedida coincide con la unidad listada...
    if(m.productoMatcheado.unidad == m.medidaMatcheada.unidad){
      return {
        textoOriginal: m.textoOriginal,
        nombre: m.productoMatcheado.nombre,
        cantidad: m.medidaMatcheada.cantidad,
        unidad: m.productoMatcheado.unidad,
        precioLista: m.productoMatcheado.precio,
        precioTotal: m.medidaMatcheada.cantidad * m.productoMatcheado.precio
      }
    }

    return m
  }


  // Cuando el texto cambie, procesamos el pedido
  useEffect(() => {
    console.log(`Parseando...`)
    const isProductoPedido = (p: IProductoPedido | IMatch): p is IProductoPedido => (p as IProductoPedido).precioTotal !== undefined
    const matches = textoPedido.split('\n').map(matchearTexto)
    console.log(`Matches:`)
    console.log(matches)
    const productosPedidos: (IProductoPedido | IMatch)[] = matches.map(computarProductoPedido)
    console.log(`Productos pedidos:`)
    console.log(productosPedidos)
    const productosConPrecio = productosPedidos.filter(isProductoPedido)
    console.log(productosConPrecio)
    setPedido(p => ({ ...p, 
      productos: productosConPrecio, 
      total: productosConPrecio.reduce((acc, r) => acc + r.precioTotal, 0) 
    }))
  }, [setPedido, textoPedido])

  return {
    textoPedido, setTextoPedido
  }

}