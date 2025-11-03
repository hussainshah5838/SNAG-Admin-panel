import React, { useState } from "react";
import { getCurrentUser } from "../../auth/api/auth.service";

export default function Profile() {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    name: user?.name || "Admin User",
    email: user?.email || "admin@snag.app",
    role: user?.role || "Administrator",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update API call
    console.log("Profile updated:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
        <p className="muted text-sm sm:text-base">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/120"
              alt="Profile Avatar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border"
              style={{ borderColor: "var(--line)" }}
            />
            <button className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-600 text-white text-xs flex items-center justify-center">
              ✎
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="font-semibold text-lg">{formData.name}</h2>
            <p className="muted">{formData.email}</p>
            <p className="text-sm muted">{formData.role}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input w-full"
                disabled
                style={{ opacity: 0.6 }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="input w-full resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
            <button type="submit" className="btn">
              Save Changes
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() =>
                setFormData({
                  name: user?.name || "Admin User",
                  email: user?.email || "admin@snag.app",
                  role: user?.role || "Administrator",
                  phone: user?.phone || "",
                  bio: user?.bio || "",
                })
              }
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
