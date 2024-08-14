import { ComponentProps, createContext, useContext } from "react";
import { cn } from "../utils/cn";

interface CardData {
  title: string;
  cardImgURL: string;
  content: string;
  footerContent: string;
}

const dummyCardData: CardData = {
  title: "New late releases",
  cardImgURL:
    "https://images.unsplash.com/photo-1591196702597-062a87208fed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  content: "New late releases is shown here",
  footerContent: "Hurry! only few left",
};

const CompoundComponent = () => {
  return (
    <div className="mx-auto container p-2">
      <header className="mt-10 sm:mt-0 mb-10">
        <h2 className="font-semibold text-lg">Compound Component</h2>
        <p className="text-muted-foreground">
          A demonstration of card built using Compound Component pattern
        </p>
      </header>

      <div className="mx-auto space-y-4 md:flex md:space-x-4 md:space-y-0">
        <Card cardData={dummyCardData} className="border border-border">
          <Card.Title />
          <Card.Content />
          <Card.Image className="rounded-md overflow-hidden" />
          <Card.Footer />
        </Card>

        <Card cardData={dummyCardData} className="p-0 border border-border">
          <Card.Image />
          <div className="p-3">
            <Card.Title />
            <Card.Content />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompoundComponent;

interface CardProps extends ComponentProps<"div"> {
  cardData: CardData;
}

const CardCtx = createContext<{ cardData: CardData }>({
  cardData: {
    title: "",
    cardImgURL: "",
    content: "",
    footerContent: "",
  },
});

const Card = ({ className, cardData, children, ...props }: CardProps) => {
  return (
    <CardCtx.Provider value={{ cardData }}>
      <div
        className={cn(
          "max-w-96 w-full rounded-md bg-card text-card-foreground p-4 space-y-3 overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
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
