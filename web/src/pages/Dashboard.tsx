import { Navbar, PostItem } from "@/components";
import { posts } from "@/data";
import { Fragment } from "react/jsx-runtime";

export function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="w-full sm:w-[90%] md:w-[85%] max-w-[1200px] mx-auto px-3 py-5">
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
