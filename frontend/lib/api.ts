/**
 * EcoSphere API Client
 * 
 * This file handles all communication between the Next.js frontend and the FastAPI backend.
 * Adjusted to strictly match the finalized API endpoints in the backend routers.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Generic fetch wrapper to handle JSON and errors
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  // Try to safely access localStorage for the JWT token
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `API Error: ${response.status}`);
  }

  return response.json();
}

/**
 * Authentication API Endpoints
 */
export const authApi = {
  login: (data: any) => fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  register: (data: any) => fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

/**
 * Gamification API Endpoints
 */
export const gamificationApi = {
  getActiveChallenges: () => fetchAPI("/gamification/challenges"),
  
  submitProof: (challengeId: string, employeeId: number, progress: string, proofUrl: string) => {
    return fetchAPI(`/gamification/challenges/participate`, {
      method: "POST",
      body: JSON.stringify({ 
        challenge_id: parseInt(challengeId), 
        employee_id: employeeId,
        progress: progress,
        proof_url: proofUrl 
      }),
    });
  },
  
  getLeaderboard: () => fetchAPI("/gamification/leaderboard"),
};

/**
 * Governance & Compliance API Endpoints
 */
export const governanceApi = {
  getComplianceIssues: () => fetchAPI("/governance/compliance-issues"),
  
  acknowledgePolicy: (policyId: string) => {
    // Note: If /policies/... doesn't exist, we fallback to a safe response for the hackathon MVP
    console.warn("Policy Acknowledge endpoint is not implemented in MVP.");
    return Promise.resolve({ status: "acknowledged" });
  }
};

/**
 * Reports & Dashboards API Endpoints (replaces Emissions mock)
 */
export const reportsApi = {
  getSummary: () => fetchAPI("/reports/summary"),
  getDepartmentScores: () => fetchAPI("/reports/department-scores"),
  getCustom: (params: string) => fetchAPI(`/reports/custom?${params}`),
};

/**
 * AI Advisor Endpoints
 */
export const aiApi = {
  getInsights: (description: string) => fetchAPI("/ai/suggest-emission-factor", {
    method: "POST",
    body: JSON.stringify({ description }),
  }),
  verifyCsrProof: (title: string, imgUrl: string) => fetchAPI("/ai/verify-csr", {
    method: "POST",
    body: JSON.stringify({ activity_title: title, image_url: imgUrl }),
  }),
};
