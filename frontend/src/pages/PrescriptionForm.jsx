import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { prescriptionService } from '../services/prescriptionService';
import {
  validateRequired,
  validateAge,
  validatePrescriptionDate,
  formatDate,
} from '../utils/validation';

const PrescriptionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    prescriptionDate: formatDate(new Date()),
    patientName: '',
    patientAge: '',
    patientGender: '',
    diagnosis: '',
    medicines: '',
    nextVisitDate: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchPrescription();
    }
  }, [id]);

  const fetchPrescription = async () => {
    try {
      setFetchLoading(true);
      const data = await prescriptionService.getById(id);
      setFormData({
        prescriptionDate: data.prescriptionDate,
        patientName: data.patientName,
        patientAge: data.patientAge.toString(),
        patientGender: data.patientGender,
        diagnosis: data.diagnosis || '',
        medicines: data.medicines || '',
        nextVisitDate: data.nextVisitDate || '',
      });
    } catch (error) {
      console.error('Error fetching prescription:', error);
      alert('Failed to fetch prescription details');
      navigate('/prescriptions');
    } finally {
      setFetchLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Prescription Date validation
    if (!validateRequired(formData.prescriptionDate)) {
      newErrors.prescriptionDate = 'Prescription date is required';
    } else if (!validatePrescriptionDate(formData.prescriptionDate)) {
      newErrors.prescriptionDate = 'Prescription date cannot be in the future';
    }

    // Patient Name validation
    if (!validateRequired(formData.patientName)) {
      newErrors.patientName = 'Patient name is required';
    } else if (formData.patientName.trim().length < 2) {
      newErrors.patientName = 'Patient name must be at least 2 characters';
    } else if (formData.patientName.length > 100) {
      newErrors.patientName = 'Patient name must not exceed 100 characters';
    }

    // Patient Age validation
    if (!validateRequired(formData.patientAge)) {
      newErrors.patientAge = 'Patient age is required';
    } else if (!validateAge(formData.patientAge)) {
      newErrors.patientAge = 'Patient age must be between 0 and 150';
    }

    // Patient Gender validation
    if (!validateRequired(formData.patientGender)) {
      newErrors.patientGender = 'Patient gender is required';
    }

    // Diagnosis validation (optional but with max length)
    if (formData.diagnosis && formData.diagnosis.length > 2000) {
      newErrors.diagnosis = 'Diagnosis must not exceed 2000 characters';
    }

    // Medicines validation (optional but with max length)
    if (formData.medicines && formData.medicines.length > 2000) {
      newErrors.medicines = 'Medicines must not exceed 2000 characters';
    }

    // Next Visit Date validation (optional but must be valid date if provided)
    if (formData.nextVisitDate) {
      const nextVisit = new Date(formData.nextVisitDate);
      const prescriptionDate = new Date(formData.prescriptionDate);
      if (nextVisit < prescriptionDate) {
        newErrors.nextVisitDate = 'Next visit date cannot be before prescription date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        patientAge: parseInt(formData.patientAge),
        nextVisitDate: formData.nextVisitDate || null,
      };

      if (isEditMode) {
        await prescriptionService.update(id, submitData);
        alert('Prescription updated successfully!');
      } else {
        await prescriptionService.create(submitData);
        alert('Prescription created successfully!');
      }
      navigate('/prescriptions');
    } catch (error) {
      console.error('Error saving prescription:', error);
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.errors?.join(', ') ||
        'Failed to save prescription. Please check your input.';


      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/prescriptions')}
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
          >
            ← Back to Prescriptions
          </button>
        </div>

        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isEditMode ? 'Edit Prescription' : 'New Prescription'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prescription Date */}
            <div>
              <label htmlFor="prescriptionDate" className="block text-sm font-medium text-gray-700">
                Prescription Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="prescriptionDate"
                name="prescriptionDate"
                value={formData.prescriptionDate}
                onChange={handleChange}
                max={formatDate(new Date())}
                className={`mt-1 input-field ${errors.prescriptionDate ? 'border-red-500' : ''}`}
              />
              {errors.prescriptionDate && (
                <p className="error-text">{errors.prescriptionDate}</p>
              )}
            </div>

            {/* Patient Information Section */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Name */}
                <div className="md:col-span-2">
                  <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient's full name"
                    maxLength={100}
                    className={`mt-1 input-field ${errors.patientName ? 'border-red-500' : ''}`}
                  />
                  {errors.patientName && (
                    <p className="error-text">{errors.patientName}</p>
                  )}
                </div>

                {/* Patient Age */}
                <div>
                  <label htmlFor="patientAge" className="block text-sm font-medium text-gray-700">
                    Patient Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="patientAge"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleChange}
                    placeholder="Enter age"
                    min="0"
                    max="150"
                    className={`mt-1 input-field ${errors.patientAge ? 'border-red-500' : ''}`}
                  />
                  {errors.patientAge && (
                    <p className="error-text">{errors.patientAge}</p>
                  )}
                </div>

                {/* Patient Gender */}
                <div>
                  <label htmlFor="patientGender" className="block text-sm font-medium text-gray-700">
                    Patient Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="patientGender"
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleChange}
                    className={`mt-1 input-field ${errors.patientGender ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {errors.patientGender && (
                    <p className="error-text">{errors.patientGender}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h2>

              {/* Diagnosis */}
              <div className="mb-6">
                <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
                  Diagnosis
                </label>
                <textarea
                  id="diagnosis"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter diagnosis details..."
                  maxLength={2000}
                  className={`mt-1 input-field ${errors.diagnosis ? 'border-red-500' : ''}`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.diagnosis ? (
                    <p className="error-text">{errors.diagnosis}</p>
                  ) : (
                    <p className="text-xs text-gray-500">Optional</p>
                  )}
                  <p className="text-xs text-gray-500">{formData.diagnosis.length}/2000</p>
                </div>
              </div>

              {/* Medicines */}
              <div>
                <label htmlFor="medicines" className="block text-sm font-medium text-gray-700">
                  Medicines
                </label>
                <textarea
                  id="medicines"
                  name="medicines"
                  value={formData.medicines}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter prescribed medicines..."
                  maxLength={2000}
                  className={`mt-1 input-field ${errors.medicines ? 'border-red-500' : ''}`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.medicines ? (
                    <p className="error-text">{errors.medicines}</p>
                  ) : (
                    <p className="text-xs text-gray-500">Optional</p>
                  )}
                  <p className="text-xs text-gray-500">{formData.medicines.length}/2000</p>
                </div>
              </div>
            </div>

            {/* Next Visit Date */}
            <div className="border-t pt-6">
              <label htmlFor="nextVisitDate" className="block text-sm font-medium text-gray-700">
                Next Visit Date
              </label>
              <input
                type="date"
                id="nextVisitDate"
                name="nextVisitDate"
                value={formData.nextVisitDate}
                onChange={handleChange}
                min={formData.prescriptionDate}
                className={`mt-1 input-field ${errors.nextVisitDate ? 'border-red-500' : ''}`}
              />
              {errors.nextVisitDate ? (
                <p className="error-text">{errors.nextVisitDate}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Optional</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/prescriptions')}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    {isEditMode ? '💾 Update Prescription' : '✅ Create Prescription'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PrescriptionForm;