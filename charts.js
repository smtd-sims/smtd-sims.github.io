// Chart.js global defaults
Chart.defaults.font.family = "Arial";
Chart.defaults.font.size = 18;

// Plugin: Category Bands for chart4 & chart8
const categoryBandsPlugin = {
  id: "categoryBands",
  // Chart 4 & 8: Color scheme
  beforeDraw: function (chart, args, options) {
    if (chart.canvas.id !== "chart4" && chart.canvas.id !== "chart8") return;
    const { ctx, chartArea, scales } = chart;
    if (!ctx || !chartArea) return;

    // Define colors for each band based on chart id
    let bandColors;
    if (chart.canvas.id === "chart4") {
      bandColors = [
        "rgba(165, 207, 76, 0.6)",
        "rgba(175, 204, 87, 0.6)",
        "rgba(143, 165, 77, 0.6)",
        "rgba(111, 126, 68, 0.6)",
        "rgba(80, 87, 58, 0.6)",
        "rgba(48, 48, 49, 0.6)",
      ];
    } else if (chart.canvas.id === "chart8") {
      bandColors = [
        "rgba(217, 132, 59, 1)",
        "rgba(213, 158, 59, 1)",
        "rgba(199, 185, 58, 1)",
        "rgba(181, 201, 67, 1)",
        "rgba(166, 215, 75, 1)",
        "rgba(165, 207, 76, 1)",
      ];
    }
    if (chart.canvas.id === "chartFuturistic") {
      bandColors = [
        "rgba(0, 189, 255, 0.7)", // Bright neon blue
        "rgba(44, 130, 201, 0.7)", // Vivid mid blue
        "rgba(100, 149, 237, 0.7)", // Soft cornflower blue
        "rgba(131, 178, 220, 0.7)", // Muted blue-grey
        "rgba(180, 190, 200, 0.7)", // Pale futuristic grey
        "rgba(60, 66, 73, 0.7)", // Deep slate grey
        // "rgba(150, 200, 150, 0.7)",
      ];
    }

    // Draw each band from (N-0.5) to (N+0.5)
    for (let cat = 0; cat <= 4; cat++) {
      const yTop = scales.y.getPixelForValue(cat + 1.0);
      const yBottom = scales.y.getPixelForValue(cat - 0.0);
      ctx.save();
      ctx.fillStyle = bandColors[cat];
      ctx.fillRect(
        chartArea.left,
        yTop,
        chartArea.right - chartArea.left,
        yBottom - yTop
      );
      ctx.restore();
    }
  },
};

