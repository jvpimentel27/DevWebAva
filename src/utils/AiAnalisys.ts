import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function AiConversation(mensagem: string): Promise<string>{
  try{
    const chatCompletion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content: "Ao receber uma mensagem identifique ela como 'ofensiva' ou 'não ofensiva' e mais nenhum texto, coloque essa resposta em um JSON com a chave 'classificação' e faça a verificação para que a chave venha ser 'classificação novamente'",
        },
        {
          role: "user",
          content: mensagem
        }
      ],
      model: "llama-3.1-70b-versatile",
    });
      const content = chatCompletion.choices[0]?.message?.content || "";
      return content;    
  }catch(error){
    console.log("Erro no API do groq", error);
    return "";
  }
}
export default AiConversation;