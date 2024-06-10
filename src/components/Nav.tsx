import Image from "next/image"
import Link from "next/link"
import CustomButton from "./CustomButton"
import { useTranslations } from "next-intl"

function Nav({ locale }:{ locale: string }) {
  const t = useTranslations("navbar")

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

        <CustomButton 
          title={t("signIn")}
          btnType="button"
          containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
        />
      </nav>
    </header>
  )
}

export default Nav