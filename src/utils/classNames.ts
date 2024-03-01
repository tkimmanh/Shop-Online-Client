export default function classNames(...args: any) {
  return args
    .reduce((acc: any[], val: string | { [s: string]: unknown } | ArrayLike<unknown>) => {
      if (typeof val === 'string') {
        return acc.concat(val.split(' '))
      }
      return acc.concat(Object.values(val))
    }, [])
    .join(' ')
}
