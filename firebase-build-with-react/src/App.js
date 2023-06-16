
import { useEffect, useState } from 'react';
import './App.css';
import Auth from './Auth';
import { collection, getDocs, addDoc, deleteDoc ,doc, updateDoc} from 'firebase/firestore';
import { db ,auth, storage} from './firebase-config';
import { ref ,uploadBytes  } from 'firebase/storage';


function App() {
  const [movies,setMovies] = useState(null)
  const [changeTitle,setChangeTitle] = useState("")
  const [changeDate,setChangeDate] = useState(0)
  const [isChecked,setIsChecked] = useState(false)
  const [updatedTitles, setUpdatedTitles] = useState({})
  const movieList = collection(db,"movies")
  // console.log(auth.currentUser.email)

  //file upload

  const [fileUpload, setFileUpload] = useState({})

  //Getting input from the db
  const getMoveList = async() =>{

    try{
     const data = await getDocs(movieList)
     const filteredData = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
     setMovies(filteredData)
    //  console.log(movies,"movies")
      }
    catch(err){
      console.error(err)
    }
  }
  //Adding inputs to the db
  const submitMovie = async (title)=>{
    setChangeTitle('')
    setChangeDate(0)
    setIsChecked(false)
    let isExit = movies.some(val=> val.title.trim() === title.trim())
    try{
      if(!isExit){
      const docs = await addDoc(movieList,{
        title:changeTitle,
        date:changeDate,
        receive:isChecked,
        userId:auth?.currentUser.uid
      })
      getMoveList()
      console.log(docs)
      }
    }
    catch(err){
      console.error(err)
    }
  }
  //Delete movie Title
  const deleteMovie= async (id)=>{

    const removeItem = doc(db,"movies",id)
    try {
        await deleteDoc(removeItem) 
        getMoveList()   
    } catch (error) {
      console.error(error)
    }
  }

  //Update Movie Title
  const updateMovieTitle = async (id)=>{
    if (updatedTitles[id]) { // Check if updatedTitles[id] exists before updating
      const movieDoc = doc(db,"movies",id)
      await updateDoc(movieDoc,{title: updatedTitles[id]})
      getMoveList()
    }
    else{
      alert("Please enter a new name for this item.")
    }
  }
  const updateCurrentTitle =(e, id)=>{
    setUpdatedTitles(prevTitles => ({...prevTitles, [id]: e.target.value}));
  }

  useEffect(() => {   
    getMoveList()
  },[])
const upLoadFile = async () =>{
  if(!fileUpload) return
  const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`)
  try {
    await uploadBytes(filesFolderRef,fileUpload)
  } catch (err) {
    console.error(err)
  }
}
  return (
    <div className="App">
      Welcome {auth?.currentUser?.email}
      <Auth/>
      <div>
        <input type="text" value={changeTitle} onChange={(e)=>setChangeTitle(e.target.value)}/>
        <input type="number" min={0} value={changeDate} onChange={(e)=>setChangeDate(Number(e.target.value))}/>
        <input type="checkbox" checked={isChecked} onChange={(e)=>setIsChecked(e.target.checked)}/>
        <button onClick={()=>submitMovie(changeTitle)}> Submit Movie</button>
      </div>
      {movies?.map((data,index)=>(
        <>
        <div key={index} >
          <h1 
          style={{color:data.receive? "green":"red"}}>{data.title}</h1>
          <p>Date{data.date}</p>
          <button onClick={()=> deleteMovie(data.id)}>Delete Movie</button>

          <input placeholder='new title...'value={updatedTitles[data.id] || ''} onChange={e => updateCurrentTitle(e, data.id)}/>   
          <button onClick={()=>updateMovieTitle(data.id)}>Update Title </button> 
          </div>

          <div>
            <input type="file" onChange={e=>setFileUpload(e.target.files[0])}/>
            <button onClick={upLoadFile}>Upload File</button>
          </div>
        </>
      ))}
    </div>
  );
}

export default App;
