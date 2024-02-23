import { isNumber } from "advanced-cropper"
import cn from "classnames"
import { Minus, Plus } from "lucide-react"
import { FC } from "react"

import { Slider } from "../slider/slider"
import "./styles.scss"

interface Props {
  zoom?: number
  onZoom?: (value: number, transitions?: boolean) => void
  className?: string
  disabled?: unknown
}

export const Navigation: FC<Props> = ({ className, onZoom, zoom }) => {
  const onZoomIn = () => {
    if (onZoom && isNumber(zoom)) {
      onZoom(Math.min(1, zoom + 0.25), true)
    }
  }

  const onZoomOut = () => {
    if (onZoom && isNumber(zoom)) {
      onZoom(Math.max(0, zoom - 0.25), true)
    }
  }

  return (
    <div className={cn("fixed-cropper-navigation", className)}>
      <button className="fixed-cropper-navigation__button" onClick={onZoomOut} type="button">
        <Minus />
      </button>
      <Slider value={zoom} onChange={onZoom} className="fixed-cropper-navigation__slider" />
      <button className="fixed-cropper-navigation__button" onClick={onZoomIn} type="button">
        <Plus />
      </button>
    </div>
  )
}
