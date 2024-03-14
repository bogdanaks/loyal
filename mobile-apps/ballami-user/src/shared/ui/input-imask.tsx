import IMask from "imask"
import { FactoryOpts, FactoryReturnMasked } from "imask/esm/index"
import React, { ComponentProps, useEffect, useRef, useState } from "react"

import { Input } from "./input"

type Props = {
  onChangeText?: (masked: string, unmasked: string) => void
} & Omit<ComponentProps<typeof Input>, "onChangeText"> & { opts: FactoryOpts }

export const InputImask = ({ value: inputValue, onChangeText, opts, ...props }: Props) => {
  const maskRef = useRef<FactoryReturnMasked<typeof opts> | null>(null)
  const [value, setValue] = useState<string | undefined>(undefined)

  const resolve = (text: string) => {
    if (!maskRef.current) {
      return { value: "", unmaskedValue: "" }
    }

    maskRef.current.resolve(text)

    return {
      value: maskRef.current.value,
      unmaskedValue: maskRef.current.unmaskedValue,
    }
  }

  const handleChangeText = (text: string) => {
    if (onChangeText) {
      const { value, unmaskedValue } = resolve(text)
      onChangeText(value, unmaskedValue)
    }
  }

  useEffect(() => {
    maskRef.current = IMask.createMask(opts)

    return () => {
      if (maskRef.current) {
        maskRef.current = null
      }
    }
  }, [opts])

  useEffect(() => {
    if (!maskRef.current) {
      return
    }
    if (!inputValue) {
      maskRef.current.value = ""
      maskRef.current.unmaskedValue = ""
      setValue(inputValue ?? "")
      return
    }

    const { value: resolved } = resolve(inputValue)
    setValue(resolved)
  }, [inputValue, maskRef])

  return <Input value={value} onChangeText={handleChangeText} {...props} />
}
