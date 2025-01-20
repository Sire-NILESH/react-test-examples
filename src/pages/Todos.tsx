import axios from "axios";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ComponentProps } from "react";
import { cn } from "../utils/cn";
import Card from "../components/Card";
import { Check, Circle } from "lucide-react";
// import { Check, Circle } from "lucide-react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async () => {
  return await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos");
};

const updateTodo = async (todo: Todo) => {
  return await axios.put<Todo>(
    `https://jsonplaceholder.typicode.com/${todo.id}`
  );
};

const Todos = () => {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["placeholder-todos"],
    queryFn: fetchTodos,
  });

  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["placeholder-todos"] });
    },
  });

  return (
    <Page>
      <PageHeader>
        <PageTitle>Todos with TanStack Query</PageTitle>
        <PageDescription>
          A demonstration of todos fetched using TanStack query and cards built
          using Compound Component pattern.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <div className="mx-auto space-y-4 md:flex md:flex-wrap md:gap-4 md:space-y-0">
          {isLoading ? (
            <p>Loading</p>
          ) : isError ? (
            <p>something went wrong while fetching todos</p>
          ) : (
            todos?.data?.slice(0, 21).map((todo) => (
              <Card
                key={todo.id}
                cardData={{
                  cardId: String(todo.id),
                  title: todo.title,
                }}
                className="border border-border"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      mutation.mutate({ ...todo, completed: !todo.completed });
                    }}
                  >
                    {todo.completed ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <Card.Title
                    className={`font-normal ${
                      todo.completed ? "line-through" : ""
                    }`}
                  />
                </div>
              </Card>
            ))
          )}
        </div>
      </PageBody>
    </Page>
  );
};

export default Todos;

interface Props extends ComponentProps<"article"> {}

export const TodoCard = ({ className, ...props }: Props) => {
  return <article className={cn("", className)} {...props} />;
};
