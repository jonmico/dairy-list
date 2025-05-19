import { House, ListChecksIcon, UserRound } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';

export default function AppLayout() {
  return (
    <div className='h-screen grid grid-rows-[auto_1fr_auto]'>
      <div className='border-b border-b-slate-700/75 p-3 flex justify-between items-center'>
        <div className='text-xl font-bold'>DairyList</div>
        <div>
          <UserRound />
        </div>
      </div>
      <div className='p-4 overflow-hidden'>
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
      </BottomNavBar>
    </div>
  );
}

interface BottomNavBarProps {
  children: React.ReactNode;
}

function BottomNavBar(props: BottomNavBarProps) {
  return (
    <nav>
      <ul className='border-t border-t-slate-700/75 flex justify-around items-center p-2 w-full'>
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
