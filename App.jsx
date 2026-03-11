import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [specialAllow, setSpecialAllow] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef()

  const passwordGenerator = useCallback((() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllow) str += "0123456789"
    if(specialAllow) str += "!@#$%^&*-_+="

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  }), [length, numberAllow, specialAllow, setPassword])

  const copyClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllow, specialAllow, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 text-black bg-gray-600 py-5'>
          <h1 className='text-white text-center mb-5 font-bold text-3xl'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input
              type="text"
              value={password}
              className='outline-none w-full bg-white px-5 py-1'
              placeholder='Password'
              readOnly
              ref={passwordRef}
            />
            <button onClick={copyClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-4 hover:bg-blue-600'>copy</button>
          </div>
          <div className='flex text-sm place-content-between px-5 font-medium text-gray-900'>
            <div className='flex items-center gap-x-1'>
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}}
              /> <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={numberAllow}
                id="numerInput"
                onChange={(e) => {setNumberAllow((prev) => !prev)}}
              /> <label>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={specialAllow}
                id="specialInput"
                onChange={(e) => {setSpecialAllow((prev) => !prev)}}
              /> <label>Special Characters</label>
            </div>
          </div>
        </div>
    </>
  )
}

export default App
