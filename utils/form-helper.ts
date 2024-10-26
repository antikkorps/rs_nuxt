// utils/formHelpers.ts
export function generateErrorFields(state: Record<string, any>, excludeKeys: string[] = []) {
  const errorObject: Record<string, string> = {};
  Object.keys(state).forEach((key) => {
    if (!excludeKeys.includes(key)) {
      errorObject[key] = "";
    }
  });
  return errorObject;
}

export const resetErrors = (errors: Record<string, any>) => {
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};