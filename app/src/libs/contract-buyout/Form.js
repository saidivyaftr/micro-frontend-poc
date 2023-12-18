import React from 'react'
import { makeStyles } from '@material-ui/core'
import dynamic from 'next/dynamic';

const Typography = dynamic(
  () => {
    return import('components/Typography');
  },
  { ssr: false },
);

const Button = dynamic(
    () => {
      return import('components/Button');
    },
    { ssr: false },
  );


const RenderInput = ({name = '', placeholder = ''}) => {
    const classes = useStyles()
    return (
        <div className={classes.inputWrapper}>
            <Typography className={classes.label} styleType="p2">{name}</Typography>
            <input placeholder={placeholder} className={classes.input} />
        </div>
        
    )
}

const Form = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography styleType='h3' tagType="h2" className={classes.heading} fontType="regularFont">
            To receive your business bill credit
        </Typography>
        <Typography styleType='p2' tagType="p" className={classes.headingAlt} fontType="regularFont">
            Please complete this form and upload a copy of your final bill within 90 days of your installation.
        </Typography>
        <RenderInput name="First and Last Name" placeholder="Enter your full name" />
        <RenderInput name="Frontier Order Number" placeholder="Enter your frontier order number" />
        <RenderInput name="Number Where We May Reach You" placeholder="Enter your phone number" />
        <RenderInput name="Email Address" placeholder="Enter your email naddress" />
        <RenderInput name="Early Termination Fee Amount" placeholder="Enter the ETF dollar amount" />
        <RenderInput name="Previous Service Provider" placeholder="Enter your previous service provider" />
        <Button text="Submit" type="button"/>
      </div>
  </div>
    
  )
}

export default Form
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#f4f4f4',
    textAlign:'center',
    padding: '5rem'
  },
  content: {
    maxWidth: 600,
    margin: '0 auto',
  },
  heading: {
 
  },
  headingAlt: {
  },
  inputWrapper:{
    marginBottom: '1rem',
    textAlign: 'left'
  },
  label:{
    display:"block"
  },
  input:{
    display: 'block',
    width: '100%',
    height: 34,
    padding: '6px 12px',
    fontSize: 14,
    lineHeight: '1.4px',
    color: '#555',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 4
  }
}))