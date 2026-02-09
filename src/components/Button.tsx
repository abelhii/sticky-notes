import { cn } from "../utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        `bg-gray-600 text-white px-4 py-2 rounded`,
        "hover:cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
