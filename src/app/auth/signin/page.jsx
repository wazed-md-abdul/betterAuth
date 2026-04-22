"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Description, FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

function validateEmail(value) {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return "Please enter a valid email address";
  }

  return null;
}

function validatePassword(value) {
  if (value.length < 8) {
    return "Password must be at least 8 characters";
  }

  return null;
}

const perks = ["Secure email login", "Fast access to your dashboard", "Helpful feedback if something goes wrong"];

export default function SignInPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      ...userData,
      callbackURL: "http://localhost:3000/dashboard",
      rememberMe: true,
    });

    setIsSubmitting(false);

    if (error) {
      toast.danger("Could not sign you in", {
        description: error.message,
      });
      return;
    }

    if (data) {
      toast.success("Welcome back", {
        description: "Your account is ready. Taking you to the dashboard now.",
      });
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen px-6 py-8 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="glass-panel flex flex-col justify-between rounded-[2rem] p-8 lg:p-10">
          <div>
            <p className="eyebrow">Sign In</p>
            <h1 className="display-title mt-4 max-w-md text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
              Pick up right where you left off.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
              The sign-in flow is now simpler, calmer, and easier to scan, so people can get into the
              product without friction.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            {perks.map((perk) => (
              <div
                key={perk}
                className="rounded-[1.5rem] border border-white/80 bg-white/70 px-5 py-4 text-sm text-[var(--foreground)] shadow-[0_12px_32px_rgba(24,41,31,0.06)]"
              >
                {perk}
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel flex items-center rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-8">
              <p className="text-sm font-medium text-[var(--accent-strong)]">Welcome back</p>
              <h2 className="display-title mt-2 text-3xl font-semibold text-[var(--foreground)]">
                Sign in to your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Use your email and password to continue to the dashboard.
              </p>
            </div>

            <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
              <TextField isRequired name="email" type="email" validate={validateEmail}>
                <Label>Email</Label>
                <Input className="w-full" placeholder="you@example.com" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password" validate={validatePassword}>
                <Label>Password</Label>
                <Input className="w-full" placeholder="Enter your password" />
                <Description>Use the same password you chose during sign up.</Description>
                <FieldError />
              </TextField>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button
                  className="h-12 rounded-full bg-[linear-gradient(135deg,#f26d4c,#f78f59)] px-6 text-base font-semibold text-white"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Sign in
                </Button>
                <Button className="h-12 rounded-full border border-[var(--border)] bg-white/70 px-6 text-base" type="reset" variant="light">
                  Reset
                </Button>
              </div>
            </Form>

            <p className="mt-6 text-sm text-[var(--muted)]">
              New here?{" "}
              <Link className="font-semibold text-[var(--accent-strong)]" href="/auth/signup">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
