import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import { cn } from "../utils/cn";

interface Position {
  x: number;
  y: number;
}

const Notes: React.FC = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Notes</PageTitle>
        <PageDescription>
          A small implementation of a note app with drag and drop feature.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <NoteContainer>
          <Note />
        </NoteContainer>
      </PageBody>
    </Page>
  );
};

export default Notes;

interface INoteContainerCtx {
  containerRef: React.RefObject<HTMLDivElement> | null;
}

const NoteContainerCtx = createContext<INoteContainerCtx>({
  containerRef: null,
});

interface NoteContainerProps extends React.ComponentProps<"div"> {}

const NoteContainer = ({
  className,
  children,
  ...props
}: NoteContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "h-[32rem] border-2 border-dashed border-border rounded-md",
        className
      )}
      ref={containerRef}
      {...props}
    >
      <NoteContainerCtx.Provider value={{ containerRef }}>
        {children}
      </NoteContainerCtx.Provider>
    </div>
  );
};

const useNoteContainerCtx = () => {
  return useContext(NoteContainerCtx);
};

interface NoteProps extends React.ComponentProps<"div"> {}

const Note = ({ className, ...props }: NoteProps) => {
  const noteRef = useRef<HTMLDivElement>(null);
  const { containerRef } = useNoteContainerCtx();

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef?.current && noteRef.current) {
      // set the dragging flag
      setIsDragging(true);

      // record the offset where the mouse is clicked on the note
      const noteRect = noteRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - noteRect.left,
        y: e.clientY - noteRect.top,
      });
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef?.current || !noteRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const noteWidth = noteRef.current.getBoundingClientRect().width;
      const noteHeight = noteRef.current.getBoundingClientRect().height;

      // position of 'note' relative to 'container'
      // because note is placed within 'container'
      let newX = e.clientX - (containerRect.left + offset.x);
      let newY = e.clientY - (containerRect.top + offset.y);

      // check boundary conditions
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + noteWidth > containerRect.width) {
        newX = containerRect.width - noteWidth;
      }
      if (newY + noteHeight > containerRect.height) {
        newY = containerRect.height - noteHeight;
      }

      setPosition({ x: newX, y: newY });
    },
    [isDragging, containerRef, offset.x, offset.y]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove, {
        signal: controller.signal,
      });
      window.addEventListener("mouseup", handleMouseUp, {
        signal: controller.signal,
      });
    } else {
      // cancel/remove all the event listeners
      controller.abort();
    }

    return () => {
      // cancel/remove all the event listeners
      controller.abort();
    };
  }, [handleMouseMove, handleMouseUp, isDragging]);

  const toTranslate = `${position.x}px ${position.y}px`;

  return (
    <div
      className={cn(
        "w-60 h-32 rounded-sm bg-yellow-500 p-3 shadow-lg",
        className
      )}
      ref={noteRef}
      onMouseDown={handleMouseDown}
      style={{
        translate: toTranslate,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      {...props}
    >
      <span>{"📌"}</span>
      <p className="italic underline text-black">{"You can drag me"}</p>
    </div>
  );
};
