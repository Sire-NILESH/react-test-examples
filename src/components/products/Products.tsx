import { Star } from "lucide-react";
import Card from "../Card";
import ErrorComponent from "../ErrorComponent";
import Loading from "../Loading";
import useProducts from "./hooks/useProducts";
import { Product } from "./types";

const Products = () => {
  const { data: products, status } = useProducts(9);

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
        {products?.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card
      cardData={{
        cardId: String(product.id),
        title: product.title,
        cardImgURL: product.thumbnail,
        content: product.description,
        footerContent: product.shippingInformation,
      }}
      className="min-[19rem] border border-border"
    >
      <Card.Title />
      <Card.Image className="rounded-md bg-secondary dark:bg-background overflow-hidden border border-border object-center" />

      <div className="flex space-x-2 items-center">
        <p className="text-lg font-bold">${product.price}</p>

        <p className="text-muted-foreground">{"•"}</p>

        {/* Rating/Review */}
        <div className="flex items-center space-x-2">
          <Star className="size-4 text-yellow-500 fill-yellow-500" />{" "}
          <p className="font-semibold">{product.rating}</p>
        </div>
      </div>
      <p className="text-muted-foreground text-sm">
        {product.availabilityStatus}
      </p>
      <Card.Content className="line-clamp-3" />
      <Card.Footer />
    </Card>
  );
};
