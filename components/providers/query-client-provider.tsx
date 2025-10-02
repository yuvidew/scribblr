import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: 1 },
        mutations: { retry: 0 },
    },
});

/**
 * Provides a React Query client to the application.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components that will have access to the query client.
 */

export const QueryClientProviderComp = (
    {
        children
    }: {
        children: ReactNode
    }
) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toast  position="top" />
        </QueryClientProvider>
    )
}
