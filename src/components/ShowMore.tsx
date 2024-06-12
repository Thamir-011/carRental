'use client'

import { ShowMoreProps } from "@/types"
import { useRouter } from "next/navigation"
import CustomButton from "./CustomButton"
import { updateSearchParams } from "@/utils"
import { useTranslations } from "next-intl"

function ShowMore({ pageNumber, isNext } : ShowMoreProps) {
    const t = useTranslations("showMore")

    const router = useRouter()

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 8
        
        const newPathname = updateSearchParams("limit", `${newLimit}`)

        router.push(newPathname, { scroll: false })
    }

  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <CustomButton 
                title={t("btnText")}
                btnType="button"
                containerStyles="bg-primary-blue rounded-full text-white"
                handleClick={handleNavigation}
            />
        )}
    </div>
  )
}

export default ShowMore