const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 1. Import mongoose database driver

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Crucial: Allows the server to read json data sent from your frontend form

// 2. Connect to Local MongoDB Community Server
// It automatically creates a database called 'careerExplorerDB' if it doesn't exist
mongoose.connect('mongodb://127.0.0.1:27017/careerExplorerDB')
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// 3. Create a Structure (Schema) and Model for saving your User Data
const userSchema = new mongoose.Schema({
    name: String,
    qualification: String,
    email: String,
    interest: String,
    dateSubmitted: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Static Skills Dictionary Database
const skillDatabase = {
    "software developer": ["JavaScript/Python", "Data Structures", "Git Version Control", "Problem Solving"],
    "web developer": ["HTML/CSS", "JavaScript", "Responsive Design", "UI/UX Basics"],
    "data analyst": ["Python/R", "SQL Databases", "Data Visualization (Tableau)", "Statistics"],
    "cyber security analyst": ["Network Security", "Ethical Hacking", "Linux Systems", "Risk Assessment"],
    "marketing manager": ["Digital Marketing", "SEO/SEM", "Content Strategy", "Market Analytics"],
    "hr manager": ["Communication", "Conflict Resolution", "Talent Acquisition", "Labor Laws"],
    "accountant": ["Financial Auditing", "Excel Mastery", "Tax Regulations", "Bookkeeping"],
    "business analyst": ["Requirements Gathering", "Agile/Scrum", "Process Modeling", "Data Analysis"],
    "nurse": ["Patient Care", "Medical Ethics", "Critical Thinking", "Emergency Response"],
    "pharmacist": ["Pharmacology", "Prescription Analysis", "Customer Counseling", "Inventory Management"],
    "medical lab technician": ["Sample Analysis", "Lab Equipment Operations", "Biohazard Safety", "Data Logging"],
    "physiotherapist": ["Anatomy/Physiology", "Rehabilitation Exercise", "Patient Assessment", "Empathy"],
    "graphic designer": ["Adobe Photoshop/Illustrator", "Typography", "Branding", "Creativity"],
    "content writer": ["Copywriting", "SEO Optimization", "Editing", "Research Skills"],
    "teacher": ["Lesson Planning", "Classroom Management", "Public Speaking", "Patience"],
    "animator": ["3D Modeling (Blender/Maya)", "Storyboarding", "Keyframe Animation", "Visual Effects"]
};

// 4. NEW API ENDPOINT: Save form data to MongoDB
app.post('/api/users', async (req, res) => {
    try {
        const { name, qualification, email, interest } = req.body;
        
        // Take form values and wrap them in our Mongoose User model
        const newUser = new User({ name, qualification, email, interest });
        
        // Save it permanently to MongoDB
        await newUser.save();
        
        res.status(201).json({ message: "User data stored in MongoDB successfully!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to store user data." });
    }
});

// Skills Endpoint
app.get('/api/skills/:career', (req, res) => {
    const careerKey = req.params.career.toLowerCase().trim();
    const skills = skillDatabase[careerKey];

    if (skills) {
        res.json({ career: req.params.career, skills: skills });
    } else {
        res.status(404).json({ error: "Career not found in database." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});