'use client';

import Link from 'next/link';
import Image from 'next/image';
import css from './Categories.module.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type Category = {
  _id: string;
  name: string;
  image: string;
  goodsCount?: number;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(
    []
  );
  const [mounted, setMounted] = useState(false);

  const [visibleCount, setVisibleCount] = useState(3);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1439,
  });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          'https://clothica-go-it-prod-team-2-back.onrender.com/api/categories',
          {
            params: { page: 1, perPage: 10 },
          }
        );
        setCategories(data.data || []);
      } catch (error) {
        console.error(
          'Помилка при отриманні категорій:',
          error
        );
      }
    };
    fetchCategories();
  }, []);

  if (!mounted) return null;

  const visibleCategories = categories.slice(
    0,
    visibleCount
  );

  return (
    <section className={css.categoriesSection}>
      <div className={css.categories}>
        <h2 className={css.title}>Популярні категорії</h2>
        <div className={css.buttonLink}>
          <Link href="/categories" className={css.button}>
            Всі категорії
          </Link>
        </div>
      </div>

      <div className={css.categoriesContainer}>
        <ul className={css.CategoriesList}>
          <Swiper
            modules={[Navigation, Keyboard, A11y]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
              prevEl: `.${css.prevButton}`,
              nextEl: `.${css.nextButton}`,
              disabledClass: css.disabledButton,
            }}
            keyboard={{ enabled: true }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 32 },
              1440: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className={css.categoriesSwiper}
          >
            {categories.map(category => (
              <SwiperSlide key={category._id}>
                <Link
                  href={`/categories/${category._id}`}
                  className={css.CategoriesLink}
                >
                  <div className={css.imageWrapper}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={416}
                      height={277}
                      className={css.categoriesIMG}
                    />
                  </div>
                  <p className={css.categoriesText}>
                    {category.name}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>

      <div className={css.swiperButtons}>
        <button className={` ${css.prevButton}`}>
          {' '}
          <svg>
            <use href="/sprite.svg#icon-arrow-back" />
          </svg>
        </button>
        <button className={`${css.nextButton}`}>
          <svg>
            <use href="/sprite.svg#icon-arrow-forward" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Categories;
