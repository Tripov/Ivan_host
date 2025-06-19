"use client";
import { CustomButton, DashboardSidebar } from "@/components";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatCategoryName } from "../../../../utils/categoryFormating";

const DashboardCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Получение всех категорий для отображения на странице
  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4">
      <DashboardSidebar />
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center mb-5">
          Все категории
        </h1>

        <div className="flex justify-end mb-5">
          <Link href="/admin/categories/new">
            <CustomButton
              buttonType="button"
              customWidth="140px"
              paddingX={10}
              paddingY={5}
              textSize="base"
              text="Добавить категорию"
            />
          </Link>
        </div>

        <div className="xl:ml-5 w-full max-xl:mt-5 overflow-auto h-[80vh]">
          <table className="table table-md table-pin-cols">
            {/* заголовок таблицы */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Название</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {categories &&
                categories.map((category: Category) => (
                  <tr key={nanoid()}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>

                    <td>
                      <div>
                        <p>{formatCategoryName(category?.name)}</p>
                      </div>
                    </td>

                    <th>
                      <Link
                        href={`/admin/categories/${category?.id}`}
                        className="btn btn-ghost btn-xs"
                      >
                        Подробнее
                      </Link>
                    </th>
                  </tr>
                ))}
            </tbody>

            {/* подвал таблицы */}
            <tfoot>
              <tr>
                <th></th>
                <th>Название</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategory;
