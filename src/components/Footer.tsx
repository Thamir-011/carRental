import { useTranslations } from "next-intl"
import Image from "next/image"
import { footerLinks } from "@/constants"
import { Link } from "@/navigation"

function Footer({ locale }:{ locale: string }) {
  const t = useTranslations("footer")
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image 
            src={`/logo_${locale}.svg`}
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-base text-gray-700">
            {t("name")} 2023
            <br />
            {t("rights")} &copy;
          </p>
        </div>

        <div className="footer__links">
          {footerLinks.map((group, i) => (
            <div key={group.title} className="footer__link">
              <h3 className="font-bold">{t(`footerLinks.${i}.title`)}</h3>
              {group.links.map((link, index) => (
                <Link 
                  key={link.title}
                  href={link.url}
                  className="text-gray-500"
                >
                  {t(`footerLinks.${i}.links.${index}`)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
        <p>
          {t("rights-2")}
        </p>
        <div className="footer__copyrights-link">
          <Link href="/" className="text-gray-500">
            {t("PrivacyPolicy")}
          </Link>
          <Link href="/" className="text-gray-500">
            {t("TermsOfUse")}
          </Link>
        </div>
      </div>  
    </footer>
  )
}

export default Footer