// Responsive Options Helper with per-chart customisation
function getResponsiveOptions(containerWidth, title, id) {
  // Base font and layout adjustments for responsiveness
  let fontSize = 12;
  let titleFontSize = 14;
  let padding = 10;

  // if (containerWidth < 400) {
  //   fontSize = 12;
  //   titleFontSize = 14;
  //   padding = 10;
  // } else if (containerWidth < 700) {
  //   fontSize = 15;
  //   titleFontSize = 19;
  //   padding = 30;
  // }

  // Default options
  let options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: titleFontSize,
          weight: "normal",
        },
        padding: { top: 8, bottom: 16 },
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          size: fontSize,
        },
        titleFont: {
          size: fontSize + 2,
        },
      },
    },
    layout: {
      padding: padding,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: { size: fontSize },
          color: "#303031",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: { size: fontSize },
          color: "#303031",
        },
        grid: {
          color: "#e3e9f7",
        },
      },
    },
  };

  // Per-chart customisation using switch on id
  switch (id) {
    case "index1":
      options.plugins.legend.display = true;
      options.plugins.legend.position = "top";
      options.scales.x.stacked = false;
      options.scales.y.beginAtZero = true;
      options.scales.y.title = {
        display: true,
        text: "Index points",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      options.scales.x.title = {
        display: true,
        text: "Orginal structure strength [%]",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      options.plugins.legend.labels = {
        font: {
          size: fontSize - 2,
          weight: "normal",
        },
        color: "#303031",
        boxWidth: fontSize,
        boxHeight: fontSize,
      };
      break;
    case "index2":
      options.plugins.legend.display = true;
      options.plugins.legend.position = "top";
      options.scales.x.stacked = false;
      options.scales.y.beginAtZero = true;
      options.scales.y.title = {
        display: true,
        text: "Index points",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      options.scales.x.title = {
        display: true,
        text: "Defect priority",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      options.plugins.legend.labels = {
        font: {
          size: fontSize - 2,
          weight: "normal",
        },
        color: "#303031",
        boxWidth: fontSize,
        boxHeight: fontSize,
      };
      break;
    case "index3":
      options.plugins.legend.display = false;
      options.plugins.legend.position = "top";
      options.scales.x.stacked = false;
      options.scales.y.beginAtZero = true;
      options.scales.y.title = {
        display: true,
        text: "R millions",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      options.scales.x.title = {
        display: true,
        text: "Financial indicators",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      options.plugins.legend.labels = {
        font: {
          size: fontSize - 2,
          weight: "normal",
        },
        color: "#303031",
        boxWidth: fontSize,
        boxHeight: fontSize,
      };
      break;
    case "chart1":
      options.plugins.legend.display = false;
      options.scales.x.stacked = false;
      options.scales.y.beginAtZero = true;
      options.scales.y.title = {
        display: true,
        text: "Inspection count",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      break;
    case "chart2":
      options.plugins.legend.display = true;
      options.cutout = "50%";
      options.plugins.legend.position = "bottom";
      options.plugins.legend.labels = {
        font: {
          size: fontSize - 2,
          weight: "normal",
        },
        color: "#303031",
        boxWidth: fontSize,
        boxHeight: fontSize,
      };
      options.scales = {
        x: { display: false },
        y: { display: false },
      };
      break;
    case "chart3":
      options.plugins.legend.display = false;
      options.scales.x.stacked = false;
      options.scales.y.beginAtZero = true;
      options.scales.y.title = {
        display: true,
        text: "Inspection count",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      break;
    case "chart4":
      options.plugins.legend.display = false;

      // Adjust default settings: Change grid x
      options.scales.x.grid.display = true;
      options.scales.x.stacked = false;

      // Adjust default settings: Change grid y
      options.scales.y.grid.display = false;
      options.scales.y.beginAtZero = false;
      options.scales.y.min = 0.0;
      options.scales.y.max = 5.0;
      options.scales.y.ticks = {
        font: { size: fontSize },
        color: "#303031",
        stepSize: 1,
      };
      options.scales.y.title = {
        display: true,
        text: "Condition category",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      break;
    case "chart5":
      options.plugins.legend.display = false;
      options.scales.x.stacked = false;
      options.scales.y.beginAtZero = true;
      options.scales.y.title = {
        display: true,
        text: "Inspection count",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      break;
    case "chart6":
      options.plugins.legend.display = true;
      options.cutout = "50%";
      options.plugins.legend.position = "bottom";
      options.plugins.legend.labels = {
        font: {
          size: fontSize - 2,
          weight: "normal",
        },
        color: "#303031",
        boxWidth: fontSize,
        boxHeight: fontSize,
      };
      options.scales = {
        x: { display: false },
        y: { display: false },
      };
      break;
    case "chart7":
      options.plugins.legend.display = false;
      options.scales.x.stacked = false;
      options.scales.y.beginAtZero = true;
      options.scales.y.title = {
        display: true,
        text: "Inspection count",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      break;
    case "chart8":
      options.plugins.legend.display = false;

      // Adjust default settings: Change grid x
      options.scales.x.grid.display = true;
      options.scales.x.stacked = false;

      // Adjust default settings: Change grid y
      options.scales.y.grid.display = false;
      options.scales.y.beginAtZero = false;
      options.scales.y.min = 0.0;
      options.scales.y.max = 5.0;
      options.scales.y.ticks = {
        font: { size: fontSize },
        color: "#303031",
        stepSize: 1,
      };
      options.scales.y.title = {
        display: true,
        text: "Priority level",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      break;
    //------------------------------------------------------------
    case "chart9":
      options.indexAxis = "y";
      options.scales.y.beginAtZero = true;
      options.plugins.legend.display = false;
      options.scales.x.grid.display = true;
      options.scales.x.title = {
        display: true,
        text: "Cost R million",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      break;
    case "chart10":
      options.plugins.legend.display = true;
      options.plugins.legend.position = "top";
      options.plugins.legend.labels = {
        font: {
          size: fontSize - 2,
          weight: "normal",
        },
        color: "#303031",
        boxWidth: fontSize * 2,
        boxHeight: fontSize / 4,
      };

      options.scales.x.grid.display = true;
      options.scales.y.grid.display = true;
      options.scales.y.beginAtZero = true;
      options.scales.y.title = {
        display: true,
        text: "Condition",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      options.scales.y.ticks = {
        font: { size: fontSize },
        color: "#303031",
      };

      // Add secondary Y axis
      options.scales.y2 = {
        beginAtZero: true,
        position: "right",
        grid: {
          drawOnChartArea: false, // Only want the grid lines for one axis
        },
        title: {
          display: true,
          text: "Cost R millions",
          font: {
            size: fontSize + 2,
            weight: "normal",
          },
          color: "rgba(70, 120, 170, 1)", // Faded blue-grey
          padding: { top: 4, bottom: 8 },
        },
        ticks: {
          font: { size: fontSize },
          color: "rgba(70, 120, 170, 1)", // Faded blue-grey
        },
      };
      break;
    case "chart11":
      options.plugins.legend.display = true;
      options.plugins.legend.position = "top";
      options.plugins.legend.labels = {
        font: {
          size: fontSize - 2,
          weight: "normal",
        },
        color: "#303031",
        boxWidth: fontSize * 2,
        boxHeight: fontSize / 4,
      };

      options.scales.x.grid.display = true;
      options.scales.y.grid.display = true;
      options.scales.y.beginAtZero = true;
      options.scales.y.title = {
        display: true,
        text: "Risk Score",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      options.scales.y.ticks = {
        font: { size: fontSize },
        color: "#303031",
      };

      // Add secondary Y axis
      options.scales.y2 = {
        beginAtZero: true,
        position: "right",
        grid: {
          drawOnChartArea: false, // Only want the grid lines for one axis
        },
        title: {
          display: true,
          text: "Cost R millions",
          font: {
            size: fontSize + 2,
            weight: "normal",
          },
          color: "rgba(70, 120, 170, 1)", // Faded blue-grey
          padding: { top: 4, bottom: 8 },
        },
        ticks: {
          font: { size: fontSize },
          color: "rgba(70, 120, 170, 1)", // Faded blue-greye
        },
      };
      break;
    case "chart12":
      options.plugins.legend.display = false;
      options.scales.y.beginAtZero = true;
      options.scales.y.title = {
        display: true,
        text: "Cost R millions",
        font: {
          size: fontSize + 2,
          weight: "normal",
        },
        color: "#303031",
        padding: { top: 4, bottom: 8 },
      };
      break;

    default:
      break;
  }
  return options;
}

// Chart configurations
const chartConfigs = [
  {
    id: "index1",
    type: "bar",
    title: "Condition Health Index",
    data: {
      labels: ["0 - 75", "75 - 95", "95 - 100"],
      datasets: [
        {
          label: "Actual %",
          data: [12.59, 45.02, 42.39],
          backgroundColor: "rgba(165, 207, 76, 0.7)",
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
        {
          label: "Target %",
          data: [10, 30, 60], // Example data, adjust as needed
          backgroundColor: "rgba(48, 48, 49, 1)",
          borderWidth: 1,
          borderColor: "#444",
          hoverBorderWidth: 3,
          hoverBorderColor: "#222",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
      ],
    },
  },
  {
    id: "index2",
    type: "bar",
    title: "Risk Health Index",
    data: {
      labels: ["Low", "Medium", "High"],
      datasets: [
        {
          label: "Actual %",
          data: [51.22, 23.79, 24.98],
          backgroundColor: "rgba(217, 132, 59, 0.7)",
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
        {
          label: "Target %",
          data: [50, 25, 25], // Example data, adjust as needed
          backgroundColor: "rgba(48, 48, 49, 1)",
          borderWidth: 1,
          borderColor: "#444",
          hoverBorderWidth: 3,
          hoverBorderColor: "#222",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
      ],
    },
  },
  {
    id: "index3",
    type: "bar",
    title: ["Cost Performace Index", " ", " "], // Contol plot area offset with black spaces
    data: {
      labels: ["Budget", "Actual", "Forecast", "Committed"],
      datasets: [
        {
          label: ["R million"],
          data: [6.32, 4.68, 4.12, 1.64],
          backgroundColor: [
            "rgba(48, 48, 49, 1)",
            "rgba(131, 178, 220, 0.7)",
            "rgba(180, 190, 200, 0.7)",
            "rgba(70, 86, 99, 0.7)",
          ],
          borderWidth: 1,
          borderColor: "#444",
          hoverBorderWidth: 3,
          hoverBorderColor: "#222",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
      ],
    },
  },
  {
    id: "chart1",
    type: "bar",
    title: "Condition Overview",
    data: {
      labels: ["Cat 0", "Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5"],
      datasets: [
        {
          label: "No",
          data: [12, 462, 765, 1222, 165, 55],
          backgroundColor: [
            "rgba(165, 207, 76, 1)",
            "rgba(175, 204, 87, 1)",
            "rgba(143, 165, 77, 1 )",
            "rgba(111, 126, 68, 1 )",
            "rgba(80, 87, 58, 1)",
            "rgba(48, 48, 49, 1)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
      ],
    },
  },
  {
    id: "chart2",
    type: "doughnut",
    title: "Condition Extent",
    data: {
      labels: ["Ext 1", "Ext 2", "Ext 3", "Ext 4"],
      datasets: [
        {
          label: "Yes",
          data: [1112, 713, 641, 215],
          backgroundColor: [
            "rgba(165, 207, 76, 1)",
            "rgba(152, 172, 94, 1)",
            "rgba(100, 110, 55, 1)",
            "rgba(48, 48, 49, 1)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
  },
  {
    id: "chart3",
    type: "bar",
    title: "Inspection Frequency",
    data: {
      labels: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ],
      datasets: [
        {
          label: "No",
          data: [523, 0, 0, 0, 765, 1233, 456, 0, 0, 655, 2681],
          backgroundColor: "rgba(165, 207, 76, 0.6)",
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
      ],
    },
  },
  {
    id: "chart4",
    type: "line", // Only the line, background bands via plugin
    title: "Condition Profile",
    data: {
      labels: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ],
      datasets: [
        {
          label: "Average Condition",
          data: [2.3, 2.5, 3.1, 3.9, 3.5, 3.4, 4.2, 3.7, 3.2, 2.9, 2.8],
          backgroundColor: "rgba(136, 148, 115, 0.6)",
          borderColor: "rgba(92, 98, 80, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(48, 48, 49, 1)",
          pointRadius: 3,
          fill: false,
        },
      ],
    },
  },
  {
    id: "chart5",
    type: "bar",
    title: "Priority Overview",
    data: {
      labels: ["Lev X", "Lev 1", "Lev 2", "Lev 3", "Lev M", "Lev RF"],
      datasets: [
        {
          label: "No",
          data: [38, 361, 505, 623, 67, 3],
          backgroundColor: [
            "rgba(217, 132, 59, 1)",
            "rgba(213, 158, 59, 1)",
            "rgba(199, 185, 58, 1)",
            "rgba(181, 201, 67, 1)",
            "rgba(166, 215, 75, 1)",
            "rgba(165, 207, 76, 1)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
      ],
    },
  },
  {
    id: "chart6",
    type: "doughnut",
    title: "Priority Criticality",
    data: {
      labels: ["Lev A", "Lev B", "Lev C", "Lev D"],
      datasets: [
        {
          label: "Yes",
          data: [69, 210, 822, 496],
          backgroundColor: [
            "rgba(217, 132, 59, 1)",
            "rgba(199, 185, 58, 1)",
            "rgba(181, 201, 67, 1)",
            "rgba(165, 207, 76, 1)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
  },
  {
    id: "chart7",
    type: "bar",
    title: "Inspection Frequency",
    data: {
      labels: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ],
      datasets: [
        {
          label: "No",
          data: [523, 0, 0, 0, 765, 1233, 456, 0, 0, 655, 2681],
          backgroundColor: "rgba(165, 207, 76, 0.6)",
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
      ],
    },
  },
  {
    id: "chart8",
    type: "line", // Only the line, background bands via plugin
    title: "Priority Profile",
    data: {
      labels: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ],
      datasets: [
        {
          label: "Ave Priority",
          data: [3.3, 3.5, 3.1, 2.9, 3.5, 3.8, 4.2, 3.7, 2.8, 2.5, 2.3],
          backgroundColor: "rgba(136, 148, 115, 0.6)",
          borderColor: "rgba(92, 98, 80, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(48, 48, 49, 1)",
          pointRadius: 3,
          fill: false,
        },
      ],
    },
  },
  //-------------------------------------------------------------
  {
    id: "chart9",
    type: "bar",
    title: "Programme Cost",
    data: {
      labels: [
        "Steel Rehabilitation",
        "Concrete Rehabilitation",
        "Corrosion Protection",
        "Committed Projects",
        "SIMM Inspections",
        "Ad-hoc Projects",
      ],
      datasets: [
        {
          label: "Cost R million",
          data: [1.62, 0.89, 0.67, 1.3, 1.44, 0.4],
          backgroundColor: [
            "rgba(131, 178, 220, 0.9)", // Muted blue-grey
            "rgba(100, 149, 237, 0.9)", // Soft cornflower blue
            "rgba(70, 120, 170, 0.9)", // Faded blue-grey
            "rgba(90, 105, 120, 0.9)", // Slate grey-blue
            "rgba(70, 86, 99, 0.9)", // Slate grey
            "rgba(48, 48, 49, 0.9)", // Deep tech grey
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
      ],
    },
  },
  {
    id: "chart10",
    type: "line",
    title: "Condition Impact",
    data: {
      labels: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ],
      datasets: [
        {
          // Main axis
          yAxisID: "y",
          label: "Condition",
          data: [2.3, 2.5, 3.1, 3.9, 3.5, 3.4, 4.2, 3.7, 3.2, 2.9, 2.8],
          backgroundColor: "rgba(48, 48, 49, 0.3)", // Deep tech grey
          borderColor: "rgba(48, 48, 49, 0.7)", // Deep tech grey
          borderWidth: 2,
          pointBackgroundColor: "rgba(48, 48, 49, 0.7)", // Deep tech grey
          pointRadius: 3,
          fill: false,
        },
        {
          // Secondary axis
          label: "Budget",
          data: [
            0.96, 0.85, 1.23, 0.28, 0.56, 0.75, 1.32, 2.66, 5.68, 4.93, 6.32,
          ],
          yAxisID: "y2",
          backgroundColor: "rgba(70, 86, 99, 0.3)", // Slate gre
          borderColor: "rgba(131, 178, 220, 1)", // Muted blue-grey
          borderWidth: 2,
          pointBackgroundColor: "rgba(131, 178, 220, 1)", // Muted blue-gre
          pointRadius: 3,
          fill: false,
        },
      ],
    },
  },
  {
    id: "chart11",
    type: "line",
    title: "Risk Impact",
    data: {
      labels: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ],
      datasets: [
        {
          // Main axis
          yAxisID: "y",
          label: "Risk score",
          data: [3.3, 3.5, 3.1, 2.9, 3.5, 3.8, 4.2, 3.7, 2.8, 2.5, 2.3],
          backgroundColor: "rgba(48, 48, 49, 0.3)", // Deep tech grey
          borderColor: "rgba(48, 48, 49, 7)", // Deep tech grey
          borderWidth: 2,
          pointBackgroundColor: "rgba(48, 48, 49, 7)", // Deep tech grey
          pointRadius: 3,
          fill: false,
        },
        {
          // Secondary axis
          label: "Budget",
          data: [
            0.96, 0.85, 1.23, 0.28, 0.56, 0.75, 1.32, 2.66, 5.68, 4.93, 6.32,
          ],
          yAxisID: "y2",
          backgroundColor: "rgba(70, 86, 99, 0.3)", // Slate gre
          borderColor: "rgba(131, 178, 220, 1)", // Muted blue-grey
          borderWidth: 2,
          pointBackgroundColor: "rgba(131, 178, 220, 1)", // Muted blue-grey
          pointRadius: 3,
          fill: false,
        },
      ],
    },
  },
  {
    id: "chart12",
    type: "bar",
    title: "Budget Profile",
    data: {
      labels: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ],
      datasets: [
        {
          label: "R million",
          data: [
            0.96, 0.85, 1.23, 0.28, 0.56, 0.75, 1.32, 2.66, 5.68, 4.93, 6.32,
          ],
          backgroundColor: "rgba(131, 178, 220, 1)",
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
      ],
    },
  },
];

// Chart instances mapped by id
const charts = {};

// Render a single chart
function renderChart(config) {
  const canvas = document.getElementById(config.id);
  if (!canvas) return;
  const container = canvas.parentElement;
  const containerWidth = container ? container.offsetWidth : 600;

  // Destroy old chart if exists
  if (charts[config.id]) {
    charts[config.id].destroy();
  }

  charts[config.id] = new Chart(canvas.getContext("2d"), {
    type: config.type,
    data: config.data,
    options: getResponsiveOptions(containerWidth, config.title, config.id),
    plugins: [categoryBandsPlugin], // Register the categoryBands plugin globally
  });
}

// Render all charts
function renderAllCharts() {
  chartConfigs.forEach((config) => renderChart(config));
}

// Initial render and responsive redraw
window.addEventListener("DOMContentLoaded", renderAllCharts);
window.addEventListener("resize", renderAllCharts);

//------------------------------------------------------------
// Grid.js Inventroy Table
//------------------------------------------------------------

// myData
const myData = [
  [
    "G01-04-004-CNC-001",
    "Conveyor 2 A1 + B1",
    "Spalling Concrete",
    "1",
    "3",
    "2",
    "8",
    "2024",
    "link",
    "A concrete diagnostic exercise must be undertaken to determine the concrete condition and prescribe the necessary remedial action.",
    "Concrete Rehabilitation",
  ],
  [
    "G01-04-004-ST2-STR-002",
    "Conveyor 2 A1 + B1",
    "Dubious Design",
    "3",
    "1",
    "1",
    "10",
    "2024",
    "link",
    "The integrity of the existing design needs to be verified by a Pr Structural Engineerand who is to provide remedial recommendations if required.",
    "Ad-hoc Projects",
  ],
  [
    "G01-04-004-ST3-STR-001",
    "Conveyor 2 A1 + B1",
    "Damaged structure",
    "4",
    "2",
    "2",
    "14",
    "2024",
    "link",
    "The structure is to be repaired to its original design detail and to a Pr Structural Engineer's method statement.",
    "Steel Rehabilitation",
  ],
  [
    "G01-04-004-ST3-STR-002",
    "Conveyor 2 A1 + B1",
    "Damaged structure",
    "3",
    "2",
    "3",
    "14",
    "2024",
    "link",
    "The structure is to be analysed with the full extent of repairs quantified in a detailed structural survey of the area.",
    "Steel Rehabilitation",
  ],
  [
    "G01-04-004-ST3-STR-002",
    "Conveyor 2 A1 + B1",
    "Damaged structure",
    "3",
    "2",
    "1",
    "6",
    "2024",
    "link",
    "The structure is to be reinstated to original design and specifications.",
    "Steel Rehabilitation",
  ],
  [
    "G01-04-004-ST3-STR-003",
    "Conveyor 2 A1 + B1",
    "Damaged structure",
    "2",
    "3",
    "2",
    "8",
    "2024",
    "link",
    "The structure is to be reinstated to original design and specifications.",
    "Steel Rehabilitation",
  ],
  [
    "G01-04-004-ST3-STR-003",
    "Conveyor 2 A1 + B1",
    "Damaged structure",
    "1",
    "3",
    "2",
    "5",
    "2024",
    "link",
    "The structure is to be reinstated to original design and specifications.",
    "Steel Rehabilitation",
  ],
  [
    "G01-04-004-ST3-STR-004",
    "Conveyor 2 A1 + B1",
    "Damaged structure",
    "3",
    "2",
    "1",
    "10",
    "2024",
    "link",
    "A Professional Structural Engineer must be appointed to inspect the structure and design a new workable setup.",
    "Steel Rehabilitation",
  ],
  [
    "G01-04-004-ST4-STR-001",
    "Conveyor 2 A1 + B1",
    "Damaged structure",
    "3",
    "2",
    "2",
    "12",
    "2024",
    "link",
    "Member to be replaced to original design.",
    "Steel Rehabilitation",
  ],
  [
    "G01-04-004-ST4-STR-001",
    "Conveyor 2 A1 + B1",
    "Spillages and corrosion",
    "2",
    "3",
    "2",
    "3",
    "2024",
    "link",
    "Clean spillages",
    "Corrosion Protection",
  ],
  [
    "G01-04-004-ST4-STR-002",
    "Conveyor 2 A1 + B1",
    "Missing member",
    "4",
    "2",
    "1",
    "3",
    "2024",
    "link",
    "The structure is to be reinstated to original design and specifications.",
    "Steel Rehabilitation",
  ],
  [
    "G01-04-004-ST4-STR-002",
    "Conveyor 2 A1 + B1",
    "Damaged structure",
    "4",
    "2",
    "3",
    "14",
    "2024",
    "link",
    "The structure is to be reinstated to original design and specifications.",
    "Steel Rehabilitation",
  ],
  [
    "G01-04-004-STR-002",
    "Conveyor 2 A1 + B1",
    "Corrosion",
    "2",
    "3",
    "2",
    "10",
    "2024",
    "link",
    "Expedite an adequate steel and corrosion survey to quantify the steel replacement requirement in the area as well as quantify the corrosion protection work required to prolong the coating system by 15 to 20 years.",
    "Steel Rehabilitation",
  ],
  [
    "G01-06-008-CNC-002",
    "R1 Conveyor & Rock Bin",
    "Spalling Concrete",
    "1",
    "3",
    "2",
    "4",
    "2022",
    "link",
    "Complete a concrete diagnostic survey to quantify all concrete repairs required and repair to prescribed method statement and specifications.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-002",
    "R1 Conveyor & Rock Bin",
    "Damaged structure",
    "1",
    "3",
    "1",
    "3",
    "2022",
    "link",
    "The structure is to be analysed with the full extent of repairs quantified in a detailed structural survey of the area.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-002",
    "R1 Conveyor & Rock Bin",
    "Damaged structure",
    "2",
    "3",
    "3",
    "12",
    "2022",
    "link",
    "The structure is to be repaired to its original design detail and to a Pr Structural Engineer's method statement.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-003",
    "R1 Conveyor & Rock Bin",
    "Damaged structure",
    "3",
    "2",
    "2",
    "12",
    "2022",
    "link",
    "The structure is to be reinstated to original design and specifications.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-003",
    "R1 Conveyor & Rock Bin",
    "Damaged structure",
    "3",
    "2",
    "1",
    "8",
    "2022",
    "link",
    "The structure is to be analysed with the full extent of repairs quantified in a detailed structural survey of the area.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-003",
    "R1 Conveyor & Rock Bin",
    "Damaged structure",
    "3",
    "2",
    "1",
    "12",
    "2022",
    "link",
    "Member to be replaced to original design.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-004",
    "R1 Conveyor & Rock Bin",
    "Corroding structure",
    "2",
    "3",
    "2",
    "7",
    "2022",
    "link",
    "It is suggested that a corrosion survey be undertaken in order to investigate the extent and cost of a corrosion maintenance programme.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-005",
    "R1 Conveyor & Rock Bin",
    "Damaged structure",
    "1",
    "3",
    "1",
    "3",
    "2022",
    "link",
    "A Pr Structural Engineer is to assess the full extent and impact of the defect and provide a remedial design and method statement for repair.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-005",
    "R1 Conveyor & Rock Bin",
    "Corroding structure",
    "2",
    "3",
    "2",
    "4",
    "2022",
    "link",
    "A detailed corrosion survey should be initiated to quantify the extent and cost of a corrosion protection maintenance intervention.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-006",
    "R1 Conveyor & Rock Bin",
    "Damaged structure",
    "2",
    "3",
    "1",
    "4",
    "2022",
    "link",
    "Member to be replaced to original design.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-006",
    "R1 Conveyor & Rock Bin",
    "Missing member",
    "3",
    "1",
    "1",
    "20",
    "2022",
    "link",
    "The structure is to be reinstated to original design and specifications.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-007",
    "R1 Conveyor & Rock Bin",
    "Questionable Design",
    "3",
    "1",
    "3",
    "21",
    "2022",
    "link",
    "It is recommended that a Pr. Structural Engineer be appointed to reassess the design and advise on remedial options.",
    "Committed Projects",
  ],
  [
    "G01-06-008-STR-008",
    "R1 Conveyor & Rock Bin",
    "Questionable Design",
    "3",
    "1",
    "1",
    "18",
    "2022",
    "link",
    "Structure is to be redesigned/strengthened to Professional Structural Engineer's recommendation.",
    "Committed Projects",
  ],
  [
    "G01-06-012-CNC-001",
    "Silo A & B",
    "Spalling Concrete",
    "1",
    "3",
    "3",
    "5",
    "2024",
    "link",
    "Break-out defective concrete and repair to concrete specialist’s method statement and specification.",
    "Concrete Rehabilitation",
  ],
  [
    "G01-06-012-CNC-001",
    "Silo A & B",
    "Cracking and efflorescence",
    "2",
    "3",
    "2",
    "4",
    "2024",
    "link",
    "Hammer test and repair the defective concrete to a revised concrete repair method statement as defined through a concrete diagnostic survey conducted by a concrete specialist.",
    "Concrete Rehabilitation",
  ],
  [
    "G01-06-012-CNC-001",
    "Silo A & B",
    "Concrete efflorescence",
    "1",
    "3",
    "2",
    "4",
    "2024",
    "link",
    "Seal the silo to slab interface with the next silo shut opportunity.",
    "Concrete Rehabilitation",
  ],
  [
    "G01-06-012-CNC-001",
    "Silo A & B",
    "Cracking patch repairs",
    "2",
    "3",
    "3",
    "4",
    "2024",
    "link",
    "It is recommended that a detailed concrete diagnostic survey be conducted to scope all visible defects as well as latent defects that need to be addressed in a holistic rehabilitation programme.",
    "Concrete Rehabilitation",
  ],
  [
    "G01-06-012-CNC-002",
    "Silo A & B",
    "Spalling Concrete",
    "1",
    "3",
    "3",
    "5",
    "2024",
    "link",
    "A concrete diagnostic survey must be undertaken to determine the extent of the damage and prescribe a repair specification to ensure the holistic rehabilitation of the concrete structure.",
    "Concrete Rehabilitation",
  ],
  [
    "G01-06-012-CNC-002",
    "Silo A & B",
    "Cracking concrete",
    "2",
    "3",
    "3",
    "6",
    "2024",
    "link",
    "Complete a concrete diagnostic survey to quantify all concrete repairs required and repair to prescribed method statement and specifications.",
    "Concrete Rehabilitation",
  ],
  [
    "G01-06-012-CNC-002",
    "Silo A & B",
    "Spalling Concrete",
    "1",
    "3",
    "3",
    "10",
    "2024",
    "link",
    "It is recommended that a detailed concrete diagnostic survey be conducted to scope all visible defects as well as latent defects that need to be addressed in a holistic rehabilitation programme.",
    "Concrete Rehabilitation",
  ],
  [
    "G01-06-012-ST1-STR-001",
    "Silo A & B",
    "Loose sheeting panels",
    "3",
    "2",
    "3",
    "18",
    "2024",
    "link",
    "Reinstate loose and missing sheeting panels. Replace corroded panels and fixing screws.",
    "Ad-hoc Projects",
  ],
  [
    "G01-06-012-ST1-STR-001",
    "Silo A & B",
    "Corroding structure",
    "1",
    "3",
    "3",
    "6",
    "2024",
    "link",
    "A comprehensive corrosion survey needs to be completed by a corrosion specialist to provide a holisticand plant and production specificand coating specification and application method statement.",
    "Corrosion Protection",
  ],
  [
    "G01-06-012-ST1-STR-001",
    "Silo A & B",
    "Missing bolts on primary crawl connection.",
    "4",
    "X",
    "2",
    "12",
    "2024",
    "link",
    "Install missing bolts to specification.",
    "Ad-hoc Projects",
  ],
  [
    "G01-06-012-ST1-STR-001",
    "Silo A & B",
    "Suspect Design",
    "3",
    "1",
    "1",
    "3",
    "2024",
    "link",
    "Structure is to be redesigned/strengthened to Professional Structural Engineer's recommendation.",
    "Ad-hoc Projects",
  ],
  [
    "G01-06-012-ST2-STR-003",
    "Silo A & B",
    "Missing member",
    "3",
    "2",
    "4",
    "24",
    "2024",
    "link",
    "Reinstate sheeting panels to specification.",
    "Steel Rehabilitation",
  ],
  [
    "G01-06-012-ST2-STR-003",
    "Silo A & B",
    "Questionable Design",
    "3",
    "1",
    "1",
    "15",
    "2024",
    "link",
    "Pr Structural Engineer is to assess the structure's function and design a workable solution along with the design of temporary works required for the repair.",
    "Ad-hoc Projects",
  ],
  [
    "G01-06-012-ST2-STR-004",
    "Silo A & B",
    "Missing bolts.",
    "3",
    "1",
    "2",
    "5",
    "2024",
    "link",
    "Reinstate bolts and cleat brackets to original design.",
    "Ad-hoc Projects",
  ],
  [
    "G01-06-012-ST2-STR-007",
    "Silo A & B",
    "Corroding structure",
    "2",
    "3",
    "3",
    "12",
    "2024",
    "link",
    "The spillage is to be cleaned with a plate installed to prevent spillage build-up and water accumulation to a structural engineer's detail.",
    "Corrosion Protection",
  ],
  [
    "G01-06-012-ST2-STR-007",
    "Silo A & B",
    "Corroding structure",
    "4",
    "1",
    "3",
    "25",
    "2024",
    "link",
    "Addressed with ISA action.",
    "Corrosion Protection",
  ],
  [
    "G01-06-012-STR-002",
    "Silo A & B",
    "Missing member",
    "2",
    "3",
    "2",
    "6",
    "2024",
    "link",
    "Structure is to be repaired to Pr Structural Engineer's remedial design and repair method statement.",
    "Steel Rehabilitation",
  ],
  [
    "G01-06-012-STR-002",
    "Silo A & B",
    "Suspect Design",
    "4",
    "1",
    "1",
    "32",
    "2024",
    "link",
    "Columns to be installed to structural engineer's recommendation. Welds to be inspected and approved by competent  quality control inspector.",
    "Ad-hoc Projects",
  ],
  [
    "G01-06-012-STR-002",
    "Silo A & B",
    "Damaged Concrete",
    "3",
    "3",
    "1",
    "8",
    "2024",
    "link",
    "Install grout and HD bolts to structural engineer's recommendation.",
    "Concrete Rehabilitation",
  ],
  [
    "G01-06-012-STR-002",
    "Silo A & B",
    "Missing member",
    "4",
    "2",
    "1",
    "10",
    "2024",
    "link",
    "The structure is to be repaired to a Pr Structural Engineer's remedial detail.",
    "Steel Rehabilitation",
  ],
  [
    "G01-06-012-STR-002",
    "Silo A & B",
    "Suspect Design",
    "3",
    "2",
    "1",
    "12",
    "2024",
    "link",
    "The structure is to be repaired to a Pr Structural Engineer's remedial detail.",
    "Ad-hoc Projects",
  ],
  [
    "G01-06-012-STR-002",
    "Silo A & B",
    "Column base and bracket not adequately secured.",
    "3",
    "2",
    "1",
    "8",
    "2024",
    "link",
    "A Pr Structural Engineer is to assess the full extent and impact of the defect and provide a remedial design and method statement for repair.",
    "Ad-hoc Projects",
  ],
  [
    "G01-06-012-STR-004",
    "Silo A & B",
    "Missing member",
    "5",
    "1",
    "1",
    "14",
    "2024",
    "link",
    "The structure is to be repaired to a Pr Structural Engineer's remedial detail.",
    "Steel Rehabilitation",
  ],
  [
    "G01-06-012-STR-004",
    "Silo A & B",
    "Poor welding quality.",
    "3",
    "2",
    "1",
    "10",
    "2024",
    "link",
    "Coded welder to repair welded connection to specification.",
    "Ad-hoc Projects",
  ],
  [
    "G01-06-012-STR-004",
    "Silo A & B",
    "Missing member",
    "4",
    "1",
    "1",
    "12",
    "2024",
    "link",
    "A Pr Structural Engineer must audit the design and provide a remedial detail if required.",
    "Steel Rehabilitation",
  ],
  [
    "G01-06-012-STR-004",
    "Silo A & B",
    "Poor welding quality",
    "4",
    "1",
    "2",
    "18",
    "2024",
    "link",
    "Addressed with ISA",
    "Committed Projects",
  ],
  [
    "G01-06-012-STR-004",
    "Silo A & B",
    "Damaged structure",
    "5",
    "1",
    "1",
    "21",
    "2024",
    "link",
    "The structure is to be repaired to a Pr Structural Engineer's remedial detail.",
    "Steel Rehabilitation",
  ],
  [
    "G01-06-012-STR-004",
    "Silo A & B",
    "Missing member",
    "3",
    "2",
    "2",
    "12",
    "2024",
    "link",
    "Structure is to be repaired to Pr Structural Engineer's remedial design and repair method statement.",
    "Steel Rehabilitation",
  ],
  [
    "G01-06-012-STR-004",
    "Silo A & B",
    "Missing member",
    "4",
    "1",
    "2",
    "14",
    "2024",
    "link",
    "Install HD bolts and grouting to engineer's recommendation.",
    "Steel Rehabilitation",
  ],
  [
    "G01-06-012-STR-004",
    "Silo A & B",
    "Missing member",
    "4",
    "X",
    "1",
    "12",
    "2024",
    "link",
    "The structure is to be reinstated to original design and specifications.",
    "Steel Rehabilitation",
  ],
  [
    "G01-06-012-STR-004",
    "Silo A & B",
    "Dubious Design",
    "3",
    "1",
    "1",
    "9",
    "2024",
    "link",
    "Structure is to be redesigned/strengthened to Professional Structural Engineer's recommendation.",
    "Ad-hoc Projects",
  ],
  [
    "G01-07-034-CNC-001",
    "Dam Pump Station",
    "Masonry",
    "2",
    "3",
    "4",
    "4",
    "2023",
    "link",
    "Structure to be reviewed and lined as per engineers recommendation",
    "Concrete Rehabilitation",
  ],
];

// ---- Inventory Table Initialization ----

// Safely check for data presence before loading Grid.js
if (Array.isArray(myData) && myData.length > 0) {
  // Optionally log for debugging
  console.log("Inventory data loaded:", myData.length, "rows");

  // Get the inventory table container
  const container = document.getElementById("inventory-table");
  if (container) {
    // Initialize Grid.js table
    const grid = new gridjs.Grid({
      columns: [
        { name: "Floc ID", width: "9%", sort: true },
        { name: "Structure", width: "9%", sort: true },
        { name: "Problem", width: "9%", sort: true },
        { name: "Condition", width: "5%", sort: true },
        { name: "Priority", width: "5%", sort: true },
        { name: "Extent", width: "5%", sort: true },
        { name: "Criticality", width: "5%", sort: true },
        { name: "Date", width: "5%", sort: true },
        { name: "Image", width: "5%" },
        { name: "Remedial Action", width: "35%" },
        { name: "Programme", width: "8%", sort: true },
      ],
      data: myData,
      search: {
        selector: (cell) => cell,
      },
      fixHeader: true,
      // height: "440px",

      pagination: {
        limit: 5,
      },
    });
    grid.render(container);
  } else {
    console.error("Could not find inventory-table container in DOM.");
  }
} else {
  console.error("Inventory data not loaded or empty.");
}
