import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import Products from "../components/products/Products";

const ProductsPage = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>ProductsPage</PageTitle>
        <PageDescription>
          A products page demo built with React Query and has a client side
          pagination.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <Products />
      </PageBody>
    </Page>
  );
};

export default ProductsPage;
