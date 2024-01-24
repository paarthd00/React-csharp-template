import { RootRoute,Link,Outlet } from '@tanstack/react-router'

export const Route = new RootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/addmilk" className="[&.active]:font-bold">
          Add MIlk
        </Link>
        <Link to="/editmilk" className="[&.active]:font-bold">
         
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})