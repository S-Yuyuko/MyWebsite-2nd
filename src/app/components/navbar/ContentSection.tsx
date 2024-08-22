'use client';

import React from 'react';
import { FaTrash, FaPlus, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import styles from './styles/ContentSection.module.css';
import { useContent } from '../../context/ContentContext';
import { useProjects } from '../../context/ProjectsContext';
import { useOther } from '../../context/OtherContext';

const ContentSection: React.FC = () => {
  const {
    activeSection,
    images,
    handleFileChange,
    handleUpload,
    handleDelete,
    selectedFiles,
    homeword,
    homeWords,
    showWelcomeForm,
    setShowWelcomeForm,
    handleAddWelcome,
    handleEdit,
    handleDeleteWord,
    handleInputChange,
    handleSelectClick,
  } = useContent();

  const {
    projects,
    project,
    showProjectForm,
    isEditing,
    handleSaveProject,
    initiateEditProject,
    removeProject,
    handleProjectInputChange,
    handleMediaFileChange,
    removeSelectedFile,
    setShowProjectForm,
    projectWords,
    projectWord,
    handleAddProjectWord,
    initiateEditProjectWord,
    removeProjectWord,
    handleProjectWordInputChange,
    handleSelectProjectWord,
    professionalExperiences, 
    professionalExperience, 
    showProfessionalForm, 
    handleSaveProfessionalExperience, 
    initiateEditProfessionalExperience, 
    removeProfessionalExperience, 
    handleProfessionalInputChange, 
    setShowProfessionalForm,
    removeProfessionalSelectedFile,
    handleProfessionalMediaFileChange,
  } = useProjects();

  const {
    aboutItems,
    aboutItem,
    handleAddAboutItem,
    initiateEditAboutItem,
    removeAboutItem,
    handleAboutInputChange,
    handleSelectAboutItem,
    showAboutForm,
    setShowAboutForm,
    moreItems,
    moreItem,
    handleAddMoreItem,
    initiateEditMoreItem,
    removeMoreItem,
    handleMoreInputChange,
    handleSelectMoreItem,
    showMoreForm,
    setShowMoreForm,
  } = useOther();
  

  const renderSelectedMediaFiles = (mediaFiles: string[] | undefined) => {
    if (!Array.isArray(mediaFiles) || mediaFiles.length === 0) return null;
  
    return (
      <div className={styles.selectedFiles}>
        <h3>Selected Media:</h3>
        <ul>
          {mediaFiles.map((file, index) => (
            <li key={index} className={styles.fileItem}>
              <img src={file} alt={`Media file ${index + 1}`} className={styles.mediaImage} />
              <FaTimes
                className={styles.closeIcon}
                onClick={(event) => removeSelectedFile(index, event)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderProfessionalMediaFiles = (mediaFiles: string[] | undefined) => {
    if (!Array.isArray(mediaFiles) || mediaFiles.length === 0) return null;
  
    return (
      <div className={styles.selectedFiles}>
        <h3>Selected Professional Media:</h3>
        <ul>
          {mediaFiles.map((file, index) => (
            <li key={index} className={styles.fileItem}>
              <img src={file} alt={`Professional media file ${index + 1}`} className={styles.mediaImage} />
              <FaTimes
                className={styles.closeIcon}
                onClick={(event) => removeProfessionalSelectedFile(index, event)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const renderSelectedFiles = () => {
    if (!selectedFiles) return null;

    const fileArray = Array.from(selectedFiles);

    return (
      <div className={styles.selectedFiles}>
        <h3>Selected Files:</h3>
        <ul>
          {fileArray.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  switch (activeSection) {
    case 'Home':
      return (
        <div className={`${styles.container} ${styles.centeredText}`}>
          <h2>Introduction to My Website</h2>
        </div>
      );
    case 'Pictures':
      return (
        <div className={`${styles.container} ${styles.pictureContainer}`}>
          <h2 className={styles.centeredText}>Our Picture Gallery</h2>
          <div className={styles.uploadContainer}>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className={styles.uploadInput}
              id="fileInput"
              style={{ display: 'none' }} // Hide the actual input
            />
            <label htmlFor="fileInput" className={styles.uploadButton}>
              <FaPlus /> Add Pictures
            </label>
            {selectedFiles && (
              <>
                {renderSelectedFiles()}
                <div className={styles.uploadActions}>
                  <button onClick={handleUpload} className={styles.uploadButton}>
                    <FaPlus /> Upload
                  </button>
                </div>
              </>
            )}
          </div>

          <table className={`${styles.table} ${styles.imageTable}`}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {images.map(image => (
                <tr key={image.imagename}>
                  <td><img src={`${baseURL}${image.path}`} alt={image.imagename} className={styles.image} /></td>
                  <td>
                    <button onClick={() => handleDelete(image.imagename)} className={styles.deleteButton}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'Home Words':
      return (
        <div className={`${styles.container} ${styles.wordsContainer}`}>
          <h2 className={styles.centeredText}>Words of Wisdom</h2>
          <button onClick={() => setShowWelcomeForm(!showWelcomeForm)} className={styles.addButton}>
            <FaPlus /> {showWelcomeForm ? 'Cancel' : 'Add Welcome'}
          </button>
          {showWelcomeForm && (
            <div className={styles.formContainer}>
              <label className={styles.formLabel}>
                Title:
                <input
                  type="text"
                  name="title"
                  value={homeword.title}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </label>
              <label className={styles.formLabel}>
                Description:
                <textarea
                  name="description"
                  value={homeword.description}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                />
              </label>
              <button onClick={handleAddWelcome} className={styles.submitButton}>
                Submit
              </button>
            </div>
          )}
          <table className={`${styles.table} ${styles.wordTable}`}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {homeWords.map((word) => (
                <tr key={word.id}>
                  <td>{word.title}</td>
                  <td>{word.description}</td>
                  <td>
                    <button 
                      className={styles.selectButton} 
                      onClick={() => handleSelectClick(word.id)}
                    >
                      {word.select === 'no' ? (
                        <>
                          <FaTimes /> Not Selected
                        </>
                      ) : (
                        <>
                          <FaCheck /> Selected
                        </>
                      )}
                    </button>
                    <button className={styles.editButton} onClick={() => handleEdit(word)}>
                      <FaEdit /> Edit
                    </button>
                    <button className={styles.deleteButton} onClick={() => handleDeleteWord(word.id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'Projects Experience':
      return (
        <div className={`${styles.container} ${styles.ExperienceContainer}`}>
          <h2 className={styles.centeredText}>Project Experiences</h2>
          <button onClick={() => setShowProjectForm(!showProjectForm)} className={styles.addButton}>
            <FaPlus /> {showProjectForm ? 'Cancel' : 'Add Project'}
          </button>
          {showProjectForm && (
            <div className={styles.formContainer}>
              <label className={styles.formLabel}>
                Project Title:
                <input
                  type="text"
                  name="title"
                  value={project.title}
                  onChange={handleProjectInputChange}
                  className={styles.formInput}
                />
              </label>
              <label className={styles.formLabel}>
                Skills:
                <input
                  type="text"
                  name="skills"
                  value={project.skills}
                  onChange={handleProjectInputChange}
                  className={styles.formInput}
                />
              </label>
              <label className={styles.formLabel}>
                Description:
                <textarea
                  name="description"
                  value={project.description}
                  onChange={handleProjectInputChange}
                  className={styles.formTextarea}
                />
              </label>
              <label className={styles.formLabel}>
                Media:
                <input
                  type="file"
                  multiple
                  onChange={handleMediaFileChange}
                  className={styles.uploadInput}
                  id="mediaInput"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className={styles.selectButton}
                  onClick={() => {
                    const mediaInput = document.getElementById('mediaInput');
                    if (mediaInput) {
                      mediaInput.click();
                    }
                  }}
                >
                  Select Files
                </button>
                {renderSelectedMediaFiles(project.mediaFiles)}
              </label>
              <button onClick={handleSaveProject} className={styles.submitButton}>
                {isEditing ? 'Update Project' : 'Submit'}
              </button>
            </div>
          )}
          <table className={`${styles.table} ${styles.projectsTable}`}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Skills</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.skills}</td>
                  <td>{p.description}</td>
                  <td>
                    <button onClick={() => initiateEditProject(p)} className={styles.editButton}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => removeProject(p.id)} className={styles.deleteButton}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'Professional Experience':
      return (
        <div className={`${styles.container} ${styles.ExperienceContainer}`}>
          <h2 className={styles.centeredText}>Professional Experiences</h2>
          <button onClick={() => setShowProfessionalForm(!showProfessionalForm)} className={styles.addButton}>
            <FaPlus /> {showProfessionalForm ? 'Cancel' : 'Add Experience'}
          </button>
          {showProfessionalForm && (
            <div className={styles.formContainer}>
              <label className={styles.formLabel}>
                Job Title:
                <input
                  type="text"
                  name="title"
                  value={professionalExperience.title}
                  onChange={handleProfessionalInputChange}
                  className={styles.formInput}
                />
              </label>
              <label className={styles.formLabel}>
                Company:
                <input
                  type="text"
                  name="company"
                  value={professionalExperience.company}
                  onChange={handleProfessionalInputChange}
                  className={styles.formInput}
                />
              </label>
              <label className={styles.formLabel}>
                Description:
                <textarea
                  name="description"
                  value={professionalExperience.description}
                  onChange={handleProfessionalInputChange}
                  className={styles.formTextarea}
                />
              </label>
              <label className={styles.formLabel}>
                Media:
                <input
                  type="file"
                  multiple
                  onChange={handleProfessionalMediaFileChange}
                  className={styles.uploadInput}
                  id="mediaInputProfessional"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className={styles.selectButton}
                  onClick={() => {
                    const mediaInput = document.getElementById('mediaInputProfessional');
                    if (mediaInput) {
                      mediaInput.click();
                    }
                  }}
                >
                  Select Files
                </button>
                {renderProfessionalMediaFiles(professionalExperience.mediaFiles)}
              </label>
              <button onClick={handleSaveProfessionalExperience} className={styles.submitButton}>
                {isEditing ? 'Update Experience' : 'Submit'}
              </button>
            </div>
          )}
          <table className={`${styles.table} ${styles.projectsTable}`}>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {professionalExperiences.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.title}</td>
                  <td>{exp.company}</td>
                  <td>{exp.description}</td>
                  <td>
                    <button onClick={() => initiateEditProfessionalExperience(exp)} className={styles.editButton}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => removeProfessionalExperience(exp.id)} className={styles.deleteButton}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'Project Words':
      return (
        <div className={`${styles.container} ${styles.wordsContainer}`}>
          <h2 className={styles.centeredText}>Project Words</h2>
          <button onClick={() => setShowProjectForm(!showProjectForm)} className={styles.addButton}>
            <FaPlus /> {showProjectForm ? 'Cancel' : 'Add Project Word'}
          </button>
          {showProjectForm && (
            <div className={styles.formContainer}>
              <label className={styles.formLabel}>
                Title:
                <input
                  type="text"
                  name="title"
                  value={projectWord.title}
                  onChange={handleProjectWordInputChange}
                  className={styles.formInput}
                />
              </label>
              <label className={styles.formLabel}>
                Description:
                <textarea
                  name="description"
                  value={projectWord.description}
                  onChange={handleProjectWordInputChange}
                  className={styles.formTextarea}
                />
              </label>
              <button onClick={handleAddProjectWord} className={styles.submitButton}>
                Submit
              </button>
            </div>
          )}
          <table className={`${styles.table} ${styles.wordTable}`}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectWords.map((word) => (
                <tr key={word.id}>
                  <td>{word.title}</td>
                  <td>{word.description}</td>
                  <td>
                    <button 
                      className={styles.selectButton} 
                      onClick={() => handleSelectProjectWord(word.id)}
                    >
                      {word.select === 'no' ? (
                        <>
                          <FaTimes /> Not Selected
                        </>
                      ) : (
                        <>
                          <FaCheck /> Selected
                        </>
                      )}
                    </button>
                    <button className={styles.editButton} onClick={() => initiateEditProjectWord(word)}>
                      <FaEdit /> Edit
                    </button>
                    <button className={styles.deleteButton} onClick={() => removeProjectWord(word.id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'About':
      return (
        <div className={`${styles.container} ${styles.aboutContainer}`}>
          <h2 className={styles.centeredText}>About Me</h2>
          <button onClick={() => setShowAboutForm(!showAboutForm)} className={styles.addButton}>
            <FaPlus /> {showAboutForm ? 'Cancel' : 'Add About Information'}
          </button>
          {showAboutForm && (
            <div className={styles.formContainer}>
              <label className={styles.formLabel}>
                Introduction:
                <textarea
                  name="introduction"
                  value={aboutItem.introduction}
                  onChange={handleAboutInputChange}
                  className={styles.formTextarea}
                />
              </label>
              <label className={styles.formLabel}>
                Skills:
                <textarea
                  name="skills"
                  value={aboutItem.skills}
                  onChange={handleAboutInputChange}
                  className={styles.formTextarea}
                />
              </label>
              <label className={styles.formLabel}>
                Education:
                <textarea
                  name="education"
                  value={aboutItem.education}
                  onChange={handleAboutInputChange}
                  className={styles.formTextarea}
                />
              </label>
              <button onClick={handleAddAboutItem} className={styles.submitButton}>
                Submit
              </button>
            </div>
          )}
          <table className={`${styles.table} ${styles.aboutTable}`}>
            <thead>
              <tr>
                <th>Introduction</th>
                <th>Skills</th>
                <th>Education</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboutItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.introduction}</td>
                  <td>{item.skills}</td>
                  <td>{item.education}</td>
                  <td>
                    <button 
                      className={styles.selectButton} 
                      onClick={() => handleSelectAboutItem(item.id)}
                    >
                      {item.select === 'no' ? (
                        <>
                          <FaTimes /> Not Selected
                        </>
                      ) : (
                        <>
                          <FaCheck /> Selected
                        </>
                      )}
                    </button>
                    <button className={styles.editButton} onClick={() => initiateEditAboutItem(item)}>
                      <FaEdit /> Edit
                    </button>
                    <button className={styles.deleteButton} onClick={() => removeAboutItem(item.id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'More':
      return (
        <div className={`${styles.container} ${styles.moreContainer}`}>
          <h2 className={styles.centeredText}>More Information</h2>
          <button onClick={() => setShowMoreForm(!showMoreForm)} className={styles.addButton}>
            <FaPlus /> {showMoreForm ? 'Cancel' : 'Add More Information'}
          </button>
          {showMoreForm && (
            <div className={styles.formContainer}>
              <label className={styles.formLabel}>
                Email:
                <input
                  type="email"
                  name="email"
                  value={moreItem.email}
                  onChange={handleMoreInputChange}
                  className={styles.formInput}
                />
              </label>
              <label className={styles.formLabel}>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={moreItem.phone}
                  onChange={handleMoreInputChange}
                  className={styles.formInput}
                />
              </label>
              <label className={styles.formLabel}>
                GitHub:
                <input
                  type="url"
                  name="github"
                  value={moreItem.github}
                  onChange={handleMoreInputChange}
                  className={styles.formInput}
                />
              </label>
              <label className={styles.formLabel}>
                LinkedIn:
                <input
                  type="url"
                  name="linkedin"
                  value={moreItem.linkedin}
                  onChange={handleMoreInputChange}
                  className={styles.formInput}
                />
              </label>
              <button onClick={handleAddMoreItem} className={styles.submitButton}>
                Submit
              </button>
            </div>
          )}
          <table className={`${styles.table} ${styles.moreTable}`}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Phone</th>
                <th>GitHub</th>
                <th>LinkedIn</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {moreItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.github}</td>
                  <td>{item.linkedin}</td>
                  <td>
                    <button 
                      className={styles.selectButton} 
                      onClick={() => handleSelectMoreItem(item.id)}
                    >
                      {item.select === 'no' ? (
                        <>
                          <FaTimes /> Not Selected
                        </>
                      ) : (
                        <>
                          <FaCheck /> Selected
                        </>
                      )}
                    </button>
                    <button className={styles.editButton} onClick={() => initiateEditMoreItem(item)}>
                      <FaEdit /> Edit
                    </button>
                    <button className={styles.deleteButton} onClick={() => removeMoreItem(item.id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
};

export default ContentSection;
