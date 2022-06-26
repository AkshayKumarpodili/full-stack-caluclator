import React from 'react';
import styled from 'styled-components';
//import './History.css';
//import { projectObj} from "./App.js";


function Historylist(props) {
console.log(props.pro_ans);

  return (
  <Container>
    <div className='container'>
    <h1>Historylist</h1>
    <div className='classone'>
        <div>
          {
            props.pro_ans.map((res,id) =>
             <h1 key={id} >{res.operandOne}</h1>
            //   // <h1 key={res.id}>{res.operandTwo}</h1>
            //   // <h1 key={res.id}>{res.dbObject.operator}</h1> 
            //   // <h1 key={res.id}>{res.answer}</h1> 
            //   // <h1 key={res.id}>{res.time}</h1>
            //   console.log(res)
            )
          }
        </div>
    </div>
    </div>
  </Container>  
  )
}

const Container = styled.div`

.container
{
  .classone 
  {
    height: 90vh;
    width: 40vw;
    background-color: black;
      overflow: hidden;
     overflow-y: scroll;
     .h1
     {
       color : white;
     }
    } 
  }
}  
`;

export default Historylist