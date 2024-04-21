const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

const Chart = require("./models/charts");

app.get("/api/charts", (request, response) => {
  Chart.find({}).then((charts) => {
    response.json(charts); 
  });
});

app.get("/api/charts/:id", (request, response) => { 
  Chart.findById(request.params.id)
    .then((chart) => {
      if (chart) {
        response.json(chart);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.post("/api/charts", (request, response) => {
  const chart = new Chart({ 
    seriesTitle: request.body.seriesTitle, 
    xAxisName: request.body.xAxisName,
    values: request.body.values,
    title: request.body.title, 
    data: request.body.data, 
    dates: request.body.dates,
    color: request.body.color
  });

  chart
    .save()
    .then((savedChart) => {
      response.json(savedChart);
    })
    .catch((error) => {
      console.error("Error saving chart:", error);
      response.status(500).json({
        error: "Internal Server Error",
      });
    });
});

app.put("/api/charts/:id", (request, response) => {
  const chartId = request.params.id;
  const { seriesTitle, xAxisName, values, title, data, dates ,color} = request.body;

  Chart.findByIdAndUpdate(chartId, {
    seriesTitle,
    xAxisName,
    values,
    title,
    data,
    dates,
    color
  }, { new: true })
    .then(updatedChart => {
      if (!updatedChart) {
        return response.status(404).json({ error: "Chart not found" });
      }
      response.json(updatedChart);
    })
    .catch(error => {
      console.error("Error updating chart:", error);
      response.status(500).json({ error: "Internal Server Error" });
    });
});

app.delete("/api/charts/:id", (request, response) => {
  const chartId = request.params.id;

  Chart.findByIdAndDelete(chartId)
    .then(deletedChart => {
      if (!deletedChart) {
        return response.status(404).json({ error: "Chart not found" });
      }
      response.json({ message: "Chart deleted successfully" });
    })
    .catch(error => {
      console.error("Error deleting chart:", error);
      response.status(500).json({ error: "Internal Server Error" });
    });
});

const PORT = 5174;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
