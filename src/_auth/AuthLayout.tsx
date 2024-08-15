import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;
  
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ): (
        <>
          <section className="flex flex-col items-center justify-center flex-1 py-10">
            <Outlet />
          </section>

          <img 
            src='/assets/images/poss-side-img.svg'
            alt='logo'
            className='object-cover w-1/2 h-screen x1:block'
          />
        </>
      )}
    </>
  )
}

export default AuthLayout