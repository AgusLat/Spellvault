import parse from 'html-react-parser'


export const useParseString = (string)=>{

    const parseString = (string)=>{
        if(!string){
          return null
        }
        const html = parse(string)
    
        return html
      }


    return [parseString]
}