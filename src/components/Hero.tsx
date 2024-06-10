'use client'

import {useTranslations} from 'next-intl';
import CustomButton from './CustomButton';
import Image from 'next/image';

function Hero({ locale }:{ locale: string }) {
    const t = useTranslations('Hero');
    const handleScroll = () => {

    }    

    return (
        <div className="hero">
            <div className="flex-1 pt-36 padding-x">
                <h1 className="hero__title">
                    {t('title')}
                </h1>

                <p className='hero__subtitle'>
                    {t('subtitle')}
                </p>

                <CustomButton 
                    title={t("buttonText")}
                    containerStyles='bg-primary-blue text-white rounded-full mt-10'
                    handleClick={handleScroll}
                />
            </div>
            <div className='hero__image-container'>
                <div className='hero__image'>
                    <Image 
                        src={`/hero-${locale}.png`}
                        alt='hero image'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className={`hero__image-overlay-${locale}`}/>
            </div>
        </div>
    )
}

export default Hero