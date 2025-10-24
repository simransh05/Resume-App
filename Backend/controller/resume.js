const Resume = require('../model/resume')

module.exports.getResume = async (req, res) => {
  const resumes = await Resume.find();
  res.json(resumes);
}

module.exports.getResumeByID = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  res.json(resume);
}

module.exports.postResume = async (req, res) => {
  const newResume = new Resume(req.body);
  const saved = await newResume.save();
  res.json(saved);
}

module.exports.putResumeByID = async (req, res) => {
  const updated = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
}

module.exports.deleteResumeByID = async (req, res) => {
  await Resume.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
}