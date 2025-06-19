import { ProductItem, SectionTitle } from "@/components";
import React from "react";

interface Props {
  searchParams: { search: string };
}

// отправка запроса API для результатов поиска по заданному тексту
const SearchPage = async ({ searchParams: { search } }: Props) => {
  const data = await fetch(
    `http://localhost:3001/api/search?query=${search || ""}`
  );

  const products = await data.json();

  return (
    <div>
      <SectionTitle title="Страница поиска" path="Главная | Поиск" />
      <div className="max-w-screen-2xl mx-auto">
        {search && (
          <h3 className="text-4xl text-center py-10 max-sm:text-3xl">
            Показаны результаты по запросу {search}
          </h3>
        )}
        <div className="grid grid-cols-4 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
          {products.length > 0 ? (
            products.map((product: Product) => (
              <ProductItem key={product.id} product={product} color="black" />
            ))
          ) : (
            <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
              Товары по указанному запросу не найдены
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
