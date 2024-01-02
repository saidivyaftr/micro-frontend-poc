import React from 'react'
import dynamic from 'next/dynamic';

const Accordion = dynamic(
    () => {
        return import('components/Accordion');
    },
    { ssr: false },
);
const Typography = dynamic(
    () => {
        return import('components/Typography');
    },
    { ssr: false },
);

const data = [{
    title: 'Who is eligible?',
    description: 'New Frontier Fiber Internet business customers who are charged an Early Termination Fee/Cancellation Fee(s) by their previous provider for disconnecting their internet service.'
},
{
    title: 'What is the minimum purchase requirement?',
    description: 'Customers must purchase Frontier Fiber Internet service.'
}, {
    title: 'What is the value of my contract buyout?',
    description: 'Frontier will issue new qualifying Fiber Internet customers a bill credit (up to $500), for the exact amount of the Early Termination Fee/Cancellation Fee(s) charged by their previous provider. Customers must submit a copy of their previous providers bill with the Early Termination Fee/ Cancellation Fee(s) amount to receive a Frontier bill credit.'
},
{
    title: 'Do you need the ENTIRE final bill from my previous provider?',
    description: 'You must submit your Contract Buyout request within 90 days of your Frontier service installation date.'
},
{
    title: 'My previous provider charged more than $500 to disconnect my account. Will Frontier cover that entire amount?',
    description: 'You must submit a bill that clearly shows your name, address, and the Early Termination Fee/Cancellation Fee(s) amount billed. The name on your Frontier account must match the name on the final bill from your previous provider.'
}]

const header = () => {
    return (
        <div sx={{
            paddingBottom: '80px'
        }}>

            <Typography styleType='h3' sx={{
                textAlign: 'center',
                padding: '90px 0px 90px 0px'
            }}>
                Frequently Asked Questions

            </Typography>
            <Accordion list={data} />
            <Typography styleType='p3' sx={{
                paddingTop: '80px',
            }}>

                All Rights Reserved. Frontier Communications is committed to maintaining the integrity of our telecommunications systems. To achieve these goals, we observe and enforce the Terms and Conditions available for review at frontier.com/terms.
            </Typography>

        </div>

    )
}

export default header
