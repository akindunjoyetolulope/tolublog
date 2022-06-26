import React, {useState} from "react";

const DataContext = React.createContext({
  addBlog: ()=>{},
  oneBlog: []
})

export const DataContextProvider = () => {
   const [oneBlog, setOneBlog] = useState([])
      
   const addBlog = (data) => {
        setOneBlog(data)
      }

      return (
        <DataContext.Provider
         value={{
             addBlog:addBlog,
             oneBlog:oneBlog
         }}
        >
            {props.children}
        </DataContext.Provider>
    )
}



export default DataContext;