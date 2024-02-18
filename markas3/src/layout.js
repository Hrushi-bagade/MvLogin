import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "../Components/Navbar";
import { ReduxProvider } from "@/redux/features/provider";
import ProtectedRoute from "@/utils/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <ProtectedRoute>
        <div className={inter.className}>
          <ToastContainer theme="colored" />
          <NavigationBar />
          <ToastContainer theme="colored" />
          {children}
        </div>
        </ProtectedRoute>
    </ReduxProvider>
  );
}
