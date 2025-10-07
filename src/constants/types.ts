// React.PropsWithChildren has an optional prop for children
// To avoid misunderstanding this two types PropsWithChildren and PropsWithOptionalChildren
export type TPropsWithChildren<P = unknown> = P & { children: React.ReactNode };
export type TPropsWithOptionalChildren<P = unknown> = P & {
  children?: React.ReactNode;
};

export type TModalProps<T = object> = T & {
  onClose: () => void;
};
