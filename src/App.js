import React,{useState} from 'react';
import './App.css';
import {useForm} from 'react-hook-form';
import Historylist from './components/Historylist';
//import Home from './components/Home';
import axios from 'axios';



function App() {
  const [calc,setCalc]=useState("");
  const [result,setResult]=useState("");
  const ops=['/','*','+','-','.'];
  var [res, setRes]=useState('');
  //console.log("res-1 is ",res);
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

   //console.log("res is ",res);

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

     let histArr=[];
     let dbObject = {};
     dbObject.operandOne = opArr[0];
     dbObject.operandTwo = opArr[1];
     dbObject.operator = opt;
     dbObject.answer = ans;
     dbObject.time= new Date().toString();

     const obj = dbObject;
     histArr.push(obj);
     console.log("histArr = ",histArr);
      axios.post('http://localhost:4000/history/createobject', obj)
     .then(response=>{
      //console.log("response is ",response.data);
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




const {register, handleSubmit, formState: {errors}} = useForm();
const [history,setHistory] = useState([]);

const onFormSubmit = (dbObject) => {
   console.log("onFromSubmit2 = ", dbObject);
   setHistory([...history,dbObject]);
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
    
    <div className='col-sm-6'>
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
            <button onClick={caluclate}>=</button>
         </div>
      </div> 

      <div className='hist'>  
        <form onSubmit={handleSubmit(onFormSubmit)}>
           <button type='submit'> <h4>History</h4> </button>

        </form>
      </div>
    </div>

    <div className='col-sm-6'>
          <Historylist  />
    </div>

    </div>  
    </div>    
  );
}

export default App;







// function App() {
//   return (
//     <div className='row'>
//        <Home />
//        <Historylist/>
//     </div>
    
//   )
// }

// export default App
