import { Navbar, PostItem } from "@/components";
import { posts } from "@/data";
import { TypeOutline } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="w-full sm:w-[90%] md:w-[85%] max-w-[1200px] mx-auto px-3 py-5">
        <section className="bg-base-200 mb-2 p-3 sm:p-5 rounded hover:bg-base-300/90">
          <div className="flex gap-5">
            <div>
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-10 sm:w-11 rounded-full">
                  <TypeOutline />
                </div>
              </div>
            </div>
            <div className="w-full">
              <textarea
                name=""
                id=""
                className="block w-full resize-none h-20 outline-none border-0"
                placeholder="What's happening?"
              ></textarea>
              <div className="flex">
                <button className="btn btn-primary btn-sm sm:px-10 rounded-full ml-auto">
                  Post
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-base-200">
          {posts?.map((post) => (
            <Fragment key={post._id}>
              <PostItem {...post} />
            </Fragment>
          ))}
        </section>
      </main>
    </>
  );
}
