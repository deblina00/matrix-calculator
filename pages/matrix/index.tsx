import { Box, Container} from "@mui/material";
import MatrixCalculator from "./matrixTable";

const Home=() =>{
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ bgcolor: "#E0C2FF" }}
    >
      <Container>
        <MatrixCalculator />
      </Container>
    </Box>
  );
}
export default Home;