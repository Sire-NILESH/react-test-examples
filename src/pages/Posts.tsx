import { useGetPostsQuery } from "../store/postsApiSlice";

import Card from "../components/Card";

const Posts = () => {
  const { data, error, isLoading } = useGetPostsQuery();

  return (
    <div className="mx-auto container">
      <header className="mt-10 sm:mt-0 mb-10">
        <h2 className="font-semibold text-lg">RTK Query</h2>
        <p className="text-muted-foreground">
          A demonstration of posts fetched using RTK query and cards built using
          Compound Component pattern.
        </p>
      </header>

      <div className="mx-auto space-y-4 md:flex md:flex-wrap md:gap-4 md:space-y-0">
        {isLoading ? (
          <p>{"Loading"}</p>
        ) : data ? (
          data.ids.slice(0, 12).map((postId) => {
            const post = data.entities[postId];
            return (
              <Card
                key={postId}
                cardData={{
                  cardId: String(post.id),
                  title: post.title,
                  content: post.body,
                }}
                className="border border-border"
              >
                <Card.Title />
                <Card.Content />
              </Card>
            );
          })
        ) : error ? (
          <p>{"Uh oh! Something went wrong 🥲"}</p>
        ) : (
          <p>{"Nothing to show 🥲"}</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
