import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DarkFormWrapper from "../Others/DarkFormWrapper";
import FormGroup from "../Others/FormGroup";
import FileUpload from "../Others/FileUpload";
import SubmitButton from "../Others/SubmitButton";
import "../styles/Forms.css";

function Internship() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    college: "",
    branch: "",
    semester: "",
    internshipInstitute: "",
    email: "",
    offerLetter: null,
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, offerLetter: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/submit-form",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(response.data.message || "Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <DarkFormWrapper title="Internship Application">
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

      <FormGroup label="Internship Institute">
        <input
          type="text"
          name="internshipInstitute"
          value={formData.internshipInstitute}
          onChange={handleChange}
          placeholder="Enter internship institute"
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
        id="offerLetter"
        name="offerLetter"
        onChange={handleFileChange}
        accept="application/pdf"
        label="Upload Offer Letter (PDF)"
      />

      <SubmitButton onClick={handleSubmit}>Submit Application</SubmitButton>
    </DarkFormWrapper>
  );
}

export default Internship;