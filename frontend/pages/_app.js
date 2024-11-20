import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}
