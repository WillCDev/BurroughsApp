type ClassName = string | null | undefined | boolean

export default function joinClassNames(classnames: Array<ClassName>): string {
  return classnames
    .filter((item) => !!item)
    .join(' ')
    .replace(/ +/g, ' ')
    .trim()
}
