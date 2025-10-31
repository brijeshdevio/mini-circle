import type { PostItemProps } from "@/types";
import { timeAgo } from "@/utils";
import { Heart } from "lucide-react";

export function PostItem({
  content,
  createdBy,
  likes,
  createdAt,
}: PostItemProps) {
  return (
    <div className="flex gap-2 sm:gap-3 p-3 sm:p-5 border-b border-white/10 hover:bg-base-300/90">
      <div>
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-10 sm:w-11 rounded-full">
            <span className="text-sm">{createdBy?.name?.[0]}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-md">{createdBy?.name}</h2>
          <p className="text-sm text-base-content/50">{timeAgo(createdAt)}</p>
        </div>
        <div className="text-sm">
          <p className="text-base-content/70">{content}</p>
        </div>
        <div className="mt-1">
          <div
            className={`flex items-center gap-2 ${
              likes % 2 ? "text-error" : ""
            }`}
          >
            <Heart size={20} />
            <span className="text-sm">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
