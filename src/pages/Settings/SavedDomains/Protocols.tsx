import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Protocols = ({ domainObj, onChange }: any) => {
  const allProtocols = new Set(['https, http', 'https', 'http'])
  const selectedProtocolsStr = domainObj.protocols?.join(', ')
  allProtocols.add(selectedProtocolsStr)

  return (
    <Listbox value={selectedProtocolsStr} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative inline-flex">
            <Listbox.Button className="relative bg-gray-700 w-auto pl-1 pr-6 py-1 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm text-gray-300 font-medium align-top">
              <span className="block truncate">{selectedProtocolsStr}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                <SelectorIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-auto bg-gray-600 shadow-lg max-h-[200px] py-1 text-sm overflow-auto focus:outline-none sm:text-sm">
                {[...allProtocols].map(possibleProtocol => (
                  <Listbox.Option
                    key={possibleProtocol}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-200',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={possibleProtocol}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {possibleProtocol}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Protocols
