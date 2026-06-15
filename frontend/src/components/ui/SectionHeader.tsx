interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  center = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-5 py-2 rounded-full mb-5 tracking-wide uppercase">
          {badge}
        </span>
      )}
      <h2 className={`section-title mb-4 ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${center ? 'mx-auto text-center' : ''} ${light ? 'text-blue-100' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
