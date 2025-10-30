import { Link, NavLink } from "react-router-dom";
import { Medal } from "lucide-react";
import { useAuth } from "@/auth";

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="w-full p-3 bg-base-300 border-b border-white/10">
      <div className="w-full sm:w-[90%] md:w-[85%] max-w-[1200px] flex items-center justify-between mx-auto">
        <Link to="/" className="flex items-center gap-1">
          <Medal className="text-primary" size={30} />
          <span className="logo text-xl">Mini Circle</span>
        </Link>
        <div className="flex items-center gap-5 text-sm">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${isActive ? "text-primary" : "hover:underline"}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${isActive ? "text-primary" : "hover:underline"}`
                }
              >
                Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "text-primary" : "hover:underline"}`
                }
              >
                Home
              </NavLink>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
