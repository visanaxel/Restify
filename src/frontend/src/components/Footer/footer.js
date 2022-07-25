import React, { useState } from 'react';

function Footer() {
  return ( <>
<footer style={{position: 'fixed',
  bottom: '0',
  width: '100%',
  height: '100',
  zIndex: '900000'}} className="text-center text-lg-start bg-light text-muted">
            <div className="text-center " style={{backgroundColor: 'rgba(0, 0, 0, 0.05)', paddingTop: '20', paddingBottom: '20'}}>
              © 2022 Copyright:
              <a className="text-reset fw-bold" href="https://mdbootstrap.com/">Restify.com</a>
            </div>
            {/* Copyright */}
          </footer>

          </>
  );
}

export default Footer;