import mongoose from "mongoose"; 

const hackathonSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  college: String,
  branch: String,
  semester: String,
  email: String,  // Make sure email is included
  hackathonInstitute: String,
  startDate: String,
  endDate: String,
  hackathonCertificatePath: String, // Fixed case consistency
  status: { type: String, default: "Pending" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("HackathonSubmission", hackathonSchema);
