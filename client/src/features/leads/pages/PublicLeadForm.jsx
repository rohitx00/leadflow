import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitPublicLead } from '../api/lead.api.js';
import { Link } from 'react-router-dom';

const leadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().min(1, 'Phone number is required'),
  message: z.string().optional(),
});

const PublicLeadForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(leadSchema)
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      await submitPublicLead(data);
      setIsSuccess(true);
      reset();
    } catch (err) {
      setError(err.error?.message || err.message || 'Something went wrong. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border-t-4 border-green-500">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your information has been received. Our sales team will get back to you shortly.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-blue-600 font-medium hover:text-blue-800 transition"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-6">
        <Link to="/login" className="text-gray-500 hover:text-gray-800 text-sm font-medium transition">
          Member Login
        </Link>
      </div>


      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full border-t-4 border-blue-600">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lead Capture Form</h2>
        <p className="text-gray-600 mb-6">
          Fill out the form below and we'll be in touch.
        </p>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                {...register('firstName')}
                className={`w-full rounded-md shadow-sm border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                {...register('lastName')}
                className={`w-full rounded-md shadow-sm border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Email *</label>
            <input
              type="email"
              {...register('email')}
              className={`w-full rounded-md shadow-sm border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              {...register('company')}
              className="w-full rounded-md shadow-sm border p-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              {...register('phone')}
              className={`w-full rounded-md shadow-sm border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              {...register('message')}
              className="w-full rounded-md shadow-sm border p-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              rows={4}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublicLeadForm;
