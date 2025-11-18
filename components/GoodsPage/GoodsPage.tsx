'use client';

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  useSearchParams,
  useRouter,
} from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Good, GetGoodsParams } from '@/types/goods';
import {
  getGoods,
  getCategories,
} from '@/lib/api/clientApi';
import SideBarGoods from '../../app/goods/filter/@sidebar/SideBarGoods';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import Loader from '../Loader/Loader';
import styles from './GoodsPage.module.css';
import Link from 'next/link';

export interface CategoryItem {
  _id: string;
  name: string;
  image: string;
  goodsCount: number;
  availableSizes?: string[];
}

export interface SelectedFilters {
  category?: string;
  size: string[];
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
}

export default function GoodsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(1);
  const perPage = 15;

  const isFirstRender = useRef(true);

  const externalFilters = useMemo<SelectedFilters>(() => {
    const category =
      searchParams.get('category') || undefined;
    const gender = searchParams.get('gender') || undefined;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sizes = searchParams.getAll('size');

    return {
      category,
      gender,
      size: sizes ?? [],
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };
  }, [searchParams]);

  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFilters>({
      category: undefined,
      size: [],
      gender: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });

  useEffect(() => {
    if (isFirstRender.current) {
      setSelectedFilters(externalFilters);
      isFirstRender.current = false;
    }
  }, [externalFilters]);

  const categoriesQuery = useQuery<CategoryItem[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const cats = await getCategories();
      return cats.map(c => ({
        _id: c._id,
        name: c.name,
        image: c.image,
        goodsCount: c.goodsCount ?? 0,
        availableSizes: c.availableSizes,
      }));
    },
    staleTime: 1000 * 60 * 10,
  });

  const filters = {
    categories: categoriesQuery.data ?? [],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    genders: [
      { label: 'Всі', value: '' },
      { label: 'Жіноча', value: 'women' },
      { label: 'Чоловіча', value: 'man' },
      { label: 'Унісекс', value: 'unisex' },
    ],
  };

  const goodsQuery = useQuery<{
    data: Good[];
    totalGoods: number;
  }>({
    queryKey: ['goods', selectedFilters, page],
    queryFn: async () => {
      const params: GetGoodsParams = {
        page,
        perPage,
        category: selectedFilters.category,
        size: selectedFilters.size.length
          ? selectedFilters.size
          : undefined,
        gender: selectedFilters.gender,
        minPrice: selectedFilters.minPrice,
        maxPrice: selectedFilters.maxPrice,
      };
      return await getGoods(params, page, perPage);
    },
    refetchOnWindowFocus: false,
  });

  const goods: Good[] = goodsQuery.data?.data ?? [];
  const totalGoods: number =
    goodsQuery.data?.totalGoods ?? 0;
  const isFetching = goodsQuery.isFetching;

  useEffect(() => {
    setPage(1);
  }, [selectedFilters]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedFilters.category)
      params.set('category', selectedFilters.category);
    selectedFilters.size.forEach(s =>
      params.append('size', s)
    );
    if (selectedFilters.gender)
      params.set('gender', selectedFilters.gender);
    if (selectedFilters.minPrice)
      params.set(
        'minPrice',
        String(selectedFilters.minPrice)
      );
    if (selectedFilters.maxPrice)
      params.set(
        'maxPrice',
        String(selectedFilters.maxPrice)
      );

    const newUrl = `/goods?${params.toString()}`;
    const currentUrl =
      window.location.pathname + window.location.search;

    if (newUrl !== currentUrl) {
      router.replace(newUrl);
    }
  }, [selectedFilters, router]);

  if (goodsQuery.isLoading) return <Loader />;

  const handleClearAll = () => {
    setSelectedFilters({
      category: undefined,
      size: [],
      gender: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  const handleCategoryClick = (id?: string) => {
    const cat = filters.categories.find(c => c._id === id);
    const avail = cat?.availableSizes ?? [];

    setSelectedFilters(prev => ({
      ...prev,
      category: id,
      size: prev.size.filter(s => avail.includes(s)),
    }));
  };

  return (
    <section className={styles.wrapper}>
      <aside className={styles.container}>
        <SideBarGoods
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          totalGoods={totalGoods}
          goodsLength={goods.length}
        />
      </aside>

      <main className={styles.mainContent}>
        {goods.length > 0 ? (
          <>
            <div className={styles.goodsGrid}>
              {goods.map(item => (
                <div key={item._id}>
                  <div className={styles.card}>
                    <div className={styles.imageBox}>
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className={styles.info}>
                      <h3 className={styles.title}>
                        {item.name}
                      </h3>
                      <div className={styles.row}>
                        <span className={styles.price}>
                          {item.price.value}{' '}
                          {item.price.currency || '₴'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/goods/${item._id}`}
                    className={styles.moreBtn}
                  >
                    Детальніше
                  </Link>
                </div>
              ))}
            </div>

            {goods.length < totalGoods && (
              <div className={styles.showMoreWrapper}>
                <button
                  disabled={isFetching}
                  onClick={() => setPage(p => p + 1)}
                  className={styles.showMoreBtn}
                >
                  {isFetching
                    ? 'Завантаження…'
                    : 'Показати більше'}
                </button>
              </div>
            )}
          </>
        ) : (
          <MessageNoInfo onClearFilters={handleClearAll} />
        )}
      </main>
    </section>
  );
}
