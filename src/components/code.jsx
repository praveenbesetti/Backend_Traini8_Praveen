import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Code() {
    const { generatedString } = useParams();
    const [code, setCode] = useState(generatedString);
    const [img, setimg] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(code);
        setimg(img => (true));
        
    }

    return (
        <div>
            <h1 className='text-4xl font-sans mt-10 font-semibold'> Registation Code</h1>
        <div className='flex  justify-center mt-10 items-center'>
           
            <div className='lg:w-2/4 w-full h-50 flex justify-center items-center bg-slate-200 rounded-lg shadow-md' style={{ height: '300px' }}>
                <div className='lg:w-2/5 w-full h-10 bg-white rounded-lg flex justify-start items-center'>
                    <h1 className='p-2 text-xl'>{generatedString}</h1>
                    <button onClick={copy} className='ml-20'>
                       <img src='/copy.png' className={`w-6 h-6 ${img ? 'opacity-10' : 'opacity-50'}`} alt='Copy' />

                    </button>
                </div>
            </div>
            </div>
            </div>
    );
}
