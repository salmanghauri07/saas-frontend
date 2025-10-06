"use client";

import { useState } from "react";
import { Filter, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function BoardHeader({ title }) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [role, setRole] = useState("viewer");

  const handleInvite = () => {
    // TODO: Integrate with your API
    console.log("Inviting:", inviteEmail, "as", role);
    setInviteEmail("");
    setRole("viewer");
  };

  return (
    <div
      className="flex items-center justify-between px-6 py-3 
      backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/10 shadow-sm "
    >
      {/* Left: Board Title */}
      <h1 className="text-xl font-semibold text-white truncate max-w-[60%]">
        {title}
      </h1>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
          bg-white/10 hover:bg-white/20 text-sm text-white font-medium
          transition-all duration-200 backdrop-blur-sm"
        >
          <Filter size={18} />
          Filter
        </button>

        {/* Invite Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl 
              bg-blue-600 hover:bg-blue-700 text-sm text-white font-medium
              transition-all duration-200"
            >
              <UserPlus size={18} />
              Invite
            </button>
          </DialogTrigger>

          <DialogContent className="bg-white/90 dark:bg-neutral-900 border border-white/20 backdrop-blur-lg text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-white">
                Invite to Board
              </DialogTitle>
              <DialogDescription className="text-white/70">
                Enter the user’s email or username and assign their role.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Email/Username input */}
              <div>
                <label className="block text-sm mb-1 text-white/80">
                  Email or Username
                </label>
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="example@email.com or username"
                  className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              {/* Role selector */}
              <div>
                <label className="block text-sm mb-1 text-white/80">Role</label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="bg-white/10 border border-white/20 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handleInvite}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
