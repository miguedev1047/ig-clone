import { create } from 'zustand'

type State = 'default' | 'pick-image' | 'share' | 'editing'

interface ManagmentPostStateProps {
  open: boolean
  openedId: string | null
  state: State
  setOpen: (open: boolean) => void
  setState: (state: State) => void
  setOpenedId: (id: string | null) => void
  reset: () => void
}

const defaulState = { open: false, openedId: null, state: 'default' } as const

export const useManagmentPost = create<ManagmentPostStateProps>((set) => ({
  ...defaulState,
  setOpen: (open) => set({ open }),
  setOpenedId: (id) => set({ openedId: id }),
  setState: (state) => set({ state }),
  reset: () => set(defaulState),
}))
