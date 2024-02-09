const Project = require("../models/Project");
const User = require("../models/User");
const nodemailer = require('nodemailer');

const sendNotificationEmail = async (email, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nurzanovazarina1@gmail.com',
        pass: 'rzdgcconjnlcedmb'
      }
    });

    const mailOptions = {
      from: 'nurzanovazarina1@gmail.com',
      to: email,
      subject: 'Project Notification',
      text: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, dueDate, location } = req.body;
    const createdBy = req.user.id; 

    const project = new Project({
      name,
      description,
      createdBy,
      dueDate,
      location,
      assignedUsers: []
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description, dueDate, location } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { name, description, dueDate, location },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.assignUserToProject = async (req, res) => {
  const { userId, projectId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const project = await Project.findById(projectId);
    if (!project) throw new Error("Project not found");

    if (project.assignedUsers.includes(userId)) throw new Error("User is already assigned to the project");

    project.assignedUsers.push(user._id);
    await project.save();

    if (!user.email) throw new Error("User email not found");

    await sendNotificationEmail(user.email, `You have been added to the project "${project.name}"`);

    res.status(200).send("User assigned to project successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.removeUserFromProject = async (req, res) => {
  const { userId, projectId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) throw new Error("Project not found");

    const index = project.assignedUsers.indexOf(userId);
    if (index === -1) throw new Error("User is not assigned to the project");

    project.assignedUsers.splice(index, 1);
    await project.save();

    
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    
    await sendNotificationEmail(user.email, `You have been removed from the project "${project.name}"`);

    res.status(200).send("User removed from project successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
