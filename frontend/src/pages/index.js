// // 메인 화면 
import { Route, Routes } from 'react-router-dom';
import './bootstrap.min.css'
import Layout from './layout/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import BecomeHost from './pages/BecomeHost';
import Ammenities from './pages/Ammenities';

function Routes(){
  return (
    <Layout>
      <Routes>
        <Route path= "/become-host" element= {<BecomeHost />} />
        <Route path= "/become-host/ammenities" element= {<Ammenities />} />
        <Route path= "/" element= {<Home />} />
        <Route path= "/login" element ={<Login />} />
        <Route path= "/signin" element= {<Signin />} />
        <Route path= "/mypage" element ={<Mypage />} />
      </Routes>
    </Layout>
  )
}

export default Routes;