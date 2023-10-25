import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setlength] = useState(8);
  const [numAld, setnumAld] = useState(false);
  const [charAld, setcharAld] = useState(false);
  const [password, setpassword] = useState("");

  const passref = useRef(null)

  const passwordgenerator= useCallback(()=> {
    let pass ="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVQWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAld) str += "0123456789";
    if(charAld) str += "~!@#$%^&*`";

    for (let i = 0; i < length; i++) {
      const charind = Math.floor(Math.random() * str.length+1) 
      pass+= str.charAt(charind);
    }
    setpassword(pass);
  }, [length, numAld, charAld, setpassword])

  const cpClipBoard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    passref.current?.select()
  },[setpassword])

  useEffect(() => { passwordgenerator()  }, [length, numAld, charAld, setpassword])
  
  return (
    <>
      <div className=' w-full max-w-md mx-auto rounded-lg shadow-md px-4 py-3 my-8 text-orange-500 bg-gray-600 '>
        <h1 className='text-center text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            readOnly
            className='outline-none w-full px-3 py-1'
            placeholder='password'
            ref={passref}
           />
           <button onClick={cpClipBoard} className=' overflow-none text-white bg-blue-600 p-4 cursor-pointer hover:bg-blue-800'>Copy</button>
        </div>

        <div className='flex flex-col gap-x-2'>
          <div className='flex gap-x-1 items-center'>
            <input 
            type="range"
            min={8}
            max={15}
            value={length}
            className='cursor-pointer'
            onChange={(e)=> setlength(e.target.value)} />
            <label > Length of your Random password: {length}</label>
          </div>
          <div>
            <input type="checkbox"
              defaultChecked={numAld}
              onChange={()=>{
                setnumAld((prev)=> !prev);
              }}
              className='m-2'
            />
            <label>Add Numbers in your Parssword</label>
          </div>
          <div>
            <input type="checkbox"
              defaultChecked={charAld}
              onChange={() => {
                setcharAld((prev) => !prev);
              }}
              className='m-2'
            />
            <label>Add Characters in your Parssword</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
