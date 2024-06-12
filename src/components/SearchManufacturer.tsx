'use client'

import { SearchManufacturerProps } from "@/types"
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react"
import Image from "next/image"
import { Fragment, useState } from "react"
import { manufacturers } from "@/constants"
import { useTranslations } from "next-intl"

function SearchManufacturer({ manufacturer, setManufacturer } : SearchManufacturerProps) {

  const [query, setQuery] = useState("")

  const t = useTranslations("searchManufacturer")
  const getManufacturerTranslation = (manufacturer: string) => {
    if (manufacturer === "") return ""
    return t(`companiesList.${manufacturer}.name`)
  }
  

  const filterdManufacturers = query === "" 
  ? manufacturers 
  : manufacturers.filter(item => (
      getManufacturerTranslation(item).toLowerCase().replace(/\s+/g, "").includes (query.toLowerCase().replace(/\s+/g, ""))
    )
  )



  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <ComboboxButton className="absolute top-[14px]">
            <Image 
              src="/car-logo.svg"
              width={20}
              height={20}
              className="mx-4"
              alt="car logo"
            />
          </ComboboxButton>

          <ComboboxInput 
            className="search-manufacturer__input"
            placeholder={t("make")}
            displayValue={(manufacturer: string) => getManufacturerTranslation(manufacturer)}
            onChange={e => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <ComboboxOptions>
              {filterdManufacturers.length === 0 && query !== "" ? (
                <ComboboxOption
                  value={query}
                  className="search-manufacturer__option"
                >
                  {t("noResult")}
                </ComboboxOption>
              ) : (
                filterdManufacturers.map(item => (
                  <ComboboxOption
                    key={item}
                    className={({active}) => `relative search-manufacturer__option ${active ? "bg-primary-blue text-white" : "text-gray-900"}`}
                    value={item}
                  >
                    {({ focus, selected }) => (
                      <div className={`group flex gap-2 ${selected && 'font-bold'}`}>
                        {getManufacturerTranslation(item)}
                      </div>
                    )}
                    {/* {t(`companiesList.${item}.name`)} */}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer