import { useState } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const MatrixCalculator = () => {
  const [rows, setRows] = useState<string>("");
  const [columns, setColumns] = useState<string>("");
  const [matrices, setMatrices] = useState<{
    sum: number[][];
    product: number[][];
  } | null>(null);
  const [addMatrix, setAddMatrix] = useState<number[][] | null>(null);

  const generateMatrices = () => {
    const rowCount = Number(rows);
    const colCount = Number(columns);

    if (rowCount > 0 && colCount > 0) {
      const newSumMatrix = Array.from({ length: rowCount }, (_, r) =>
        Array.from({ length: colCount }, (_, c) => r + c)
      );
      const newProductMatrix = Array.from({ length: rowCount }, (_, r) =>
        Array.from({ length: colCount }, (_, c) => r * c)
      );

      setMatrices({ sum: newSumMatrix, product: newProductMatrix });
      setAddMatrix(null);
    }
  };

  const refreshMatrices = () => {
    setRows("");
    setColumns("");
    setMatrices(null);
    setAddMatrix(null);
  };

  const addMatrices = () => {
    if (!matrices) return;
    const { sum, product } = matrices;

    const resultMatrix = sum.map((row, rIndex) =>
      row.map((cell, cIndex) => cell + product[rIndex][cIndex])
    );

    setAddMatrix(resultMatrix);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        mt: 4,
      }}
    >
      {/* Input Section */}
      <Card
        elevation={4}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 2,
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Added box shadow
          transition: "transform 0.2s, box-shadow 0.2s", // Smooth transition effect
          "&:hover": {
            transform: "scale(1.02)", // Slightly enlarges on hover
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
          },
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Matrix Calculator
        </Typography>
        <Stack spacing={2} alignItems="center">
          <TextField
            label="Rows"
            type="number"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            label="Columns"
            type="number"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={generateMatrices}
              disabled={!rows || !columns}
            >
              Generate
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ bgcolor: "#2f2f2f" }}
              onClick={refreshMatrices}
            >
              <RefreshIcon />
            </Button>
          </Stack>
        </Stack>
      </Card>

      {/* Matrix Section */}
      {matrices && (
        <Card
          elevation={4}
          sx={{
            p: 4,
            width: "70%",
            borderRadius: 2,
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s, box-shadow 0.2s", 
            "&:hover": {
              transform: "scale(1.02)", 
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
            },
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{pb:2}}>
            Generated Matrix
          </Typography>

          <Stack
            spacing={3}
            fontWeight="bold"
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
          >
            {[
              { title: "Sum of Index", data: matrices.sum },
              { title: "Multiplication of Index", data: matrices.product },
            ].map((matrix, i) => (
              <Card key={i} elevation={3} sx={{ borderRadius: 2, flex: 1 }}>
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {matrix.title}
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {matrix.data.map((row, rIndex) => (
                          <TableRow key={rIndex}>
                            {row.map((cell, cIndex) => (
                              <TableCell
                                key={cIndex}
                                sx={{ textAlign: "center" }}
                              >
                                {cell}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Box mt={3}>
            <Button
              variant="contained"
              sx={{ bgcolor: "2f2f2f", color: "#fff" }}
              onClick={addMatrices}
            >
              Add Matrices
            </Button>
          </Box>
        </Card>
      )}

      {/* Added Matrix Section */}
      {addMatrix && (
        <Card
          elevation={4}
          sx={{
            p: 3,
            width: "50%",
            borderRadius: 2,
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Added box shadow
            transition: "transform 0.2s, box-shadow 0.2s", // Smooth transition effect
            "&:hover": {
              transform: "scale(1.02)", // Slightly enlarges on hover
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
            },
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Added Matrix
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {addMatrix.map((row, rIndex) => (
                  <TableRow key={rIndex}>
                    {row.map((cell, cIndex) => (
                      <TableCell
                        key={cIndex}
                        sx={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  );
};

export default MatrixCalculator;
