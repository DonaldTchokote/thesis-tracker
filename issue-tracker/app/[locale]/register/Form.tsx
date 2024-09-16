"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorMessage, Spinner } from "../components";
import ErrorDialog from "../components/ErrorDialog";
interface Translations {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  formTitle: string;
  formSubtitle: string;
  linkToSignInLabel: string;
  loginPage: string;
  action: string;
  firstnameValidationMessage: string;
  lastnameValidationMessage: string;
  emailValidationMessage: string;
  passwordValidationMessage: string;
  unexpectedError: string;
}
const Form = ({ translations }: { translations: Translations }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    firstname,
    lastname,
    email,
    password,
    formTitle,
    formSubtitle,
    linkToSignInLabel,
    loginPage,
    action,
    firstnameValidationMessage,
    lastnameValidationMessage,
    emailValidationMessage,
    passwordValidationMessage,
    unexpectedError,
  } = translations;

  const registerSchema = z.object({
    firstname: z.string().min(1, { message: firstnameValidationMessage }),
    lastname: z.string().min(1, { message: lastnameValidationMessage }),
    email: z.string().email({ message: emailValidationMessage }),
    password: z.string().min(1, { message: passwordValidationMessage }),
  });

  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const handleRegistration = async (data: FieldValues) => {
    setLoading(true);
    const response = await fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      }),
    });
    if (response.ok) {
      router.push("/signIn");
    } else {
      setLoading(false);
      setError(unexpectedError);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <ErrorDialog className="mb-1 w-full">{error}</ErrorDialog>
          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            <div className="flex flex-col justify-center px-8 py-1 md:p-14">
              <span className="mb-1 text-4xl font-bold">{formTitle}</span>
              <span className="font-light text-gray-400 mb-4">
                {formSubtitle}
              </span>

              <Text>{firstname}</Text>
              <TextField.Root>
                <TextField.Input
                  placeholder={firstname}
                  {...register("firstname")}
                />
              </TextField.Root>
              <ErrorMessage>{errors.firstname?.message}</ErrorMessage>

              <Text>{lastname}</Text>

              <TextField.Root>
                <TextField.Input
                  placeholder={lastname}
                  {...register("lastname")}
                />
              </TextField.Root>
              <ErrorMessage>{errors.lastname?.message}</ErrorMessage>

              <Text>Email</Text>
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

              <div className="py-3"></div>

              <button
                data-cy="submit"
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white p-1 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
              >
                {isLoading && <Spinner />}
                <Text className="pl-3">{action}</Text>
              </button>

              <div className="text-center text-gray-400">
                <Text>{linkToSignInLabel}</Text>
                <Link href="/signIn" className="font-bold text-black ml-1">
                  {loginPage}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
