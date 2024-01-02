import React, { Fragment, Suspense } from 'react';
import Header from '../../contract-buyout/Header'
import Accordion from '../../contract-buyout/Accodion'
import Footer from '../../contract-buyout/Footer'

const Home = () => {
    return (
        <>
            <Header />
            <Accordion />
            <Footer />
        </>
    );
};


export default Home;
