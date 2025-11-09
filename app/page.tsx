import Image from 'next/image';
import styles from './page.module.css';
import Categories from '@/components/CategoriesSection/Categories';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
   
        <Categories />
      </main>
    </div>
  );
}
