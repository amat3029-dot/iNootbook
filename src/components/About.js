import React, { useContext, useEffect } from 'react'


function About() {
  return (
    <div className="container">
      <h2 className="mb-3">Explore iNotebook</h2>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              1.About iNotebook
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>iNotebook:</strong> iNotebook is a secure and user-friendly note-taking application that allows users to create, edit, and manage their notes efficiently. It helps you keep your ideas organized and accessible anytime, anywhere.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              2.Features
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Key Features:</strong><br />
              • Create, edit, and delete notes<br />
              • Secure login and signup authentication<br />
              • Fast and responsive user interface<br />
              • Notes stored safely with user-specific access<br />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              3.Technology Used
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Tech Stack:</strong><br />
              • Frontend: React.js<br />
              • Backend: Node.js, Express.js<br />
              •  Database: MongoDB<br />
              •  Authentication: JSON Web Token (JWT)<br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
