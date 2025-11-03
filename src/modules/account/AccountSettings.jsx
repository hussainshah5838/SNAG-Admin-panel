import React, { useState } from "react";

export default function AccountSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    securityAlerts: true,
    marketingEmails: false,
    twoFactorAuth: false,
    sessionTimeout: 30,
    theme: "auto",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSettingChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // TODO: Implement settings update API call
    console.log("Settings updated:", settings);
    alert("Settings saved successfully!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // TODO: Implement password change API call
    console.log("Password change requested");
    alert("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="muted">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Notification Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">
            Notification Preferences
          </h2>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    handleSettingChange("emailNotifications", e.target.checked)
                  }
                  className="w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Push Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) =>
                    handleSettingChange("pushNotifications", e.target.checked)
                  }
                  className="w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Security Alerts</span>
                <input
                  type="checkbox"
                  checked={settings.securityAlerts}
                  onChange={(e) =>
                    handleSettingChange("securityAlerts", e.target.checked)
                  }
                  className="w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Marketing Emails</span>
                <input
                  type="checkbox"
                  checked={settings.marketingEmails}
                  onChange={(e) =>
                    handleSettingChange("marketingEmails", e.target.checked)
                  }
                  className="w-4 h-4"
                />
              </label>
            </div>

            <div className="pt-4">
              <button type="submit" className="btn">
                Save Notification Settings
              </button>
            </div>
          </form>
        </div>

        {/* Security Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="block font-medium">
                  Two-Factor Authentication
                </span>
                <span className="text-sm muted">
                  Add an extra layer of security to your account
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) =>
                  handleSettingChange("twoFactorAuth", e.target.checked)
                }
                className="w-4 h-4"
              />
            </label>

            <div>
              <label className="block font-medium mb-2">
                Session Timeout (minutes)
              </label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) =>
                  handleSettingChange(
                    "sessionTimeout",
                    parseInt(e.target.value)
                  )
                }
                className="input w-48"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={0}>Never</option>
              </select>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="input w-full"
                required
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="btn">
                Change Password
              </button>
            </div>
          </form>
        </div>

        {/* Appearance Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div>
            <label className="block font-medium mb-2">Theme Preference</label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange("theme", e.target.value)}
              className="input w-48"
            >
              <option value="auto">Auto (System)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <p className="text-sm muted mt-1">
              Choose your preferred color scheme
            </p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card p-6 border-red-200 dark:border-red-800">
          <h2 className="text-lg font-semibold mb-4 text-red-600">
            Danger Zone
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm muted mb-3">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
              <button className="btn-danger">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
