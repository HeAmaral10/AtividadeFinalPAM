# 📍 My Maps App

Aplicativo desenvolvido para a disciplina **Programação para Dispositivos Móveis (PAM)**.
O objetivo é exibir um mapa no dispositivo móvel, permitir a busca de uma localização pelo nome e centralizar o mapa automaticamente no ponto encontrado, utilizando a **Google Geocoding API**.

---

## 🎯 Funcionalidades

* Exibição de mapa utilizando **react-native-maps**
* Campo de busca para localizar cidades, ruas ou pontos turísticos
* Centralização automática do mapa na localização pesquisada
* Marcador indicando o ponto encontrado
* Uso de **SafeAreaView** para não sobrepor a barra de status
* Armazenamento seguro da API Key em arquivo `.env`

---

## 🛠️ Tecnologias Utilizadas

* **React Native**
* **Expo**
* **React Native Maps**
* **Google Geocoding API**
* **react-native-safe-area-context**
* **react-native-dotenv**

---

## 📂 Estrutura do Projeto

```
my-maps-app/
├── App.js
├── babel.config.js
├── package.json
├── .env
└── README.md
```

---

## 🔐 Arquivo `.env`

Crie na raiz do projeto:

```
GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
```

---

## ▶️ Como Executar o Projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o Expo:

```bash
npx expo start
```

3. Abra o app no celular usando o **Expo Go**.

---

## 📱 Como Usar

1. Abra o aplicativo
2. Digite o nome de um local no campo de busca
3. Toque em **Buscar**
4. O mapa será centralizado na localização correspondente
5. Um marcador será exibido no ponto encontrado

---

## 👤 Autor(a)

Projeto desenvolvido para fins acadêmicos na disciplina de **Programação para Dispositivos Móveis (PAM)**.

---
