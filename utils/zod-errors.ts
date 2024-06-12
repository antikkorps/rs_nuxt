import type { z } from "zod";
import type { ErrorMap } from "~/types/errors";

export const handleZodErrors = <T>({
    errorResponse,
    errorObject,
  }: {
    errorResponse: z.ZodIssue[];
    errorObject: ErrorMap<T>;
  }) => {
    if (errorResponse) {
      errorResponse.forEach((err: z.ZodIssue) => {
        const field = err.path[0] as keyof T;
        if (errorObject.hasOwnProperty(field)) {
          errorObject[field] = err.message;
        }
      });
    } else {
      console.log("Unknown error", errorResponse);
    }
  };