"use client";

import GoodsOrderList from "@/components/CreateOrder/GoodsOrderList";
import CreateOrderForm from "@/components/CreateOrder/CreateOrderForm";
import { useBasketStore } from "@/lib/store/basketStore";
import styles from "@/app/orders/createOrder.module.css";

const CreateOrder = () => {
  const items = useBasketStore(state => state.items);

  return (
    <section className={styles.orderPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Оформити замовлення</h1>

        <div className={styles.sectionsWrapper}>
          <GoodsOrderList />
          <CreateOrderForm />
        </div>
      </div>
    </section>
  );
};

export default CreateOrder;
