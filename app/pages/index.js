import React, { Fragment, Suspense } from 'react';
import Hero from 'src/libs/contract-buyout/Hero'
import Form from 'src/libs/contract-buyout/Form'
import Accordion from 'src/libs/contract-buyout/Accodion'
// import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import { makeStyles } from '@material-ui/core/styles'
const Home = () => {
  const classes = useStyles()
  return (
    <>
      {/* <Header /> */}
      <Hero />
      <Form />
      <div className={classes.main}>
        <Accordion />
      </div>
      <Footer />
    </>
  );
};

const useStyles = makeStyles(() => ({
  main: {
    maxWidth: 1200,
    margin: '0 auto'
  },
}))

export default Home;
