const pdf = require("pdf-parse");

export default async function handler(req, res) {
  // Bloqueia qualquer requisição que não seja POST
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {
    const { pdfBase64 } = req.body;

    if (!pdfBase64) {
      return res.status(400).json({ erro: "Nenhum PDF enviado" });
    }

    // Pega a string Base64 e transforma de volta em um "arquivo" na memória do servidor
    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    // Extrai o texto do PDF
    const dados = await pdf(pdfBuffer);

    // Devolve o texto limpo para o seu app
    res.status(200).json({ texto: dados.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro interno ao tentar ler o PDF" });
  }
}
