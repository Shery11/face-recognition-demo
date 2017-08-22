const mongoose = require('mongoose');

const faceSchema = mongoose.Schema({
face_id:{
	type:String,
	required:true
},
face_list_id:{
	type:String,
	required:true
},
name:{
	type:String,
	required:true
},
imgUrl :{
   type:String,
   required:true
}
});


let Face = module.exports = mongoose.model('Face',faceSchema);

module.exports.getFaces = (callback,limit) => {
	Face.find(callback).limit(limit);
}

module.exports.getFaceById = (id,callback) => {
	Face.findById(id,callback);
}

module.exports.addFace = (face,callback) => {
	let add = {
		face_id:face.face_id,
		face_list_id:face.face_list_id,
		name:face.name,
		imgUrl: face.imgUrl
	}
	Face.create(add,callback);
}
module.exports.updateFace = (id, face, option, callback) =>{
	let query ={_id:id};
	let update = {
		face_id:face.face_id,
		face_list_id:face.face_list_id,
		name:face.name
	}
	Face.findOneAndUpdate(query, update, option, callback);
}
module.exports.removeFace = (id,callback) => {
	let query = {_id:id};
	Face.remove(query,callback);
}
module.exports.getfaceByFaceId = (id,callback) => {
	let query = {face_id:id};
	Face.findOne(query,callback);
}