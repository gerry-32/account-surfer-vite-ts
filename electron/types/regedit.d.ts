declare module 'regedit' {
  type Keys = string | string[]
  type Dictionary<K extends string | symbol | number, V> = { [key in K]: V }

  const OS_ARCH_AGNOSTIC = 'A'
  const OS_ARCH_SPECIFIC = 'S'
  const OS_ARCH_32BIT = '32'
  const OS_ARCH_64BIT = '64'

  type Architecture =
    | typeof OS_ARCH_AGNOSTIC
    | typeof OS_ARCH_SPECIFIC
    | typeof OS_ARCH_32BIT
    | typeof OS_ARCH_64BIT
  type ErrResCallback = (err: Error | undefined, res: unknown) => unknown

  export const list = (keys: Keys, callback: ErrResCallback) => unknown
  export const list = (
    keys: Keys,
    architecture: Architecture = OS_ARCH_AGNOSTIC,
    callback?: ErrResCallback
  ) => unknown

  export const setExternalVBSLocation = (newLocation: string) => string

  type ErrCallback = (err: Error | undefined) => unknown

  export const createKey = (keys: Keys, callback: ErrCallback) => undefined
  export const createKey = (
    keys: Keys,
    architecture: Architecture = OS_ARCH_AGNOSTIC,
    callback?: ErrCallback
  ) => undefined

  export const deleteKey = (keys: Keys, callback: ErrCallback) => undefined
  export const deleteKey = (
    keys: Keys,
    architecture: Architecture = OS_ARCH_AGNOSTIC,
    callback?: ErrCallback
  ) => undefined

  export const putValue = (map: Dictionary<string, object>, callback: ErrCallback) =>
    undefined
  export const putValue = (
    map: Dictionary<string, object>,
    architecture: Architecture = OS_ARCH_AGNOSTIC,
    callback?: ErrCallback
  ) => undefined

  export const arch = {
    list: (keys: Keys, callback: ErrResCallback) => undefined,
    list32: (keys: Keys, callback: ErrResCallback) => undefined,
    list64: (keys: Keys, callback: ErrResCallback) => undefined,
    createKey: (keys: Keys, callback: ErrResCallback) => undefined,
    createKey32: (keys: Keys, callback: ErrResCallback) => undefined,
    createKey64: (keys: Keys, callback: ErrResCallback) => undefined,
    deleteKey: (keys: Keys, callback: ErrResCallback) => undefined,
    deleteKey32: (keys: Keys, callback: ErrResCallback) => undefined,
    deleteKey64: (keys: Keys, callback: ErrResCallback) => undefined,
    putValue: (keys: Keys, callback: ErrResCallback) => undefined,
    putValue32: (keys: Keys, callback: ErrResCallback) => undefined,
    putValue64: (keys: Keys, callback: ErrResCallback) => undefined
  }
}
