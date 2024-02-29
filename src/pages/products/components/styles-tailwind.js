import tw from "tailwind-styled-components"
import { Combobox } from "@fluentui/react-components"

export const ButtonPrimary = tw.button`
  flex
  justify-center
  items-center
  gap-2
  bg-tx-green-500
  hover:opacity-75
  text-tx-green-950
  px-4
  py-2
  rounded-md
  
`
export const InputForm = tw.input`
  w-full
  p-3
  focus:outline-none
  focus-visible:outline-none
  bg-neutral-600
  rounded-lg
`
export const TextareaForm = tw.textarea`
  w-full
  p-3
  focus:outline-none
  focus-visible:outline-none
  bg-neutral-600
  rounded-lg
`

export const ComboBoxFluent = tw(Combobox)`
  w-full
  p-2
  !border-0
  focus:outline-none
  focus-visible:outline-none
  !bg-neutral-600
  !rounded-lg
`

export const defaultExport = {}
