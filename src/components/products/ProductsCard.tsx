import { Star } from "lucide-react";
import Card from "../Card";
import { Product } from "./types";
import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type ProductCardProps = ComponentProps<"article"> & {
  product: Product;
};

function formatCurrency(originalPrice: number, roundDigits = 1): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: roundDigits,
    maximumFractionDigits: roundDigits,
  }).format(originalPrice);
}

function getOriginalPrice(
  discountedPrice: number,
  discountPercentage: number
): string {
  return formatCurrency(discountedPrice / (1 - discountPercentage / 100));
}

const ProductCard = ({
  product,
  className,
  ...restProps
}: ProductCardProps) => {
  return (
    <Card
      cardData={{
        cardId: String(product.id),
        title: product.title,
        cardImgURL: product.thumbnail,
        content: product.description,
        footerContent: product.shippingInformation,
      }}
      className={cn("min-[19rem] border border-border", className)}
      {...restProps}
    >
      {product.brand && (
        <p className="uppercase text-muted-foreground tracking-widest text-xs font-semibold">
          {product.brand}
        </p>
      )}
      <Card.Title />
      <Card.Image className="rounded-md bg-secondary dark:bg-background overflow-hidden border border-border" />

      <div className="flex space-x-2 items-center">
        <p className="text-muted-foreground line-through font-semibold">
          {getOriginalPrice(product.price, product.discountPercentage)}
        </p>

        <p className="text-lg font-bold">{formatCurrency(product.price)}</p>

        <p className="text-muted-foreground">{"•"}</p>

        {/* Rating/Review */}
        <div className="flex items-center space-x-2">
          <Star className="size-4 text-yellow-500 fill-yellow-500" />{" "}
          <p className="font-semibold">{product.rating}/5</p>
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

export default ProductCard;
