import Link from "next/link";
import React from "react";

const Footer = () => {
  return <div id='footer' className="bg-secondary-background h-[200px] ">
    <div className="container flex flex-col justify-center items-center">
      <div className="flex gap-6 items-center">
        <Link href="#">  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="#ebe2e2" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg></Link>
        <Link href="#"></Link>
    

      </div>
      

    </div>

  </div>;
};

export default Footer;
