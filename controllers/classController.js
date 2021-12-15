const { Class } = require('../models/class')

exports.getClasses = async (req, res) =>{
   const classes = await Class.find();
   return res.status(200).json({message:"These are all classes",response: classes}) 
}
exports.getClass = async (req, res) =>{
    const classdetails = await Class.findById(req.params.id);
   return res.status(200).json({message:"Class",response: classdetails}) 
}
// collection.update({ "code": req.body.code },{$set:  req.body.updatedFields}, function(err, results) {
//    res.send({error: err, affected: results});
//    db.close();
// });
//
// function findAndUpdateMany(filter, updateOptions) {
//    return collection.find(filter).project({_id: 1}).toArray()
//      .then(function(matchingIds) {
//        filter = {_id: {$in: matchingIds}}
//        return collection.updateMany(filter, updateOptions)
//      }).then(function() {
//        return collection.find(filter).toArray()
//      })
//  }
exports.editClass = async (req, res) =>{
  let  { title, description, category,_id, hours, startsAt, endsAt} = req.body
    const classdetails = await Class.findOneAndUpdate({_id:_id},{ title, description, category, hours, startsAt, endsAt},{  returnOriginal: false });
  
    console.log(classdetails)
    return res.status(200).json({message:"Class details updated",response: classdetails}) 
 }

exports.addClass = async(req, res) =>{
   console.log(req.body,req.user,"in addclass")
   req.body.instructor = req.user.id
   const data = {
    title,
    description,
    category,
    hours, 
    startsAt,
    endsAt,
    instructor
   } = req.body
 var x =   await Class.create(data);
 console.log(x)
   return res.status(200).json({message:"Class scheduled successfully",response: data}) 
}
exports.deleteClass = async (req, res) => {
   const cls = await Class.findOne({_id:req.params.id});
   if(!cls) return res.status(404).send('class not found');
   if(cls._id == req.user.id){
      return res.status(200).json({message:"Class deleted",response: cls}) 
   } else{
      return res.status(200).send('Unauthorised access')
   }
 }
