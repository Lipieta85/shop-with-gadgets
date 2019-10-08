// import React from "react";
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

// const Footer = () => {
//   return (
//     <MDBFooter color="blue" className="font-small pt-4 mt-4">
//       <MDBContainer fluid className="text-center text-md-left">
//         <MDBRow>
//           <MDBCol md="6">
//             <h5 className="title">Footer Content</h5>
//             <p>
//               Here you can use rows and columns here to organize your footer
//               content.
//             </p>
//           </MDBCol>
//           <MDBCol md="6">
//             <h5 className="title">Links</h5>
//             <ul>
//               <li className="list-unstyled">
//                 <a href="#!">Link 1</a>
//               </li>
//               <li className="list-unstyled">
//                 <a href="#!">Link 2</a>
//               </li>
//               <li className="list-unstyled">
//                 <a href="#!">Link 3</a>
//               </li>
//               <li className="list-unstyled">
//                 <a href="#!">Link 4</a>
//               </li>
//             </ul>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//       <div className="footer-copyright text-center py-3">
//         <MDBContainer fluid>
//           &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
//         </MDBContainer>
//       </div>
//     </MDBFooter>
//   );
// }

// export default Footer;


import React from 'react';
import "../assets/styles/footer.scss";


const Footer = () => {
  return (
    <div>
      <footer className="">
        <div className="footer-menu">
          <div className="container">
            <div className="row">
              <div className="col-xs-6 col-sm-12 col-md-1 col-lg-3 footer-logo">
               <a href="#"><img src="https://wixeurope.com/website/images/common/logo_wix.png"></img></a>
              </div>
              <div className="col-xs-12 col-sm-9 col-md-9 col-lg-3">
                <ul className="footer-links">
                  <li><a href="#">link1</a></li>
                  <li><a href="#">link2</a></li>
                  <li><a href="#">link3</a></li>
                </ul>
              </div>
              <div className="col-xs-12 col-sm-9 col-md-9 col-lg-3">
                <ul className="footer-links">
                  <li><a href="#">link1</a></li>
                  <li><a href="#">link2</a></li>
                  <li><a href="#">link3</a></li>
                </ul>
              </div>
              <div className="col-xs-12 col-sm-9 col-md-9 col-lg-3">
               <ul className="footer-links">
                  <li><a href="#">link1</a></li>
                  <li><a href="#">link2</a></li>
                  <li><a href="#">link3</a></li>
                </ul>
              </div>
              <div className="col-lg-12 rights">
                <p>COPYRIGHT © 2017 BY WIX FILTERS <br></br>
                  MANN+HUMMEL FT POLAND SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ SP. K. <br></br>
                  UL. WROCŁAWSKA 145, 63-800 GOSTYŃ, POLAND</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;