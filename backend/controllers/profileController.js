

export const profileAccess = async (req, res) =>{

    try {
        res.status(200).json({respuesta: 'ok'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}