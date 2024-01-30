import cors from "cors";
import app from "./app";

require("dotenv").config();

// Configuração do CORS
app.use(cors());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
