import React from 'react'
import Cropper from "react-easy-crop";
import "./App.css"

const App = () => {
	const canvas = document.createElement("canvas")

	const canvasCtx = canvas.getContext("2d");

let activeImage, originalWidthToHeightRatio;
const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);

	const resize=(width,height)=>{
		canvas.width = Math.floor(width);
		canvas.height = Math.floor(height);

		// canvasCtx.drawImage(activeImage, (canvas.width-activeImage.width)/2, (canvas.height-activeImage.height)/2,Math.floor(width),Math.floor(height));
		
		canvasCtx.drawImage(activeImage, 0, 0, Math.floor(width),Math.floor(height));
		const imageUrl= canvas.toDataURL("image/jpeg",0.5);
		setImage(imageUrl)
	}


	const openImage=(imageSrc)=>{
		activeImage = new Image();
	
		activeImage.addEventListener("load", () => {
	originalWidthToHeightRatio = activeImage.width / activeImage.height;
	let imageWidth=activeImage.width;
      let imageHeight=activeImage.height;
	  console.log(imageWidth)
	
if(imageWidth<200){
const height=200/originalWidthToHeightRatio
if(height<200){

	resize(200,200)
	return
}


resize(200,height)
return

}
else if(imageHeight<200){

	const width=200*originalWidthToHeightRatio;


if(width<200){

	

resize(200,200)


}

	resize(width,200)
return;




}

else{
const width=200*originalWidthToHeightRatio

if(width<200){
	
	const height=200/originalWidthToHeightRatio
	console.log(height)
	resize(200,height)
	return;
}

resize(width,200)
return;

}



	
	

	 
			})
		activeImage.src = imageSrc;
	}
	


const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {

			console.log(event.target.files[0])
	  
				  const reader = new FileReader();
				  reader.readAsDataURL(event.target.files[0]);
				  reader.addEventListener("load", () => {
					  openImage(reader.result);
					  
				  });
	};
	}
	const onDownload = () => {
		// generateDownload(image, croppedArea);
	};


  return (
   <div className='container'>
			<div className='container-cropper'>
				 
					
					
							<Cropper
              style={{
              mediaStyle:{
maxHeight:"none",
maxWidth:"none",
position:"relative"

			  },
				containerStyle:{
					overflow:"visible"
				}
              }}
            //   cropSize={{width:'150px', height: '150px'}}
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={1/1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
								cropShape='round'
             
							/>
					

						
		
				
			</div>

			<div className='container-buttons'>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>
	
				<button onClick={triggerFileSelectPopup} >choose</button>
			
			</div>
		</div>
  )
}

export default App