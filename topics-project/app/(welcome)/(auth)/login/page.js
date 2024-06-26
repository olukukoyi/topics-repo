"use client";

import { login } from "./actions";
import { Loader, BadgeAlert, BadgeCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertTitle } from "../../../../@/components/alert";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({
    message: "",
    error: null,
  });

  const router = useRouter();

  const formRef = useRef(null);

  useEffect(() => {
    if (submitResult.message === "success") {
      formRef.current?.reset();
      router.push('/home');
    }
  }, [submitResult]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await login({ email, password });
      setSubmitResult(result);
    } catch (error) {
      setSubmitResult({ message: "error", error: "Something went wrong!" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-customPrimary min-h-[calc(100vh-64px)] relative">
      {submitResult.message === "success" ? (
        <div className="absolute top-0 left-0 right-0 mx-auto max-w-60 font-redHatText animate-fade-down animate-duration-300 animate-ease-in-out">
          <Alert className="rounded-md border-transparent bg-green-400 text-white flex items-center justify-center gap-2">
            <BadgeCheck className="h-4 w-4" color="white" />
            <AlertTitle>Success!</AlertTitle>
          </Alert>
        </div>
      ) : (
        submitResult.message === "error" && (
          <div className="absolute top-0 left-0 right-0 mx-auto max-w-60 font-redHatText animate-fade-down animate-duration-300 animate-ease-in-out">
            <Alert className="rounded-md border-transparent bg-red-400 text-white flex items-center justify-center gap-2">
              <BadgeAlert className="h-4 w-4" color="white" />
              <AlertTitle>{submitResult.error}</AlertTitle>
            </Alert>
          </div>
        )
      )}
      <div className="mx-auto px-4 lg:px-0 lg:max-w-screen-xl mt-8 mb-4 flex flex-col justify-center items-start md:items-center gap-8">
        <p className="font-bold text-4xl md:text-5xl text-customAccent font-poppins">
          Sign In
        </p>
        <form
          ref={formRef}
          className="flex flex-col w-full md:w-5/12 gap-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleSubmit();
          }}
        >
          <div className="flex flex-col gap-4">
            <label
              htmlFor="email"
              className="font-redHatText font-medium text-xl text-customAccent"
            >
              Email
            </label>
            <input
              className="h-12 rounded-md border-customAccent border-2 border-solid pl-4 font-redHatText text-base"
              placeholder="Enter email"
              id="email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-redHatText font-medium text-xl text-customAccent"
            >
              Password
            </label>
            <input
              className="h-12 rounded-md border-customAccent border-2 border-solid pl-4 font-redHatText text-base"
              placeholder="Enter password"
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <button
              className="w-full rounded-md h-14 mt-4 bg-customSecondary hover:bg-customAccent transition-colors duration-300 flex justify-center items-center"
              disabled={isSubmitting}
              type="submit"
            >
              <p className="text-xl font-poppins font-bold text-customPrimary">
                {isSubmitting ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  "LOGIN"
                )}
              </p>
            </button>
            {/* TO DO: Add Routing to sign in page to span */}
            <p className="text-sm font-redHatText font-medium text-customAccent/40">
              Dont have an account?{" "}
              <span className="text-customAccent">Sign Up Now!</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}