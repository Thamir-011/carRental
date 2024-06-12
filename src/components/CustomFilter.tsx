'use client'

import { CustomFilterPros } from "@/types"
import { updateSearchParams } from "@/utils"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Fragment, useState } from "react"

function CustomFilter({ title, options } : CustomFilterPros) {
  const t = useTranslations("customFilter")
  const router = useRouter()
  const [selected, setSelected] = useState(options[0])

  const handleUpdateParams = (e: {title: string, value: string}) => {
    const newPathname = updateSearchParams(title, e.value.toLowerCase())

    router.push(newPathname, { scroll: false })
  }

  const handleSelectedTranselation = (selection: string) => {
    return isNaN(+selection) ? t(`${title}.${selection.toLowerCase()}`) : selection
  }

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={e => {
          setSelected(e);
          handleUpdateParams(e)
        }}
      >
        <div className="relative w-fit z-10">
          <ListboxButton className="custom-filter__btn">
            <span className="block truncate">{handleSelectedTranselation(selected.title)}</span>
            <Image 
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="object-contain"
              alt="chevron up down"
            />
          </ListboxButton>
          <Transition 
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className='custom-filter__options'
            >
              {options.map(option => (
                <ListboxOption
                  key={option.title}
                  value={option}
                  className={({ active }) => `relative cursor-default select-none py-2 px-4 ${
                    active ? 'bg-primary-blue text-white' : 'text-gray-900'
                  }`}
                >
                  {({selected}) => (
                    <span className={`block truncate ${
                      selected ? 'font-bold' : "font-normal"
                    }`}>
                      { handleSelectedTranselation(option.title) }
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>  
    </div>
  )
}

export default CustomFilter