import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ProtectedRoute() {
  const { auth, loading } = useAuth();

  if (loading) return "loading...";

  return (
    <>
      <Header />

      {auth?._id ? (
        <main className="container mt-5">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
}

export default ProtectedRoute;
