import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextProvider } from "./contexts/AuthContext";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
    return (
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <Outlet />
                <Footer />
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </AuthContextProvider>
    );
}

export default App;
