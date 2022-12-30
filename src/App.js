import React,{useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';


function App() {
  const [calc,setCalc]=useState("");
  const [result,setResult]=useState("");
  const [firstobj,setFirstobj]=useState([]);
  const ops=['/','*','+','-','.'];
  var [res, setRes]=useState('');
  
  useEffect(()=>{
   
    fetch('http://localhost:4000/history/getAllData')
    .then(response=>response.json())
    .then(apiData => setFirstobj(apiData.payload))
    .catch(err=>console.log(err))
  },[]);

  const updateCalc=value=>{
     if( ops.includes(value) && calc==='' || (ops.includes(value) && ops.includes(calc.slice(-1))) )
     {
       return;
     }
        setCalc(calc+value);

        if(!ops.includes(value))
        {
          setResult(eval(calc+value).toString());
        }
        setRes(calc+value)

  }

  const createDigits=()=>{
       const digits=[];
       for(let i=1;i<10;i++)
       {
            digits.push(
              <button onClick={() => updateCalc(i.toString())}key={i}>{i}</button>
             
            )
            
        }
        
         return digits; 
   }


   const caluclate = () => {
     let opt;
     setCalc(eval(calc).toString());
     let ans = result;
     let opArr = [];
     for(let i=0 ; i< res.length; i++ ) {
       if(res[i]==='+') {
         opt = '+'
         opArr = res.split('+');
         break;
       }
       if(res[i]==='-') {
        opt = '-'
        opArr = res.split('-');
        break;
      }
      if(res[i]==='*') {
        opt = '*'
        opArr = res.split('*');
        break;
      }
      if(res[i]==='/') {
        opt = '/'
        opArr = res.split('/');
        break;
      }
     }

     
     let dbObject = {};
     dbObject.operandOne = opArr[0];
     dbObject.operandTwo = opArr[1];
     dbObject.operator = opt;
     dbObject.answer = ans;
     dbObject.time= new Date().toString();
     
     const obj=dbObject;
      axios.post('http://localhost:4000/history/createobject', obj)
     .then(response=>{
      alert(response.data.message);
      if(response.data.message==="Object Creation Success")
      {
        console.log("dbObj = ",obj);
      }
  })
  .catch(error=>{
    console.log("error is ",error) 
    alert("Something went wrong in creating user")
  })

  
}



   const deleteLast = () => {
     if(calc === '') {
       return;
     }
     res.slice(0, res.length-1);

     const value = calc.slice(0,-1);

     setCalc(value);
   }

  return ( 
    
    <div className="App">
    
    <div className='row' >  
    
    <div className='col-sm-4'>
       <h1>Caluclator</h1>
      <div className="caluclator">
       
       <div className='display'>{ result ? <span>({result})</span> : ''}&nbsp; { calc || "0"}</div>
         
         <div className="operators">
            <button onClick={() => updateCalc('/') }>/</button>
            <button onClick={() => updateCalc('*') }>*</button>
            <button onClick={() => updateCalc('+') }>+</button>
            <button onClick={() => updateCalc('-') }>-</button>

            <button onClick={deleteLast}>DEL</button>
         </div>

         <div className='digits'>
             {createDigits()}
             <button onClick={() => updateCalc('0') }>0</button>
            <button  onClick={() => updateCalc('.') }>.</button>
            <button onClick={caluclate} >=</button>
         </div>
      </div> 

      
    </div>

    <div className='col-sm-8'>
    <h1>Historylist({firstobj.length})</h1>
      <div className="secondRow">
          
          <Table>
            <thead>
              <tr>
                <th>OperandOne</th>
                <th>Operator</th>
                <th>OperatorTwo</th>
                <th>Answer</th>
              </tr>
            </thead>
              <tbody>
                {
                   firstobj.map((pro_ans)=><tr key={pro_ans.id}>
                      <td>{pro_ans.operandOne}</td>
                      <td>{pro_ans.operator}</td>
                      <td>{pro_ans.operandTwo}</td>
                      <td>{pro_ans.answer}</td>
                   </tr>)
                }
              </tbody>
          </Table>
    </div>       
    </div>

    </div>  
    </div>    
  );
}

export default App;

