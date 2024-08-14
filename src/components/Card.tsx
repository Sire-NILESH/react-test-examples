import { ComponentProps, createContext, useContext } from "react";
import { cn } from "../utils/cn";

interface CardData {
  cardId: string;
  title?: string;
  content?: string;
  cardImgURL?: string;
  footerContent?: string;
}

interface CardProps extends ComponentProps<"figure"> {
  cardData: CardData;
}

const CardCtx = createContext<{ cardData: CardData }>({
  cardData: {
    cardId: "",
    title: "",
    cardImgURL: "",
    content: "",
    footerContent: "",
  },
});

const Card = ({ className, cardData, children, ...props }: CardProps) => {
  return (
    <CardCtx.Provider value={{ cardData }}>
      <figure
        className={cn(
          "max-w-96 w-full rounded-md bg-card text-card-foreground p-4 space-y-3 overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </figure>
    </CardCtx.Provider>
  );
};

interface CardTitleProps extends ComponentProps<"header"> {}

const CardTitle = ({ className, ...props }: CardTitleProps) => {
  const {
    cardData: { title },
  } = useContext(CardCtx);
  return (
    <header className={cn("", className)} {...props}>
      <h2 className="font-bold text-lg">{title}</h2>
    </header>
  );
};

interface CardImgProps extends ComponentProps<"img"> {}

const CardImage = ({ className, ...props }: CardImgProps) => {
  const {
    cardData: { title, cardImgURL },
  } = useContext(CardCtx);
  return (
    <div className={cn("w-full aspect-video", className)} {...props}>
      <img
        className="h-full w-full object-cover"
        src={cardImgURL}
        alt={title}
      />
    </div>
  );
};

interface CardContentProps extends ComponentProps<"div"> {}

const CardContent = ({ className, ...props }: CardContentProps) => {
  const {
    cardData: { content },
  } = useContext(CardCtx);
  return (
    <div className={cn("", className)} {...props}>
      <p className="text-base">{content}</p>
    </div>
  );
};

interface CardFooterProps extends ComponentProps<"footer"> {}

const CardFooter = ({ className, ...props }: CardFooterProps) => {
  const {
    cardData: { footerContent },
  } = useContext(CardCtx);
  return (
    <footer className={cn("text-muted-foreground", className)} {...props}>
      <p className="text-sm">{footerContent}</p>
    </footer>
  );
};

Card.Title = CardTitle;
Card.Image = CardImage;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
