import React, { Fragment } from 'react';
import Header from '../sharecomponents/Header';
import Sidebar from '../sharecomponents/Sidebar';
import Usermainpage from './Usermainpage';
import Footer from '../sharecomponents/Footer';
import { Outlet } from 'react-router-dom';

function Userlandingpage() {
  return (
    <Fragment>
      <Header/>
      <div className='container-fluid'>
        <div className='row'> 
          <div className='col-md-2 p-0'>
            <Sidebar/>
          
          </div>
          <div className='col-md-10 fix-height p-4'>
                <Outlet></Outlet>
          </div>
        </div>
      </div>
      <Footer/>
    </Fragment>
  )
}

export default Userlandingpage;
