// *********************
// Role of the component: Classical hero component on home page
// Name of the component: Hero.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Hero />
// Input parameters: no input parameters
// Output: Classical hero component with two columns on desktop and one column on smaller devices
// *********************

import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[700px] w-full bg-blue-500 max-lg:h-[900px] max-md:h-[750px]">
      <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10">
        <div className="flex flex-col gap-y-5 max-lg:order-last col-span-2">
          <h1 className="text-6xl text-white font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
            ПРОДУКТ БУДУЩЕГО
          </h1>
          <p className="text-white max-sm:text-sm">
           Новый уровень комфорта. Инновационные товары. Технологии завтрашнего дня.<br/>

Наш магазин — это не просто место для покупок, а пространство, где встречаются передовые технологии, стиль и удобство. Мы отбираем только те товары, которые делают жизнь проще, ярче и эффективнее.<br/>

✨ Почему мы?<br/>
✔ Умный ассортимент — только инновационные и проверенные решения.<br/>
✔ Быстрая доставка — ваш заказ прилетит к вам быстрее, чем вы ожидаете.<br/>
✔ Технологии будущего — товары, которые опережают время.<br/>

🔮 Выбирайте лучшее уже сегодня — создавайте завтра.
          </p>
          <div className="flex gap-x-1 max-lg:flex-col max-lg:gap-y-1">
            <button className="bg-white text-blue-600 font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100">
              Купить сейчас
            </button>
            <button className="bg-white text-blue-600 font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100">
              Дополнительаня информация
            </button>
          </div>
        </div>
        <Image
          src="/watch for banner.png"
          width={400}
          height={400}
          alt="smart watch"
          className="max-md:w-[300px] max-md:h-[300px] max-sm:h-[250px] max-sm:w-[250px] w-auto h-auto"
        />
      </div>
    </div>
  );
};

export default Hero;
