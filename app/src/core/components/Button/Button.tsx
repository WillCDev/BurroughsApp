import { FC, ButtonHTMLAttributes } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Button.less'
import joinClassNames from 'core/utils/joinClassNames'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  loading?: boolean
  href?: string
}

const Button: FC<Props> = ({
  text,
  style,
  className,
  loading,
  href,
  onClick,
  ...rest
}) => {
  const history = useHistory()
  const clickHandler = href ? () => history.push(href) : onClick

  return (
    <button
      className={joinClassNames([
        styles.button,
        loading && styles.loading,
        className,
      ])}
      style={style}
      onClick={clickHandler}
      {...rest}
    >
      {text}
    </button>
  )
}

export default Button
