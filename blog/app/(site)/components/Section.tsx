interface SectionProps {
  children: React.ReactNode;
  spacing?: string;
}

export default function Section({ children, spacing = "" }: SectionProps) {
  return (
    <div className=" md:grid-cols-12">
      {children}
    </div>
  )
}