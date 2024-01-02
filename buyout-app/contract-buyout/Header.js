import React from 'react'
import dynamic from 'next/dynamic';
const Typography = dynamic(
  () => {
    return import('components/Typography');
  },
  { ssr: false },
);

const Header = () => {
  return (
    <div xs={{
      backgroundColor: 'black',
    }}>
      <Typography styleType='h1' xs={{
        textAlign: 'center',
        color: '#96fff5 !important',
        padding: '90px 0px 90px 0px'
      }}>
        Business Contract Buyout
        Information Required
      </Typography>
    </div>

  )
}

export default Header