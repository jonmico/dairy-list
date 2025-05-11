import { House, Link, ListChecksIcon, User } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';

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
      <BottomNavBar>
        <NavItem to={'lists'}>
          <ListChecksIcon size={22} />
          <div className='text-sm'>Lists</div>
        </NavItem>
        <NavItem to={'/'}>
          <House size={22} />
          <div className='text-sm'>Home</div>
        </NavItem>
        <div>
          <Link size={22} />
          <div className='text-sm'>Some Link</div>
        </div>
      </BottomNavBar>
    </div>
  );
}

interface BottomNavBarProps {
  children: React.ReactNode;
}

function BottomNavBar(props: BottomNavBarProps) {
  return (
    <nav className='flex'>
      <ul className='border-t border-t-slate-700/75 flex justify-between items-center px-5 w-full'>
        {props.children}
      </ul>
    </nav>
  );
}

interface NavItemProps {
  children: React.ReactNode;
  to: string;
}

function NavItem(props: NavItemProps) {
  return (
    <li>
      <NavLink
        to={props.to}
        className='flex flex-col items-center gap-0.5 px-2.5'
      >
        {props.children}
      </NavLink>
    </li>
  );
}
