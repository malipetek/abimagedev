import React, { useEffect, useState, useCallback } from 'react';
import { Card, ResourceList, ResourceItem, Pagination } from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useNavigate } from "react-router-dom";

const PRODUCTS_QUERY = `
query($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
        id
        title
        handle
        description
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  }
}
`;

const PAGE_SIZE = 10;

function ProductList() {
  const [cursor, setCursor] = useState(null);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetch = useAuthenticatedFetch();

  // /** @type {AppQueryResult} */
  const {
    data,
    refetch: refetchProducts,
    isLoading: isLoadingProducts,
    isRefetching: isRefetchingProducts
  } = useAppQuery({
    query: PRODUCTS_QUERY,
    variables: { first: PAGE_SIZE, after: cursor },
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  useEffect(() => {
    if (!isLoadingProducts && !isRefetchingProducts && data?.data) {
      console.log('data 2', data);
      const pageInfo = data.data.products.pageInfo;
      const products = data.data.products.edges.map(({ node }) => node);

      setProducts(products);

      setPage(page => pageInfo.hasPreviousPage ? page + 1 : 1);
      setPageInfo(pageInfo);
      setCursor(products[products.length - 1].cursor);
    }
  }, [isLoadingProducts, data]);

  const handlePagination = useCallback((_event, newPage) => {
    console.log('products set ', products);
    setPage(newPage);
    setCursor(products[(newPage - 1) * PAGE_SIZE - 1].cursor);
  }, [products]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <Card>
      <ResourceList
        resourceName={{ singular: 'product', plural: 'products' }}
        items={products}
        renderItem={(product) => (
          <ResourceItem
            key={product.id}
            onClick={() => { navigate('/products/' + product.handle) }}
            id={product.id}
            media={<img width="100" src={product.images.edges[0].node.url} alt={product.images.edges[0].node.altText} />}
            accessibilityLabel={`View details for ${product.title}`}
          >
            <h3>
              <div>{product.title}</div>
            </h3>
          </ResourceItem>
        )}
      />
      {pageInfo.hasNextPage && (
        <Pagination
          hasNext
          nextURL={`?page=${page + 1}`}
          onNavigation={handlePagination}
        />
      )}
    </Card>
  );
}

export default function ProductPage() {
  return (
    <div style={{ margin: '2rem' }}>
      <h1>Product List</h1>
      <ProductList />
    </div>
  );
}
