import IMask, { FactoryOpts } from "imask/esm/index"
import React, { ComponentProps, useMemo } from "react"
import { Text } from "react-native"

interface Props extends ComponentProps<typeof Text> {
  mask: FactoryOpts
}

export const MaskedText = ({ mask, children, ...props }: Props) => {
  const value = useMemo(() => {
    const maskCreated = IMask.createMask(mask)
    maskCreated.resolve(children as string)
    return maskCreated.value
  }, [mask, children])

  return <Text {...props}>{value}</Text>
}
