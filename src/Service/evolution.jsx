import axios from "axios";

export async function evolution(lista) {
    
    const url = "https://webhook.winikii.com/webhook/javascript"; // URL do webhook
  
    try {
      const response = await axios.post(url, lista); // Envia os dados para o webhook
      return response.status
    } catch (error) {
      console.error("Erro ao enviar para o webhook:", error.response?.data || error.message);
    }
   
  }