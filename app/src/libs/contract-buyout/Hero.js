import React from 'react'
import { makeStyles } from '@material-ui/core'
import dynamic from 'next/dynamic';

const Typography = dynamic(
  () => {
    return import('components/Typography');
  },
  { ssr: false },
);

const header = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography styleType='h3' tagType="h1" className={classes.heading} color="secondary" fontType="regularFont">
          Business Contract Buyout
          Information Required
        </Typography>
      </div>
  </div>
    
  )
}

export default header
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#141928',
  },
  content: {
    maxWidth: 600,
    margin: '0 auto',
  },
  heading: {
    textAlign:'center',
    padding: '10rem 1rem',
    color: '#96fff5'
  }
}))