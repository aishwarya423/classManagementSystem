const { Class } = require('../models/class')

exports.getClasses = async (req, res) =>{
   const classes = await Class.find();
   return res.status(200).json({message:"These are all classes",response: classes}) 
}
exports.getClass = async (req, res) =>{
    const classdetails = await Class.findById(req.params.id);
   return res.status(200).json({message:"Class",response: classdetails}) 
}

exports.editClass = async (req, res) =>{
    const classdetails = await Class.findById(req.params.id);
    //update code
    Class.save()
    return res.status(200).json({message:"Class",response: classdetails}) 
 }

exports.addClass = async(req, res) =>{
   console.log(req.body)
const data = {
    title,
    description,
    category,
    hours, 
    startsAt,
    endsAt,
   //  instructor
   } = req.body
 var x =   await Class.create(data);
 console.log(x)
   return res.status(200).json({message:"Class scheduled successfully",response: data}) 
}
exports.deleteClass = async (req, res) => {
   const cls = await Class.findByIdAndRemove(req.params.id);
     if(!cls) return res.status(404).send('Genre not found');
     return res.status(200).json({message:"Class deleted",response: data}) 
 }
