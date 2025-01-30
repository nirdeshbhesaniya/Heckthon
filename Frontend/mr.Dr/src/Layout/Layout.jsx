// import React from 'react'
import Header from "../components/Header/Header";
import Footer from "../components/Fooetr/Footer";
import Router from "../Router/routers";
const Layout = () => {
  return (
  <>
  <Header />
  <main>
    <Router/>
  </main>
  <Footer />
  </>
  )
}

export default Layout