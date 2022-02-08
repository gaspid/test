import React from 'react';
import { useState, useEffect,FC,ChangeEvent} from 'react';
import './App.css';
import Photos from './components/photos'
import fetchApi from './components/api'
import {Iphotos} from './types/types'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


 const App:FC =() =>{

const [photos,setPhotos]=useState<Iphotos[]>([]);
const [open, setOpen] = useState<boolean>(false);
const [mState,SetModal] = useState<string>('');
const [page, setPage] = useState<number>(1);
const [alb , setAlb] = useState<number>(0)
  

  
//================================================================================================================================




  useEffect(() =>{
        fetchPhotos(page,alb);
    },[page,alb])




    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };



//    =========================================================================================================================================
    async function fetchPhotos(page: number, alb:number){
        const response = await fetchApi.getApi(page,alb);
        setPhotos(response)
        console.log(response)
    }

    const removePhotos = (photo:Iphotos):void =>{
      setPhotos(photos.filter((p) => {
        return p.id !== photo.id
      }))
    }
// ===========================================================================================================================================
  const handleOpen = (photo:Iphotos):void => {
    SetModal(mState=>mState = photo.url)
    setOpen(true);
    
  }
    


  const handleClose = (open:boolean):void => setOpen(false);



  const handleClear = (event:ChangeEvent<HTMLInputElement>):void =>{
    setAlb(Number(event.target.value))
  }

//=====================================================================================================================================================

  return (
    <div className="App">
      <div className="input">
         <input type="number" value={alb} min="0" max="100"onChange={handleClear}/>
         <button className="clear" onClick={()=>setAlb(alb=>alb=0)}>clear</button>
         {alb}
      </div>
    
     <Photos Photos={photos} deletePhotos={removePhotos} handleOpen={handleOpen} handleClose={handleClose} open={open}/>
              <Modal
                    open={open}
                    onClose={()=>handleClose(open)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                   <Box sx={style}>
                     <img src={mState} alt='1' />
                 </Box> 
                </Modal>
          <div>
             <Pagination count={50} page={page} onChange={handleChange} />
          </div>
    </div>
  );
}

export default App;
