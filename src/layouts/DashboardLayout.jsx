import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Footer from "@/components/layout/Footer";

import { useAuth } from "@/context/AuthContext";

const DashboardLayout = () => {
  const { logout, user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#08111F]">

      {/* Desktop Sidebar */}

      <aside className="hidden lg:flex">
        <Sidebar
          user={user}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Sidebar */}

      {sidebarOpen && (
        <>
          <div
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />

          <div className="fixed left-0 top-0 z-50 h-full lg:hidden">

            <Sidebar
              user={user}
              onLogout={handleLogout}
              closeSidebar={closeSidebar}
            />

          </div>
        </>
      )}

      {/* Main Content */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Header */}

        <header className="border-b border-slate-800 bg-[#0F172A]">

          <div className="flex items-center justify-between px-6 py-4">

            <button
              onClick={toggleSidebar}
              className="rounded-lg border border-slate-700 p-2 text-white lg:hidden"
            >
              {sidebarOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

            <Topbar
              user={user}
              onLogout={handleLogout}
            />

          </div>

        </header>
                {/* Page Content */}

        <main className="flex-1 overflow-y-auto bg-[#08111F]">

          <div className="min-h-full p-6">

            <Outlet />

          </div>

        </main>

        {/* Footer */}

        <Footer />

      </div>

    </div>
  );
};

export default DashboardLayout;