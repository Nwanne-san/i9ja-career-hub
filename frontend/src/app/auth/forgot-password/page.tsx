"use client";

import { useState } from "react";
import Link from "next/link";
import SiteShell from "@/modules/shared/component/SiteShell";
import Button from "@/modules/shared/component/Button";
import { CWTextField } from "@/modules/shared/component/FormFields/CWTextField";
import { useFormValidator } from "@/utils/hooks/useFormValidator";
import { z } from "zod";
import { AppRoutes } from "@/routes/app.routes";
import { FORGOT_PASSWORD_COPY } from "./forgotPassword.content";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const { control, handleSubmit } = useFormValidator<FormData>({
    validationSchema: schema,
    defaultValues: { email: "" },
  });

  const onSubmit = () => {
    setSubmitted(true);
  };

  return (
    <SiteShell>
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-gutter py-24">
        <h1 className="mb-2 font-headline-lg text-headline-lg text-on-surface">
          {FORGOT_PASSWORD_COPY.title}
        </h1>
        <p className="mb-6 text-on-surface-variant">
          {FORGOT_PASSWORD_COPY.subtitle}
        </p>

        {submitted ? (
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-on-surface">
            {FORGOT_PASSWORD_COPY.success}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CWTextField
              name="email"
              control={control}
              label={FORGOT_PASSWORD_COPY.emailLabel}
              type="email"
            />
            <Button type="submit" className="w-full">
              {FORGOT_PASSWORD_COPY.submit}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm">
          <Link href={AppRoutes.auth} className="text-primary hover:underline">
            {FORGOT_PASSWORD_COPY.backToLogin}
          </Link>
        </p>
      </main>
    </SiteShell>
  );
}
