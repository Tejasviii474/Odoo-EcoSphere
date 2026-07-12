/**
 * EcoSphere API Client
 * 
 * This file handles all communication between the Next.js frontend and the FastAPI backend.
 * The Team Leader will define the exact endpoints, but these mock definitions map to our architecture.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Generic fetch wrapper to handle JSON and errors
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${localStorage.getItem("token")}` // Uncomment when auth is ready
  };

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
 * Environmental API Endpoints
 */
export const environmentalApi = {
  // Simulates the Auto-Emission Calculation via ERP Data
  simulateErpTransaction: (data: { type: string; amount: number; unit: string }) => {
    return fetchAPI("/emissions/calculate", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  
  getSummary: () => fetchAPI("/emissions/summary"),
};

/**
 * Gamification API Endpoints
 */
export const gamificationApi = {
  getActiveChallenges: () => fetchAPI("/challenges/active"),
  
  submitProof: (challengeId: string, proofUrl: string) => {
    return fetchAPI(`/challenges/${challengeId}/participate`, {
      method: "POST",
      body: JSON.stringify({ proof_url: proofUrl }),
    });
  },
  
  getLeaderboard: () => fetchAPI("/gamification/leaderboard"),
};

/**
 * Governance & Compliance API Endpoints
 */
export const governanceApi = {
  getComplianceIssues: () => fetchAPI("/compliance/issues"),
  
  acknowledgePolicy: (policyId: string) => {
    return fetchAPI(`/policies/${policyId}/acknowledge`, { method: "POST" });
  }
};

/**
 * AI Advisor Endpoints
 */
export const aiApi = {
  // Calls the Gemini API through our FastAPI backend
  getInsights: () => fetchAPI("/ai/insights"),
};
