import Card from "../components/Card";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import { useGetPostsQuery } from "../store/postsApiSlice";

const Posts = () => {
  const { data, error, isLoading } = useGetPostsQuery();

  return (
    <Page>
      <PageHeader>
        <PageTitle>RTK Query</PageTitle>
        <PageDescription className="text-muted-foreground max-w-lg">
          A demonstration of posts fetched using RTK query and cards built using
          Compound Component pattern.
        </PageDescription>
      </PageHeader>

      <PageBody>
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
      </PageBody>
    </Page>
  );
};

export default Posts;
