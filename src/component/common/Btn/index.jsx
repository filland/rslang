import React from 'react';
import { Button } from 'react-bootstrap';

export default function Btn(props) {
  return (
    <>
      <style type="text/css">
        {`
        .btn-default {
          background-color: #5C9EAD;
          border: 2px solid #5C9EAD;
          color: white;
        }
        .btn-default:hover, .btn-default:active, .btn-default:focus, .btn-default:visited {
          background-color: #ffd86f;
          border: 2px solid #ffd86f;
          color: #114B5F;
        }
        `}
      </style>

      <Button variant="default" {...props}>
        {props.children}
      </Button>
    </>
  );
}
