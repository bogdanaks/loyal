import IMask from "imask"

export const timeMask = {
  mask: "HH:MM",
  unmask: true,
  name: "time",
  inputMode: "numeric",
  lazy: true,
  autofix: true,
  overwrite: true,
  blocks: {
    HH: {
      mask: IMask.MaskedRange,
      placeholderChar: "_",
      from: 0,
      to: 23,
      maxLength: 2,
    },
    MM: {
      mask: IMask.MaskedRange,
      placeholderChar: "_",
      from: 0,
      to: 59,
      maxLength: 2,
    },
  },
}

export const phoneMask = {
  mask: "+{7} (000) 000-00-00",
}

export const birthdayMask = {
  mask: Date,
}

export const otpMask = {
  mask: "0000",
}

export const numberMask = {
  mask: Number,
  normalizeZeros: true,
  maxLength: 2,
  from: 1,
  to: 99,
  autofix: true,
  max: 99,
  min: 1,
}
