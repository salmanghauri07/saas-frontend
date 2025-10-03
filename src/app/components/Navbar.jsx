"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { Search, Plus, User, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import CreateNewBoardModal from "./CreateBoardModal";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  console.log("Navbar user:", user);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const boards = ["Marketing Board", "Dev Sprint", "Design Team"]; // fake data
  const handleLogout = () => {
    // 1. Clear jwt cookie
    document.cookie =
      "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";

    // 2. Clear Redux user state
    dispatch(logout());

    // 3. Close dropdown
    setDropdownOpen(false);

    // 4. Redirect to login page
    router.push("/login");
  };
  return (
    <nav className="bg-neutral-900">
      <div className="container">
        <div className="w-full h-16 border-b border-gray-800 shadow-sm flex items-center px-6 justify-between relative">
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="font-bold text-xl text-white cursor-pointer"
          >
            <Image
              src={"/images/logo.png"}
              alt="Logo"
              width={110}
              height={110}
            />
          </div>

          {/* Search input (center, not too big) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="w-64">
              <input
                placeholder="Search..."
                className="w-full px-3 py-1.5 bg-gray-900 text-gray-200 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={() => setSearchOpen(true)}
              />
            </div>
          </div>

          {/* Mobile search icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden p-2 rounded hover:bg-gray-800"
          >
            <Search className="w-5 h-5 text-gray-300" />
          </button>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            {/* Create Board Button */}
            <button
              onClick={() => setCreateOpen(true)}
              className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 text-sm"
            >
              <Plus className="w-4 h-4 mr-1" /> Create
            </button>

            {/* Profile Avatar */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:ring-2 hover:ring-gray-500"
              >
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className=" rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-200" />
                )}
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 shadow-md rounded-md py-2 border border-gray-700 z-50">
                  <div className="px-4 py-2 border-b border-gray-700 text-sm text-gray-300">
                    <div className="font-medium">{user?.username}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-800 text-sm flex items-center gap-2 text-gray-300"
                    onClick={() => router.push("/profile")}
                  >
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-800 text-sm flex items-center gap-2 text-gray-300"
                    onClick={() => router.push("/settings")}
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-800 text-sm flex items-center gap-2 text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 🔍 Search Overlay */}
          {searchOpen && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50">
              <div className="bg-gray-900 w-full max-w-2xl mt-20 p-6 rounded-xl shadow-lg border border-gray-700">
                <input
                  autoFocus
                  placeholder="Search boards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-black text-gray-200 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Search results */}
                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                  {boards
                    .filter((b) =>
                      b.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((b, i) => (
                      <div
                        key={i}
                        className="p-2 hover:bg-gray-800 rounded cursor-pointer text-gray-300"
                        onClick={() => {
                          router.push(`/boards/${b}`);
                          setSearchOpen(false);
                        }}
                      >
                        {b}
                      </div>
                    ))}
                </div>

                <button
                  className="mt-4 text-sm text-gray-400 hover:underline"
                  onClick={() => setSearchOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* ➕ Create Board Modal */}
          {createOpen && (
            <CreateNewBoardModal open={createOpen} setOpen={setCreateOpen} />
          )}
        </div>
      </div>
    </nav>
  );
}
