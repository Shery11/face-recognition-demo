const express = require('express');
const oxford = require('project-oxford'), client = new oxford.Client('0bd837cc949249bea74f91fd34a55d69');
let router = express.Router();

let Face = require('../models/face.js');

//get all the similar faces matched to the given faces
router.post('/find', (req, res) => {
		//using the project-oxford "detect()" to get a "face ID"
		client.face.detect({
	    url: req.body.link,
	    returnFaceId: true
		})
		.then(response => {
			/*sending the detected face id to the project-oxrord "similar()" */
			client.face.similar(response[0].faceId, {
				candidateFaceListId: req.body.faceList_id,
				maxCandidates: "10",
				mode:"matchFace"	
			}).then(response => {
				/*for finding the face with higest confidence*/
				console.log(response);
				let higest = response[0];
				for (var i = 1; i > 10; i++)
				{	
					if(response[i].confidence > higest.confidence)
						higest = response[i];
				}
				/*if the face confidence is greater then 0.6 then get that face data from mLab*/
				if(higest.confidence >= 0.4)
				{
					Face.getfaceByFaceId(higest.persistedFaceId, (err,Face) => {
					if(err){
						res.json({success:false, message:err});
					}
					res.json({success:true,message:Face});
					});
				}
				else{
					res.json({success:false, message:"Error: Confidence is less then 0.6%"});
				}
			}).catch(err =>{
			console.log("Error: " + err.message);});
		}) 
		.catch(err =>{
			console.log("Error: " + err.message);});

});

/*add a face to the face list in "Cognitive Services" and "mLab"*/
router.post('/',(req,res) => { 
    //Send data to congitive API 
    let c = client.face;
	let f = c.faceList;
	f.addFace(req.body.facelist_id,{
	url:req.body.link,
	userData: req.body.name
	})
	.then((response)=>{/*Handle PersistantId into Data if no error found*/
		let data = {
			face_id:response.persistedFaceId,
			face_list_id:req.body.facelist_id,
			name:req.body.name,
			imgUrl: req.body.imgUrl
		}
		console.log(data.face_id);				
		console.log("face added" + data.name + " in list " + data.face_list_id );

		/*save data to mLab*/		
		Face.addFace(data, (err, data) => {
			if(err){
				res.send(err);
			}		
			console.log('face added in the face list');
			res.json(data);
		});
	}).catch((err)=>{
		res.send("Error: " + err.message);});
});
router.get('/', (req,res) => {
	Face.getFaces((err, faces) =>{
		if(err)
		{
			res.send("Error: " + err.message);
		}
		res.json(faces);
	});
});
/*delete a face from the mLab and Microsoft Face Api*/
router.delete('/:id',(req,res) => {
	let id = req.params.id;
	/*to get the "presistant_face_id" so that it can be used to delete face from "microsoft face API"*/
	Face.getFaceById(id, (err,face) => {
		if(err)
		{
			res.send("Error: " + err.message);
		}
		else
		{ 
		    let c = client.face;
			let f = c.faceList;
			/*deleting the face from the "microsoft face API"*/
			f.deleteFace(face.face_list_id,face.face_id)
			.then(response =>{
				/*Deleting the face from "mLab"*/
				Face.removeFace(id, (err,face) => {
				if(err){
					res.send("Error: " + err.message);
				}
				res.json(face);
				});
			}).catch(err => {
				res.send("Error: " + err.message);				
			});
		}
	});
});


module.exports = router;