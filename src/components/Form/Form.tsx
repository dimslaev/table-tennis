import * as React from "react";
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type Props<Values extends FieldValues, Schema> = {
  onSubmit: SubmitHandler<Values>;
  children: (methods: UseFormReturn<Values>) => React.ReactNode;
  options?: UseFormProps<Values>;
  schema?: Schema;
};

export const Form = <
  Values extends FieldValues = FieldValues,
  Schema extends z.ZodType<unknown, z.ZodTypeDef, unknown> = z.ZodType<
    unknown,
    z.ZodTypeDef,
    unknown
  >
>({
  onSubmit,
  children,
  options,
  schema,
}: Props<Values, Schema>) => {
  const methods = useForm<Values>({
    ...options,
    resolver: schema && zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} role="form">
        {children(methods)}
      </form>
    </FormProvider>
  );
};
