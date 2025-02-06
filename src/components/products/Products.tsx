import { useCallback, useState } from "react";
import ErrorComponent from "../ErrorComponent";
import Loading from "../Loading";
import Pagination from "../pagination/Pagination";
import useProducts from "./hooks/useProducts";
import ProductCard from "./ProductsCard";
import { Product } from "./types";

const Products = () => {
  const { data: products, status } = useProducts(100);
  const [pageProducts, setPageProducts] = useState<Product[]>([]);

  const currentPageItemsHandler = useCallback((productsOnPage: Product[]) => {
    setPageProducts(productsOnPage);
  }, []);

  if (status === "pending") {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  return (
    <div>
      <ul className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
        {pageProducts?.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} className="h-full" />
          </li>
        ))}
      </ul>

      <div className="my-10 flex justify-center">
        <Pagination
          allItems={products ? products : []}
          currentPageItemsHandler={currentPageItemsHandler}
        />
      </div>
    </div>
  );
};

export default Products;
