import { cn } from "../utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        `bg-blue-500 text-white px-4 py-2 rounded`,
        "hover:cursor-pointer active:scale-95",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
