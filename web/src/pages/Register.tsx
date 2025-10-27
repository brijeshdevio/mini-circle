import { useLogin } from "@/hooks/useAuth";
import type { LoginType } from "@/types";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

const formFields = [
  {
    label: "Full Name",
    type: "text",
    name: "name",
    placeholder: "Jasmine Doe",
  },
  {
    label: "Email Address",
    type: "email",
    name: "email",
    placeholder: "jasmine.doe@ex.com",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "*******",
  },
];

export function Register() {
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    mutate(data as LoginType);
  };

  return (
    <main className="w-full h-screen flex items-center justify-center p-3 bg-base-300">
      <section className="w-86 card bg-base-100">
        <div className="card-body">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="opacity-70">Sign up and continue</p>
          </div>
          <form className="flex flex-col gap-3 my-5" onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  className="input"
                  required
                />
              </div>
            ))}
            <div>
              <button className="btn btn-primary w-full" disabled={isPending}>
                {isPending ? "Loading..." : "Create Account"}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="underline text-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
