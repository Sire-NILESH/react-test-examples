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
      <article
        className={cn(
          "max-w-96 w-full rounded-md bg-card text-card-foreground p-4 space-y-3 overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </article>
    </CardCtx.Provider>
  );
};

interface CardTitleProps extends ComponentProps<"header"> {}

const CardTitle = ({ className, ...props }: CardTitleProps) => {
  const {
    cardData: { title },
  } = useContext(CardCtx);
  return (
    <header className={cn("font-bold text-lg", className)} {...props}>
      <h2>{title}</h2>
    </header>
  );
};

interface CardImgProps extends ComponentProps<"div"> {
  imgClassName?: ComponentProps<"img">["className"];
}

const CardImage = ({ className, imgClassName, ...props }: CardImgProps) => {
  const {
    cardData: { title, cardImgURL },
  } = useContext(CardCtx);
  return (
    <div className={cn("w-full aspect-video", className)} {...props}>
      <img
        className={cn("h-full w-full object-contain", imgClassName)}
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
    <p className={cn("text-base", className)} {...props}>
      {content}
    </p>
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
