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
  if (!/[A-Z]/.test(value)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[0-9]/.test(value)) {
    return "Password must contain at least one number";
  }

  return null;
}

const benefits = [
  "Friendly first-run experience",
  "Responsive layout for phone and desktop",
  "Clear password rules before submission",
];

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email(userData);

    setIsSubmitting(false);

    if (error) {
      toast.danger("Could not create your account", {
        description: error.message,
      });
      return;
    }

    if (data) {
      toast.success("Account created", {
        description: "You can sign in now. Redirecting you to the sign-in page.",
      });
      router.push("/auth/signin");
    }
  };

  return (
    <main className="min-h-screen px-6 py-8 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="glass-panel flex items-center rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-8">
              <p className="text-sm font-medium text-[var(--accent-strong)]">Create account</p>
              <h1 className="display-title mt-2 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
                Start with a cleaner, more confident sign-up flow.
              </h1>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                The form now explains what is needed, keeps the layout easy to scan, and removes the
                feeling of a bare starter template.
              </p>
            </div>

            <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
              <TextField isRequired className="w-full" name="name" type="text">
                <Label>Name</Label>
                <Input placeholder="Jane Doe" />
                <Description>This is the name we will show in your workspace.</Description>
              </TextField>

              <TextField isRequired name="email" type="email" validate={validateEmail}>
                <Label>Email</Label>
                <Input placeholder="jane@example.com" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password" validate={validatePassword}>
                <Label>Password</Label>
                <Input placeholder="Create a strong password" />
                <Description>At least 8 characters, with 1 uppercase letter and 1 number.</Description>
                <FieldError />
              </TextField>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button
                  className="h-12 rounded-full bg-[linear-gradient(135deg,#1f5c3f,#54b56f)] px-6 text-base font-semibold text-white"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Create account
                </Button>
                <Button className="h-12 rounded-full border border-[var(--border)] bg-white/70 px-6 text-base" type="reset" variant="light">
                  Reset
                </Button>
              </div>
            </Form>

            <p className="mt-6 text-sm text-[var(--muted)]">
              Already have an account?{" "}
              <Link className="font-semibold text-[var(--accent-strong)]" href="/auth/signin">
                Sign in
              </Link>
            </p>
          </div>
        </section>

        <section className="glass-panel flex flex-col justify-between rounded-[2rem] p-8 lg:p-10">
          <div>
            <p className="eyebrow">Why it feels better</p>
            <h2 className="display-title mt-4 max-w-md text-4xl font-semibold text-[var(--foreground)]">
              Designed to feel less technical and more welcoming.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
              Instead of a flat page with fields dropped in the middle, this layout gives people context,
              confidence, and a clear next step.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="rounded-[1.5rem] border border-white/80 bg-white/70 px-5 py-4 shadow-[0_12px_32px_rgba(24,41,31,0.06)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                  0{index + 1}
                </p>
                <p className="mt-2 text-base text-[var(--foreground)]">{benefit}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
