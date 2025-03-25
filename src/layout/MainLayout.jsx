import React from 'react'
import {Outlet} from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ScrollUpButton from "../Components/ScrollUpButton";

const MainLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    <ScrollUpButton/>
    </>
  )
}

export default MainLayout
