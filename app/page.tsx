async function getGoods() {
  const res = await fetch(
    "https://clothica-go-it-prod-team-2-back.onrender.com/api/goods",
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data; // массив товаров
}

export default async function HomePage() {
  const goods = await getGoods();

  console.log("GOODS FROM BACKEND:", goods);

  return (
    <PopularGoods goods={goods} />
  );
}