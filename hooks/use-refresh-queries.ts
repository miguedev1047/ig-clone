import { useQueryClient } from '@tanstack/react-query'

export function useRefreshQueries() {
  const queryClient = useQueryClient()
  const handleRefresh = () => queryClient.refetchQueries({ type: 'active' })
  return { handleRefresh }
}
