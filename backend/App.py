import requests
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- CHATBOT FONKSİYONLARI ---
def get_system_prompt():
    #system promptum
    return (
        "Sen yardımcı bir asistanısn."
    )

def llm_e_sor(konusma_gecmisi):
    url = ""
    bearer_token = ""

    headers = {
        "Authorization": f"Bearer {bearer_token}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "openai/gpt-oss-20b",
        "messages": konusma_gecmisi,
        "temperature": 0,
        "max_tokens": 2000
    }
    try:
        response = requests.post(url, headers=headers, data=json.dumps(data), timeout=120)
        if response.status_code == 200:
            response_json = response.json()
            cevap = response_json['choices'][0]['message']['content']
            return cevap
        else:
            return f"Hata Kodu: {response.status_code}\n Hata Mesajı: {response.text}"
    except requests.exceptions.Timeout:
        return "Sunucudan cevap alınamadı, istek zaman aşımına uğradı."
    except requests.exceptions.RequestException as e:
        return f"Bir bağlantı hatası oluştu: {e}"

# --- FLASK WEB SUNUCUSU BÖLÜMÜ ---
# Bu bölüm, React uygulamasından gelen istekleri dinler.
app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    konusma_gecmisi = data.get('history')

    if not konusma_gecmisi:
        return jsonify({"error": "Konuşma geçmişi bulunamadı"}), 400

    bot_response = llm_e_sor(konusma_gecmisi)
    return jsonify({"response": bot_response})

# --- Bağlanma bölümü ---
# Bu if bloğu, programın bir web sunucusu olarak başlaması için yazdım.
if __name__ == '__main__':
    app.run(port=5000, debug=True)
