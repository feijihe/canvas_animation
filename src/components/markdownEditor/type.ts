export interface Selection {
  start: number
  end: number
  text: string
}

export type SelectionRange = Pick<Selection, 'start' | 'end'>

export type SelectionDirection = 'forward' | 'backward' | 'none'
