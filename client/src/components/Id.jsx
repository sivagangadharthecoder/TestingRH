import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DarkFormWrapper from "../Others/DarkFormWrapper";
import FormGroup from "../Others/FormGroup";
import FileUpload from "../Others/FileUpload";
import SubmitButton from "../Others/SubmitButton";
import "../styles/Forms.css";
import "../styles/Id.css";

function Id() {
  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    year: "",
    department: "",
    residence: "",
    college: "",
    phone: "",
    email: "",
    transport: "",
    requestDate: new Date().toISOString().split("T")[0],
    reason: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [pdfPath, setPdfPath] = useState("");

  const transportOptions = ["College Bus", "College Hostel", "Outside"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "rollNumber") {
      newValue = value.toUpperCase();
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/id-card", formData);
      setSubmitted(true);
      setPdfPath(response.data.pdfPath.split('/').pop());
      toast.success("ID request submitted successfully!");
    } catch (err) {
      toast.error("Submission failed.");
    }
  };

  return (
    <DarkFormWrapper title="ID Request Form">
      {Object.keys(formData).map((field, i) => {
        if (field === "reason") {
          return (
            <FormGroup key={i} label="Reason for Applying ID Card">
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </FormGroup>
          );
        } else if (field === "transport") {
          return (
            <FormGroup key={i} label="Transport">
              <select
                name="transport"
                value={formData.transport}
                onChange={handleChange}
                required
              >
                <option value="">Select Transport Option</option>
                {transportOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </FormGroup>
          );
        } else if (field !== "requestDate") {
          return (
            <FormGroup
              key={i}
              label={
                field === "studentName"
                  ? "Student name (at most 14 characters)"
                  : field === "rollNumber"
                    ? "RO.NO (CAPITALS ONLY)"
                    : field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
              }
            >
              <input
                type="text"
                name={field}
                value={formData[field]}
                maxLength={field === "studentName" ? 14 : undefined}
                onChange={handleChange}
                required
              />
            </FormGroup>
          );
        }
        return null;
      })}

      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>

      {submitted && pdfPath && (
        <div className="letter-preview">
          <h3>Generated ID Request Letter</h3>
          <p>
            Download your ID request form here:{" "}
            <a href={`http://localhost:5000/Idpdfs/${pdfPath}`} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </p>
          <p>An email confirmation has been sent to your registered email address.</p>
        </div>
      )}
    </DarkFormWrapper>
  );
}

export default Id;
