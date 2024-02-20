import React, { useEffect } from "react";

import useUserData from "../../../../hooks/useUserData";

const ProjectForm: React.FC = () => {
  const userData = useUserData();

  

  return (
    <>
      <div className="project-form">
        <div className="form-box register-form">
          <h2>Project Creation Form</h2>
          <form>
            <div className="user-box">
              <input
                type="text"
                name="firstname"
                // value={formData.firstname}
                // onChange={handleChange}
                required
              />
              <label>Project Name</label>
            </div>
            <div className="user-box">
              <textarea name="" id="" placeholder="Project Description" rows={1}></textarea>
              <label>Project Description</label>
            </div>
            <div className="user-box">
              <input
                type="date"
                name="username"
                required
              />
            </div>
            <div className="user-box">
              <input
                type="text"
                placeholder="Location"
              />
              <label>Location</label>
            </div>
            {/* <div className="errorMessage">{ errMsg }</div> */}
            <button className="btn" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProjectForm;