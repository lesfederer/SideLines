import { Routes, Route } from 'react-router-dom';

import './globals.css';

const App = () => {
  return (
  <main className="flex h-screen">
    <Routes>
        {/* public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
      </Route>

        {/* private routes */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />}/>
      </Route>
    </Routes>
  </main>
  )
}

export default App
