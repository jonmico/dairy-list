interface PageHeaderProps {
  children: React.ReactNode;
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <h1 className='text-xl font-bold border-b border-b-slate-700/75'>
      {props.children}
    </h1>
  );
}
