import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DarkFormWrapper from "../Others/DarkFormWrapper";
import FormGroup from "../Others/FormGroup";
import FileUpload from "../Others/FileUpload";
import SubmitButton from "../Others/SubmitButton";
import "../styles/Forms.css";

function Hackathon() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    college: "",
    branch: "",
    semester: "",
    hackathonInstitute: "",
    email: "",
    hackathoncertificate: null,
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, hackathoncertificate: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/submit-hackathon",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(response.data.message || "Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <DarkFormWrapper title="Hackathon Application Form">
      <FormGroup label="Name">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name - At Most 14 Characters"
          required
        />
      </FormGroup>

      <FormGroup label="Roll Number">
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          placeholder="Roll.No - Capital Letters & Numbers Only"
          required
        />
      </FormGroup>

      <FormGroup label="College">
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          placeholder="Enter your college name"
          required
        />
      </FormGroup>

      <FormGroup label="Branch">
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          placeholder="Enter your branch"
          required
        />
      </FormGroup>

      <FormGroup label="Semester">
        <input
          type="text"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          placeholder="Enter your semester"
          required
        />
      </FormGroup>

      <FormGroup label="Hackathon Institute">
        <input
          type="text"
          name="hackathonInstitute"
          value={formData.hackathonInstitute}
          onChange={handleChange}
          placeholder="Enter hackathon institute"
          required
        />
      </FormGroup>

      <FormGroup label="Email">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </FormGroup>

      <div className="date-group">
        <FormGroup label="Start Date">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup label="End Date">
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </div>

      <FileUpload
        id="hackathoncertificate"
        name="hackathoncertificate"
        onChange={handleFileChange}
        accept="application/pdf"
        label="Upload Certificate (PDF)"
      />

      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </DarkFormWrapper>
  );
}

export default Hackathon;