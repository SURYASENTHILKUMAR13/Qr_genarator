import React, { useState } from 'react'


export const QrCode = () => {

    const [img,setImg] = useState("")
    const [loading,setLoading] = useState(false);
    const [qrData,setQrData] = useState('surya');
    const [qrSize,setQrSize] = useState('150')
    async function generateQR(){
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setLoading(true);
            setImg(url);
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    }
    function downloadQR(){
        fetch(img)
            .then((response)=>response.blob())
            .then((blob)=>{
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }

  return (
    <div className='app-container'>
        <h1>QR CODE GENERATOR</h1>
        <img src={img} alt="" className='qrimage'/>
        {loading && <p>Please wait...!</p>}
        <div>
            <label htmlFor="dataInput" className='input-label'>
                Data for QR code:
            </label>
            <input type="text" id='dataInput' placeholder='Enter data for QR code' value={qrData} onChange={(e)=>setQrData(e.target.value)}/>
            <label htmlFor="sizeInput" className='input-label'>
                Image size (e.g., 150):
            </label>
            <input type="text" placeholder='Enter image size' id="sizeInput" value={qrSize} onChange={(e)=>setQrSize(e.target.value)}/>
            <button className='generate-button' onClick={generateQR} disabled={loading}>Generate QR Code</button>
            <button className='download-button'onClick={downloadQR}>Download QR Code</button>
        </div>
        <p>Designed by Surya </p>
    </div>
  )
}
