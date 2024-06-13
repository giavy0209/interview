import { FC, useCallback, useMemo, useState } from "react";
import './popover.scss'

export interface IPopoverItemTag {
  name: string
  target?: () => any
}

export interface IPopoverItem {
  button: string
  price: string
  description?: string
  tags?: IPopoverItemTag[]
}
export enum POPOVER_POSITION {
  TOP_LEFT = "TOP_LEFT",
  TOP_CENTER = "TOP_CENTER",
  TOP_RIGHT = "TOP_RIGHT",
  MIDDLE_LEFT = "MIDDLE_LEFT",
  MIDDLE_RIGHT = "MIDDLE_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  BOTTOM_CENTER = "BOTTOM_CENTER",
  BOTTOM_RIGHT = "BOTTOM_RIGHT"
}
export interface IPopover {
  position: POPOVER_POSITION
  button: string
  items: IPopoverItem[]
  isShow? : boolean
  onSelect?: (item : IPopoverItem) => any
  onClose?: () => any
  onOpen?: () => any
}

export const Popover: FC<IPopover> = ({
  button,
  items,
  position,
  isShow,
  onClose,
  onOpen,
  onSelect,
}) => {
  const [isShowContainer, setIsShowContainer] = useState(isShow)
  const positionClassName = useMemo(() => {
    return position.toLocaleLowerCase().replace('_', '-')
  }, [position])

  const openPopOver  = useCallback(() => {
    setIsShowContainer(true)
    onOpen?.()
  },[onOpen])
  const closePopOver = useCallback(() => {
    setIsShowContainer(false)
    onClose?.()
  },[onClose])

  const selectItem = useCallback((item : IPopoverItem) => {
    setIsShowContainer(false)
    onSelect?.(item)
  },[onSelect])


  return <>
    <div className={`popover ${isShowContainer ? 'show' : ''}`}>
      <div className="close" onClick={closePopOver}></div>
      <button onClick={openPopOver}>{button}</button>
      <div className={`container ${positionClassName}`}>
        {
          items.map((item, index) => <div key={index + item.button} className="item">
            <div onClick={() => selectItem(item)} className="button">
              <p>{item.button}</p>
              <p>{item.price}</p>
            </div>
            {
              item.description && <div className="description">
                {item.description}
              </div>
            }
            {
              item.tags && <div className="tags">
                {
                  item.tags.map((tag, index) => <div onClick={() => tag.target?.()} key={index + tag.name} className="tag">{tag.name}</div>)
                }
              </div>
            }
          </div>)
        }
      </div>
    </div>

  </>
}