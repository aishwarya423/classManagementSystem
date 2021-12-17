const { Instructor } = require("../models/instructor");
const { Class } = require("../models/class");

exports.getClasses = async (req, res) => {
  const classes = await Class.find();
  return res
    .status(200)
    .json({ message: "These are all classes", response: classes });
};

exports.getMyClasses = async (req, res) => {
  let classes  = {}
  if(req.user.role=='student'){
    classes=  await Class.find().populate('classes').populate('classes.instructor', 'name')
  } else{
    classes = await Class.find({instructor:req.user._id});
  }
  return res
    .status(200)
    .json({ message: "These are all classes", response: classes });
};


exports.getClass = async (req, res) => {
  const classdetails = await Class.findOne({_id:req.params.id});
  if(req.user.role == 'student'){
   classdetails = await Class.findOne({_id:req.params.id},{studentsRegistered:0});
  }
  return res.status(200).json({ message: "Class", response: classdetails });
};


exports.registerClass = async (req, res) => {
  const classdetails = await Class.findOneAndUpdate({_id:req.params.id},{$push:{ studentsRegistered: req.user._id }});
  return res.status(200).json({ message: "Class registered Successfully", response: classdetails });
};
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
exports.editClass = async (req, res) => {
  let { title, description, category, _id, hours, startsAt, endsAt } = req.body;
  const classdetails = await Class.findOneAndUpdate(
    { _id: _id },
    { title, description, category, hours, startsAt, endsAt },
    { returnOriginal: false }
  );
  console.log(classdetails);
  return res
    .status(200)
    .json({ message: "Class details updated", response: classdetails });
};

exports.addClass = async (req, res) => {
  try {
    console.log(req.user,"userrrr")
    req.body.instructor = req.user._id;
    const data = ({
      title,
      description,
      category,
      hours,
      startsAt,
      endsAt,
      instructor,
    } = req.body);
    var x = await Class.create(data);
    var instruct = await Instructor.findOne({ _id: req.user._id });
    instruct.classes.push(x._id);
    instruct.save();
    console.log(x);
    return res
      .status(200)
      .json({ message: "Class scheduled successfully", response: data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Please try later" });
  }
};


exports.deleteClass = async (req, res) => {
  const cls = await Class.findOne({ _id: req.params.id });
  if (!cls) return res.status(404).send("class not found");
  if (cls._id == req.user._id) {
    return res.status(200).json({ message: "Class deleted", response: cls });
  } else {
    return res.status(409).send("Unauthorised access");
  }
};