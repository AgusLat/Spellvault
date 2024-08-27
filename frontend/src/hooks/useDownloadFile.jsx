import React, {useState} from 'react'

export const useDownloadFile = () => {


    const[ downloadLoading, setDownloadLoading] = useState(false)
    const[ downloadError, setDownloadError] = useState(null)

    const downloadFile = async ( fileName, token ) =>{

        setDownloadLoading(true)
        setDownloadError(null)
        //http://localhost:4000/api/profile/download/spellCreator-theHomebrewery.pdf
        const response = await fetch(`https://spellvault-api.onrender.com/api/profile/download/${fileName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const blob = await response.blob()

        if(!response.ok){
            setDownloadError(json.error)
            setDownloadLoading(false)
        }

        if(response.ok){

            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
      
            // URL OBJECT CLEANUP
            window.URL.revokeObjectURL(url)

            setDownloadError(null)
            setDownloadLoading(false)
        }
    }

  return {downloadFile, downloadLoading, downloadError}
}
