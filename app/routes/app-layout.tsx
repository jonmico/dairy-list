import { Link, User } from 'lucide-react';
import { Outlet } from 'react-router';

// TODO: Think about layout more.

export default function AppLayout() {
  return (
    <div className='h-screen grid grid-rows-[3.5rem_1fr_4rem]'>
      <div className='border-b border-b-slate-700/75 p-2 flex justify-between items-center'>
        <div className='text-lg font-bold'>DairyList</div>
        <div>
          <User />
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <Outlet />
      </div>
      <div className='border-t border-t-slate-700/75  flex justify-between items-center px-5'>
        <div className='flex flex-col items-center gap-0.5 p-1'>
          <Link size={22} />
          <div className='text-sm'>Some Link</div>
        </div>
        <div className='flex flex-col items-center gap-0.5 p-1'>
          <Link size={22} />
          <div className='text-sm'>Some Link</div>
        </div>
        <div className='flex flex-col items-center gap-0.5 p-1'>
          <Link size={22} />
          <div className='text-sm'>Some Link</div>
        </div>
      </div>
    </div>
  );
}
