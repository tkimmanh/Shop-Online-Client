declare module 'react-rating-stars-component' {
  import { ComponentType } from 'react'

  interface ReactRatingStarsComponentProps {
    count?: number
    value?: number
    onChange?: (newValue: number) => void
    size?: number
    isHalf?: boolean
    edit?: boolean
    color?: string
    activeColor?: string
    emptyIcon?: JSX.Element
    halfIcon?: JSX.Element
    filledIcon?: JSX.Element
  }

  const ReactRatingStarsComponent: ComponentType<ReactRatingStarsComponentProps>

  export default ReactRatingStarsComponent
}
