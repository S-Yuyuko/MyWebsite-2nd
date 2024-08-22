'use client';

import React, { useEffect, useState } from 'react';
import styles from './styles/AdminInfoDialog.module.css';
import { fetchAllAdmins, addAdmin, deleteAdmin, editAdmin, Admin } from '../../../utils/api';
import { FaMinus, FaTimes } from 'react-icons/fa';

interface AdminInfoDialogProps {
  onClose: () => void;
}

const AdminInfoDialog: React.FC<AdminInfoDialogProps> = ({ onClose }) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formState, setFormState] = useState<Admin>({ username: '', password: '' });
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllAdmins();
        setAdmins(data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (admin: Admin) => {
    setFormState(admin);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const handleDelete = async (username: string) => {
    try {
      await deleteAdmin(username);
      setAdmins((prev) => prev.filter((admin) => admin.username !== username));
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await editAdmin(formState);
        setAdmins((prev) =>
          prev.map((admin) =>
            admin.username === formState.username ? formState : admin
          )
        );
      } else {
        await addAdmin(formState);
        setAdmins((prev) => [...prev, formState]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving admin:', error);
    }
  };

  const resetForm = () => {
    setFormState({ username: '', password: '' });
    setShowAddForm(false);
    setIsEditing(false);
  };

  return (
    <div className={styles.dialogOverlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.dialogHeader}>
          <h2>Admin Information</h2>
          <FaTimes className={styles.closeIcon} onClick={onClose} />
        </div>
        <div className={styles.dialogContent}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <>
              <button
                className={styles.addButton}
                onClick={() => {
                  setShowAddForm((prev) => !prev);
                  resetForm();
                }}
              >
                {showAddForm ? 'Cancel' : 'Add Admin'}
              </button>
              {showAddForm && (
                <form className={styles.addAdminForm} onSubmit={handleSubmit}>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formState.username}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                      disabled={isEditing} // Disable username field when editing
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formState.password}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                    />
                  </div>
                  <button type="submit" className={styles.button}>
                    {isEditing ? 'Save Changes' : 'Add Admin'}
                  </button>
                </form>
              )}
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.username}>
                      <td>{admin.username}</td>
                      <td>{admin.password}</td>
                      <td>
                        {admin.username === 'wz1305290174' ? (
                          <div className={styles.disabledActions}>
                            <FaMinus />
                          </div>
                        ) : (
                          <>
                            <button
                              className={styles.editButton}
                              onClick={() => handleEdit(admin)}
                            >
                              Edit
                            </button>
                            <button
                              className={styles.deleteButton}
                              onClick={() => handleDelete(admin.username)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInfoDialog;
