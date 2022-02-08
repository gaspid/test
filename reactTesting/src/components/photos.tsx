import React, { FC ,} from 'react';
import {Iphotos} from '../types/types';




interface IgetPhotos{
    Photos:Iphotos[];
    deletePhotos(photo:Iphotos):void
    handleOpen(photo:Iphotos):void
    handleClose(open:boolean):void
    open:boolean
}

const Photos:FC<IgetPhotos> = ({Photos ,deletePhotos,handleOpen,handleClose,open}) => {
    

    return (
        <div className="cardList">
         {Photos.map(photo =><div>
                <div className="Flex PhotosCard" key={photo.id} >
                    <div className="id">{photo.id}</div>
                        <button  onClick={()=>handleOpen(photo)}>Modal</button>
                        <div className="PhotoTittle">{photo.title}</div>
                        <img src={photo.thumbnailUrl} alt={photo.title} width="150px"/>
                        <button onClick={()=>deletePhotos(photo)}>Delete</button>
                </div>
            </div>
            )}
        </div>
    
    );
};

export default Photos;