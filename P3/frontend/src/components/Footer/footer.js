import React, { useState } from 'react';

function Footer() {
  return ( <>
<footer className="text-center text-lg-start bg-light text-muted">
            {/* Section: Social media */}
            <section className={"d-flex justify-content-center justify-content-lg-between border-bottom"} id="footer">
              <div>
                <a className="me-4 text-reset">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="me-4 text-reset">
                  <i className="fab fa-twitter" />
                </a>
                <a className="me-4 text-reset">
                  <i className="fab fa-google" />
                </a>
                <a className="me-4 text-reset">
                  <i className="fab fa-instagram" />
                </a>
                <a className="me-4 text-reset">
                  <i className="fab fa-linkedin" />
                </a>
                <a className="me-4 text-reset">
                  <i className="fab fa-github" />
                </a>
              </div>
              {/* Right */}
            </section>
            {/* Section: Social media */}
            {/* Section: Links  */}
            <section className>
              <div className="container text-center text-md-start mt-5">
                {/* Grid row */}
                <div className="row mt-3">
                  {/* Grid column */}
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    {/* Content */}
                    <h6 className="text-uppercase fw-bold mb-4">
                      <i className="fas fa-gem me-3" />Restify
                    </h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, natus reiciendis! Iusto
                      blanditiis iure quo ratione ipsa minima, veritatis corrupti!
                    </p>
                  </div>
                  {/* Grid column */}
                  {/* Grid column */}
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    {/* Links */}
                    <h6 className="text-uppercase fw-bold mb-4">
                      Contact
                    </h6>
                    <p><i className="fas fa-home me-3" />Mississauga, ON L5L 1C6</p>
                    <p>
                      <i className="fas fa-envelope me-3" />
                      info@example.com
                    </p>
                    <p><i className="fas fa-phone me-3" /> + 01 234 567 89/p&gt;
                    </p><p><i className="fas fa-print me-3" /> + 01 234 567 89</p>
                  </div>
                  {/* Grid column */}
                </div>
                {/* Grid row */}
              </div>
            </section>
            {/* Section: Links  */}
            {/* Copyright */}
            <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
              © 2022 Copyright:
              <a className="text-reset fw-bold" href="https://mdbootstrap.com/">Restify.com</a>
            </div>
            {/* Copyright */}
          </footer>

          </>
  );
}

export default Footer;