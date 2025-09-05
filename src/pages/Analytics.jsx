// src/pages/AnalyticsPage.js
import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { Box, Typography, Grid, Paper } from "@mui/material";

export default function AnalyticsPage() {
  const projects = useSelector((s) => s.projects.items);

  // Count projects by status
  const statusCounts = useMemo(() => {
    return projects.reduce(
      (acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      },
      { active: 0, pending: 0, completed: 0 }
    );
  }, [projects]);

  const statusChart = {
    options: {
      chart: { type: "pie" },
      labels: ["Active", "Pending", "Completed"],
    },
    series: [
      statusCounts.active,
      statusCounts.pending,
      statusCounts.completed,
    ],
  };

  // Chart: Projects per Owner
  const ownerCounts = useMemo(() => {
    const counts = {};
    projects.forEach((p) => {
      counts[p.owner] = (counts[p.owner] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const ownerChart = {
    options: {
      chart: { type: "bar" },
      xaxis: { categories: Object.keys(ownerCounts) },
    },
    series: [
      {
        name: "Projects",
        data: Object.values(ownerCounts),
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Projects by Status</Typography>
            <ReactApexChart
              options={statusChart.options}
              series={statusChart.series}
              type="pie"
              height={300}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Projects per Owner</Typography>
            <ReactApexChart
              options={ownerChart.options}
              series={ownerChart.series}
              type="bar"
              height={300}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
