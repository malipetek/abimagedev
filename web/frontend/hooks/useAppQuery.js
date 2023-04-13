import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useQuery } from "react-query";

/**
 * A hook for querying your custom app data.
 * @desc A thin wrapper around useAuthenticatedFetch and react-query's useQuery.
 *
 * @param {Object} options - The options for your query. Accepts 3 keys:
 * @param {string} [options.url] - The URL to query. E.g: /api/widgets/1
 * @param {Object} [options.fetchInit] - The init options for fetch.  See: https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 * @param {Object} [options.reactQueryOptions] - The options for `useQuery`. See: https://react-query.tanstack.com/reference/useQuery
 * @param {string} options.query - The GraphQL query to execute.
 * @param {Object} [options.variables] - The variables to pass to the GraphQL query.
 * 
 * 1. url: The URL to query. E.g: /api/widgets/1`
 * 2. fetchInit: The init options for fetch.  See: https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 * 3. reactQueryOptions: The options for `useQuery`. See: https://react-query.tanstack.com/reference/useQuery
 *
 * @returns Return value of useQuery.  See: https://react-query.tanstack.com/reference/useQuery.
 */
export const useAppQuery = ({ url, fetchInit = {}, reactQueryOptions, query, variables }) => {
  const authenticatedFetch = useAuthenticatedFetch();
  // remove null keys from object
  variables = Object.keys(variables).reduce((acc, key) => {
    if (variables[key] !== null) {
      acc[key] = variables[key];
    }
    return acc;
  }, {});
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url || "/api/graphql/proxy", {
        ...fetchInit,
        method: "POST",
        headers: {
          ...fetchInit.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables
        }),
      });
      return response.json();
    };
  }, [url, query, JSON.stringify(fetchInit)]);

  return useQuery(url || '/api/graphql/proxy', fetch, {
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  });
};
