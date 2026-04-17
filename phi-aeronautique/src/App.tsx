import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Home from './pages/Home';
import Hangar from './pages/Hangar';
import AvionDetail from './pages/AvionDetail';
import APropos from './pages/APropos';
import CustomCursor from './components/CustomCursor';

function AnimatedRoutes() {
  const location = useLocation();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/hangar" element={<Hangar />} />
          <Route path="/avion/:slug" element={<AvionDetail />} />
          <Route path="/a-propos" element={<APropos />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
