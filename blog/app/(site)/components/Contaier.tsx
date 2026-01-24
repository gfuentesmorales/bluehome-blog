interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 ${className}`}
    >
      {children}
    </div>
  );
}