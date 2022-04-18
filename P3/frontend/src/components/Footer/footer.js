import React, { useState } from 'react';

function Footer() {
  return ( <>
<footer style={{position: 'fixed',
  bottom: '0',
  width: '100%',
  height: '100' }} className="text-center text-lg-start bg-light text-muted">
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