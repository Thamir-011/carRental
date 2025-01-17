import Image from "next/image"
import CustomButton from "./CustomButton"
import { useTranslations } from "next-intl"
import { Link } from "@/navigation"

function Nav({ locale }:{ locale: string }) {
  const t = useTranslations("navbar")

  const handleLocaleLink = () => {
    if (locale === "ar") return "en"
    else if (locale === "en") return "ar"
  }

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image 
            src={locale === "ar" ? "/logo_ar.svg" : "/logo_en.svg"}
            alt="Khayal Logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        <div className="flex gap-1 items-center">
          <CustomButton 
            title={t("signIn")}
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
          />
          <div className="">
            <Link
              href="/"
              locale={handleLocaleLink()}
              className="flex justify-center items-center relative text-primary-blue rounded-full bg-white py-1 px-2 font-bold"
            >
              {t("langBtn")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Nav