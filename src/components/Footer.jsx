import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="">
      <footer className="footer py-1 text-white bg-dark fixed-bottom mt-5 d-none d-lg-block">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col text-center">
              <p className="font-bold p-4">Veterinary UruPets</p>
            </div>
            <div className="col text-center">
              <p className="font-bold p-4">
                New Street 1234, Montevideo, Uruguay
              </p>
            </div>
            <div className="col text-center">
              <p className="font-bold p-4">Tel: 091123542</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
