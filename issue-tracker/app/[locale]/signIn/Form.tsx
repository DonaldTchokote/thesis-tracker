"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Text, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorMessage, Spinner } from "../components";
import ErrorDialog from "../components/ErrorDialog";

interface Translations {
  email: string;
  password: string;
  formTitle: string;
  formSubtitle: string;
  linkToRegisterLabel: string;
  registerPage: string;
  action: string;
  emailValidationMessage: string;
  passwordValidationMessage: string;
  unexpectedError: string;
}

const Form = ({ translations }: { translations: Translations }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    email,
    password,
    formTitle,
    formSubtitle,
    linkToRegisterLabel,
    registerPage,
    action,
    emailValidationMessage,
    passwordValidationMessage,
    unexpectedError,
  } = translations;

  const loginSchema = z.object({
    email: z.string().email({ message: emailValidationMessage }),
    password: z.string().min(1, { message: passwordValidationMessage }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/dashbord",
    });
    console.log({ response });
    if (response?.ok) {
      router.push("/dashbord");
      router.refresh();
    } else {
      setLoading(false);
      setError(unexpectedError);
    }
  };

  type FormData = z.infer<typeof loginSchema>;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ErrorDialog className="mb-1 w-full">{error}</ErrorDialog>
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center px-8 py-1 md:p-14">
            <span className="mb-3 text-4xl font-bold">{formTitle}</span>
            <span className="font-light text-gray-400 mb-4">
              {formSubtitle}
            </span>

            <Text>{email}</Text>
            <TextField.Root>
              <TextField.Input placeholder={email} {...register("email")} />
            </TextField.Root>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>

            <Text>{password}</Text>
            <TextField.Root>
              <TextField.Input
                placeholder={password}
                {...register("password")}
                type="password"
              />
            </TextField.Root>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>

            <div className="flex justify-between w-full py-4"></div>

            <button className="w-full bg-black text-white p-1 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
              {isLoading && <Spinner />}
              <Text className="pl-3">{action}</Text>
            </button>

            <div className="text-center text-gray-400">
              <Text>{linkToRegisterLabel}</Text>
              <Link href="/register" className="font-bold text-black ml-1">
                {registerPage}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
