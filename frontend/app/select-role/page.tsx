"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types/auth";

const ROLE_OPTIONS: Array<{ value: Role; label: string; description: string }> = [
  {
    value: "user",
    label: "User",
    description: "Track meals, book experts, and use your dashboard.",
  },
  {
    value: "dietician",
    label: "Dietician",
    description: "Manage clients, appointments, and nutrition plans.",
  },
  {
    value: "kitchen",
    label: "Kitchen Staff",
    description: "Handle kitchen orders and fulfillment.",
  },
];

const getPostAuthRedirectPath = (role: Role) => {
  if (role === "admin") return "/dashboard/admin";
  return "/";
};

export default function SelectRolePage() {
  const router = useRouter();
  const { user, setAuthUser, refreshMe } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role>("user");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => !submitting && Boolean(selectedRole), [selectedRole, submitting]);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (!user.needsRoleSelection) {
      router.replace(getPostAuthRedirectPath(user.role));
    }
  }, [router, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const response = await api.post("/auth/select-role", { role: selectedRole });
      const nextUser = response.data?.user;

      if (!nextUser) {
        throw new Error("Failed to update role");
      }

      setAuthUser(nextUser);
      await refreshMe();
      toast.success("Role saved successfully ✅");
      router.replace(getPostAuthRedirectPath(nextUser.role));
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Unable to save role. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card-container" style={{ maxWidth: 560, padding: "2rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>Complete your profile</h1>
        <p style={{ marginBottom: "1.25rem", color: "#4b5563" }}>
          Choose your role to continue to your dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.25rem" }}>
            {ROLE_OPTIONS.map((option) => (
              <label
                key={option.value}
                style={{
                  border: selectedRole === option.value ? "2px solid #a4002c" : "1px solid #d1d5db",
                  borderRadius: 12,
                  padding: "0.9rem 1rem",
                  display: "block",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={selectedRole === option.value}
                  onChange={() => setSelectedRole(option.value)}
                  style={{ marginRight: "0.6rem" }}
                />
                <strong>{option.label}</strong>
                <p style={{ margin: "0.35rem 0 0", color: "#6b7280" }}>{option.description}</p>
              </label>
            ))}
          </div>

          <button type="submit" disabled={!canSubmit}>
            {submitting ? "Saving..." : "Submit and Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
