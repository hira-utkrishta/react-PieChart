import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./PieChart.css";
import { useState } from "react";
Chart.register(ArcElement);

function App() {
  const [formData, setFormData] = useState({ input1: "", input2: "" });
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");
  const [showChart, setShowChart] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreateChart = () => {
    const { input1, input2 } = formData;

    const total = parseInt(input1) + parseInt(input2);
    if (total > 100) {
      setError("Total cannot exceed 100%");
      return;
    } else {
      setError("");
    }

    const data = {
      labels: ["input1", "input2"],
      datasets: [
        {
          labels: ["input1", "input2"],
          data: [input1, input2],
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };

    setChartData(data);
    setShowChart(true);
  };
  const handleReset = () => {
    setFormData({ input1: "", input2: "" });
    setChartData("null");
    setShowChart(false);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-md-3 mt-5 ">
            <Card
              className=" text-black shadow-lg p-3 mb-5 bg-white rounded"
              style={{ backgroundColor: "rgb(169,169,169)" }}
            >
              {/* <Card.Title style={{ backgroundColor: "rgb(169,169,169)" }}>
                <h4 className=" text-center mt-4 mb-3 ">
                  <b>PieChart</b>
                </h4>
              </Card.Title> */}
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group className=" col-sm-12" controlId="boxinput1">
                        <Form.Label>
                          <h5>Box 1</h5>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          class="form-control"
                          controlId="boxinput1"
                          name="input1"
                          value={formData.input1}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3 col-sm-12"
                        controlId="boxinput2"
                      >
                        <Form.Label>
                          <h5>Box 2</h5>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          class="form-control"
                          controlId="boxinput2"
                          name="input2"
                          value={formData.input2}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="mb-2">
                    <Button
                      onClick={handleCreateChart}
                      variant="primary"
                      className="col-sm-offset mb-3"
                      size="md"
                      style={{ fontWeight: "bold" }}
                    >
                      Create
                    </Button>{" "}
                    <Button
                      onClick={handleReset}
                      variant="secondary"
                      className="mb-3"
                      size="md"
                      style={{ fontWeight: "bold" }}
                    >
                      Reset
                    </Button>
                    {error &&
                      ["danger"].map((varient) => (
                        <Alert key={varient} variant={varient}>
                          {error}
                        </Alert>
                      ))}
                  </div>
                </Form>
                <div className="chart_style">
                  {showChart && chartData && <Pie data={chartData} />}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
