import { useState, useEffect } from "react";

const SettingsPage = () => {
  // State Management
  const [username, setUsername] = useState(localStorage.getItem("username") || "User123");
  const [email, setEmail] = useState(localStorage.getItem("email") || "hello@gmail.com");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Account Information (Static for Display)
  const accountInfo = {
    memberSince: "2025-04-06",
    status: "Active",
  };

  // Handle Username Save
  const handleSaveUsername = () => {
    localStorage.setItem("username", username);
    setIsEditingUsername(false);
  };

  // Handle Email Save
  const handleSaveEmail = () => {
    localStorage.setItem("email", email);
    setIsEditingEmail(false);
  };

  // Apply Theme Based on Local Storage
  useEffect(() => {
    document.documentElement.className = localStorage.getItem("theme") || "light";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Username Edit Feature */}
      <div className="flex items-center gap-4 mb-6">
        {isEditingUsername ? (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 border rounded dark:bg-gray-800"
          />
        ) : (
          <span className="text-xl font-medium">{username}</span>
        )}
        <button
          onClick={isEditingUsername ? handleSaveUsername : () => setIsEditingUsername(true)}
          className="px-4 py-2 rounded bg-blue-500 dark:bg-yellow-500 text-white dark:text-black"
        >
          {isEditingUsername ? "Save" : "Edit Username"}
        </button>
      </div>

      {/* Email Update Feature */}
      <div className="flex items-center gap-4 mb-6">
        {isEditingEmail ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border rounded dark:bg-gray-800"
          />
        ) : (
          <span className="text-xl font-medium">{email}</span>
        )}
        <button
          onClick={isEditingEmail ? handleSaveEmail : () => setIsEditingEmail(true)}
          className="px-4 py-2 rounded bg-green-500 dark:bg-yellow-500 text-white dark:text-black"
        >
          {isEditingEmail ? "Save" : "Edit Email"}
        </button>
      </div>

      {/* Account Info Display */}
      <div className="border p-4 rounded bg-white dark:bg-gray-800">
        <p><strong>Member Since:</strong> {accountInfo.memberSince}</p>
        <p><strong>Account Status:</strong> {accountInfo.status}</p>
      </div>
    </div>
  );
};

export default SettingsPage;
