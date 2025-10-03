"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, User, LogOut, Settings } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const boards = ["Marketing Board", "Dev Sprint", "Design Team"]; // fake data

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
                <User className="w-5 h-5 text-gray-200" />
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 shadow-md rounded-md py-2 border border-gray-700 z-50">
                  <div className="px-4 py-2 border-b border-gray-700 text-sm text-gray-300">
                    <div className="font-medium">John Doe</div>
                    <div className="text-xs text-gray-500">
                      john@example.com
                    </div>
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
                    onClick={() => console.log("logout")}
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
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-900 w-full max-w-md p-6 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-lg font-semibold mb-4 text-white">
                  Create a new board
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Board created");
                    setCreateOpen(false);
                  }}
                  className="space-y-4"
                >
                  <input
                    placeholder="Board title"
                    required
                    className="w-full px-4 py-2 bg-black text-gray-200 border border-gray-700 rounded-md"
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full px-4 py-2 bg-black text-gray-200 border border-gray-700 rounded-md"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setCreateOpen(false)}
                      className="px-4 py-2 rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
