import { BrowserRouter, Navigate, Routes, Route   } from 'react-router-dom';
import { Home } from '../views/home/Home';
import { MainDashboard } from '../views/main-dashboard/MainDashboard';



export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MainDashboard/> } >
          <Route path='home' element={ <Home/> } />
          <Route path='' element={ <Navigate to='home' replace />} />
          <Route path='/*' element={ <Navigate to='home' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
