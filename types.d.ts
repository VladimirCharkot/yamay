type TUnidad = 'kg' | 'at' | 'u' | 'l'

interface IProducto{
  nombre: string,
  precio: number,
  unidad: string
}

interface IProductoPedido{
  textoOriginal?: string,
  nombre: string,
  precio: number

  cantidadPedida: number,
  unidadPedida: TUnidad,

  precioLista: number,
  unidadLista: TUnidad,
}

type TEstado = "ingresando" | "recibido" | "visto" | "preparado" | "entregado"

interface IPedido{
  cliente: string,
  fecha: Date,
  productos: IProductoPedido[],
  total: number,
  estado: Estado,
  pagado: boolean
}