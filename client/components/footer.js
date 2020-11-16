import React from 'react'
import {GoMarkGithub} from 'react-icons/go'
import {AiTwotoneTrophy} from 'react-icons/ai'
import {MDBCol, MDBContainer, MDBRow, MDBFooter} from 'mdbreact'

const Footer = () => {
  return (
    <MDBFooter
      style={{backgroundColor: '#ffbb33'}}
      className="font-small pt-4 mt-4"
    >
      <MDBContainer
        fluid
        className="text-center text-md-left"
        style={{alignItems: 'right'}}
      >
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Grace Cropper</h5>
            <p>Crop 'til you drop!</p>
            <a
              href="https://github.com/gracecropper/gracecropper"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GoMarkGithub color="##e36397" size={32} /> Link to GitHub
            </a>
          </MDBCol>
          <MDBCol md="5" style={{textAlign: 'left'}}>
            <MDBCol md="6">
              <h5 className="title">Proud Creators</h5>
              <ul>
                <li className="list-unstyled">
                  <AiTwotoneTrophy size={25} /> Tianying (Jenna) Jiang
                </li>
                <li className="list-unstyled">
                  <AiTwotoneTrophy size={25} /> Jin Young Choi
                </li>
                <li className="list-unstyled">
                  <AiTwotoneTrophy size={25} /> Amanda Barrafato
                </li>
                <li className="list-unstyled">
                  <AiTwotoneTrophy size={25} /> Jennifer Rafael
                </li>
              </ul>
            </MDBCol>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div>
        <MDBContainer
          style={{backgroundColor: '#FF8800', height: '25px'}}
          fluid
        />
      </div>
    </MDBFooter>
  )
}

export default Footer
