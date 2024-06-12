export type ErrorMap<T> = {
    [K in keyof T]?: string;
};