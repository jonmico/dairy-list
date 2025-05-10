import { Outlet } from 'react-router';

// TODO: Find an icon pack.
// TODO: Think about layout more.

export default function AppLayout() {
  return (
    <div className='h-screen grid grid-rows-[3.5rem_1fr_4rem]'>
      <div>This will be a header</div>
      <div>
        <Outlet />
      </div>
      <div>This will be some type of footer with links</div>
    </div>
  );
}
