import CarCard from '@/components/CarCard';
import CustomFilter from '@/components/CustomFilter';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import ShowMore from '@/components/ShowMore';
import { fuels, yearsOfProduction } from '@/constants';
import { FilterProps } from '@/types';
import { fetchCars } from '@/utils';
import {useTranslations} from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';


interface HomeProps {
  params: {
    locale: string
  },
  searchParams: FilterProps
}

export default function Home({ params, searchParams } : HomeProps) {
  const t = useTranslations('Index');

  const allCars = use(fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 8,
    model: searchParams.model || ''
  }))
  
  
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero
        locale={params.locale}
      />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>
            {t("carCatalogueTitle")}
          </h1>
          <p>
            {t("carCatalogueSubtitle")}
          </p>
        </div>
        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car, i) => <CarCard key={i} car={car}/>)}
            </div>

            <ShowMore 
              pageNumber={(searchParams.limit || 8) / 8}
              isNext={(searchParams.limit || 8) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>
              {t("noResult")}
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}


      </div>
    </main>
  );
}
