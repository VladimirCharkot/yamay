import { MouseEventHandler, PropsWithChildren } from "react"

interface MenuItemProps extends PropsWithChildren { onClick: MouseEventHandler<HTMLDivElement> }
export default function MenuItem({ onClick, children }: MenuItemProps){
  const menu_item = `p-2 cursor-pointer`
  return <div className={menu_item} onClick={onClick}>{children}</div>
}