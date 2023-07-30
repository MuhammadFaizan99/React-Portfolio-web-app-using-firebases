import './App.css'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import { Route, Routes } from 'react-router-dom';
import PortfolioRoot from './components/PortfolioRoot';
import ErrorPage from './components/Error/ErrorPage'
import HeaderContent from './components/Home/HeaderContent/HeaderContent';
import HomeContent from './components/Home/HomeContent';
import ModalContent from './components/Home/ServiceContent/ModalContent/ModalContent';
import Testimonial from './components/Testimonial/Testimonial';
import ProjectSection from './components/Projects/ProjectSection';
import AllReviews from './components/Testimonial/AllReviews/AllReviews';

function App() {
  return (
    <>
    <div >
      <Routes>
        <Route path='/' element={<PortfolioRoot />}>
        <Route path='/' element={<HomeContent />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<ProjectSection />} />
        <Route path='/testimonial/*' element={<Testimonial />} />
        <Route path='/testimonial/allReviews' element={< AllReviews/>}/>
        <Route path='/contact' element={<Contact />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/modal' element={<ModalContent />} />
      </Routes>
      </div>
    </>
  )
}

export default App