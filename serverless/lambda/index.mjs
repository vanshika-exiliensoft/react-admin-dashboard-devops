
export const handler = async (event) => {
  const path = event.rawPath || "/";

  if (path === "/api/health") {
    return response(200, {
      status: "healthy",
      service: "React Admin Dashboard API",
      timestamp: new Date().toISOString()
    });
  }

  if (path === "/api/dashboard") {
    return response(200, {
      totalCustomers: 125,
      newCustomers: 18,
      monthlyRecurringRevenue: 24500,
      activeDeals: 32,
      revenueTrend: [
        { month: "May", revenue: 18000 },
        { month: "Jun", revenue: 19500 },
        { month: "Jul", revenue: 21000 },
        { month: "Aug", revenue: 22000 },
        { month: "Sep", revenue: 23200 },
        { month: "Oct", revenue: 24500 }
      ],
      sourceDistribution: [
        { type: "Website", value: 50 },
        { type: "Referral", value: 35 },
        { type: "Ads", value: 25 },
        { type: "Partner", value: 15 }
      ],
      recentActivities: []
    });
  }

  return response(404, { error: "Route not found" });
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  };
}
