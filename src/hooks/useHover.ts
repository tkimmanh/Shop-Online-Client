import { useEffect, useState, useRef } from 'react'

interface HoverResult<T extends HTMLElement> {
  hovered: boolean
  nodeRef: React.RefObject<T | null> | any
}

export default function useHover<T extends HTMLElement>(): HoverResult<T> {
  const [hovered, setHovered] = useState<boolean>(false)
  const nodeRef = useRef<T | null>(null)

  useEffect(() => {
    function handleMouseOver() {
      setHovered(true)
    }

    function handleMouseOut() {
      setHovered(false)
    }

    const dom = nodeRef.current

    if (dom) {
      dom.addEventListener('mouseover', handleMouseOver)
      dom.addEventListener('mouseout', handleMouseOut)
    }

    return () => {
      if (dom) {
        dom.removeEventListener('mouseover', handleMouseOver)
        dom.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [])

  return {
    hovered,
    nodeRef
  }
}
