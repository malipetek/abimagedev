
interface AppQueryResult {
  data: undefined;
  dataUpdatedAt: number;
  error: null;
  errorUpdateCount: number;
  errorUpdatedAt: number;
  failureCount: number;
  isError: boolean;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isFetching: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isLoadingError: boolean;
  isPlaceholderData: boolean;
  isPreviousData: boolean;
  isRefetchError: boolean;
  isRefetching: boolean;
  isStale: boolean;
  isSuccess: boolean;
  refetch: () => void;
  remove: () => void;
  status: "loading";
}