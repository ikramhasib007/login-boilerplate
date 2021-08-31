import { Fragment } from "react";
import Script from "./Script";
import NoScript from "./NoScript";

function FacebookPixelCode() {
  return <Fragment>
    <Script>
      {
        () => {
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1796984503929630'); 
          fbq('track', 'PageView');
        }
      }
    </Script>
    <NoScript>
      {
        () => {
          <img height="1" width="1" 
          src="https://www.facebook.com/tr?id=1796984503929630&ev=PageView
          &noscript=1"/>
        }
      }
    </NoScript>
  </Fragment>
}

export default FacebookPixelCode;