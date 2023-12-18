import React from 'react';
import Typograhpy from './components/Typography';
import Footer  from './components/Footer';

const data = {
  bottomLinks: [
    {
      "title": "Home",
      "href": "/",
      "onClick": ""
    },
    {
      "title": "Site Map",
      "href": "https://frontier.com/page-sitemap",
      "onClick": ""
    },
    {
      "title": "Policies &amp; Notifications",
      "href": "/corporate/policies",
      "onClick": ""
    },
    {
      "title": "Terms &amp; Conditions",
      "href": "/corporate/terms",
      "onClick": ""
    },
    {
      "title": "Privacy Policy",
      "href": "/corporate/privacy-policy",
      "onClick": ""
    },
    {
      "title": "California Privacy Policy",
      "href": "/corporate/privacy-policy-california",
      "onClick": ""
    },
    {
      "title": "Connecticut Privacy Policy",
      "href": "/corporate/privacy-policy-connecticut",
      "onClick": ""
    },
    {
      "title": "Do Not Sell or Share My Personal Information",
      "href": "",
      "onClick": "OneTrust.ToggleInfoDisplay() "
    }
  ],
  links: [
    {
      "title": "Shop",
      "children": [
        {
          "title": "Plans",
          "href": "/shop"
        },
        {
          "title": "Internet",
          "href": "/shop/internet"
        },
        {
          "title": "Fiber Internet",
          "href": "/shop/internet/fiber-internet "
        },
        {
          "title": "Video/TV",
          "href": "/shop/tv"
        },
        {
          "title": "Phone",
          "href": "/shop/phone"
        },
        {
          "title": "Additional Services",
          "href": "/shop/additional-services"
        },
        {
          "title": "Moving",
          "href": "/resources/movers"
        },
        {
          "title": "Availability",
          "href": "/local"
        },
        {
          "title": "Multifamily",
          "href": "/resources/multifamily"
        }
      ]
    },
    {
      "title": "My Account",
      "children": [
        {
          "title": "Register",
          "href": "https://frontier.com/resources/frontier-id-registration?icid=18oct12_national_homepage_register_footer_page_link"
        },
        {
          "title": "Pay Bill",
          "href": "/account#/payments/onetime"
        },
        {
          "title": "Check Email",
          "href": "https://login.frontier.com/webmail"
        },
        {
          "title": "Manage Account",
          "href": "/account#/summary"
        },
        {
          "title": "MyFrontier App",
          "href": "/resources/myfrontier-mobile-app"
        }
      ]
    },
    {
      "title": "Support",
      "children": [
        {
          "title": "Help Center",
          "href": "https://frontier.com/helpcenter"
        },
        {
          "title": "How-To Videos",
          "href": "https://videos.frontier.com/"
        },
        {
          "title": "Support Wizard",
          "href": "/helpcenter/categories/support-wizard"
        },
        {
          "title": " Order/Ticket Status",
          "href": "/helpcenter/order-ticket-status"
        },
        {
          "title": "Contact Us",
          "href": "/contact-us"
        }
      ]
    },
    {
      "title": "Corporate",
      "children": [
        {
          "title": "Company",
          "href": "https://newsroom.frontier.com/leadership"
        },
        {
          "title": "Investors",
          "href": "https://investor.frontier.com/"
        },
        {
          "title": "News",
          "href": "https://newsroom.frontier.com"
        },
        {
          "title": "Blog",
          "href": "https://blog.frontier.com/"
        },
        {
          "title": "Responsibility",
          "href": "https://frontier.com/corporate/responsibility/home"
        },
        {
          "title": "Suppliers",
          "href": "https://newsroom.frontier.com/suppliers"
        },
        {
          "title": "Discount Programs",
          "href": "/discount-programs"
        },
        {
          "title": "Careers",
          "href": "https://frontier-careers.com/"
        }
      ]
    },
    {
      "title": "Frontier Sites",
      "children": [
        {
          "title": "Small Business",
          "href": "https://business.frontier.com/"
        },
        {
          "title": "Enterprise",
          "href": "https://enterprise.frontier.com/"
        },
        {
          "title": "Wholesale",
          "href": "https://wholesale.frontier.com/home"
        },
        {
          "title": "Frontier Yahoo Portal",
          "href": "https://frontier.yahoo.com/"
        },
        {
          "title": "Frontier Business Partner Program",
          "href": "https://agents.frontier.com/"
        },
        {
          "title": "Phone Directories",
          "href": "/resources/white-pages"
        }
      ]
    },
    {
      "title": "Sales Partners",
      "children": [
        {
          "title": "Frontier Fiber",
          "href": "https://go.frontier.com/"
        },
        {
          "title": "Local Internet",
          "href": "https://www.frontierbundles.com/availability"
        }
      ]
    }
  ],
}

const App = () => (
  <div>
    <Typograhpy tagType='h1' styleType='h4'>test page</Typograhpy>
    <Footer {...data} />
  </div>
);

export default App;
