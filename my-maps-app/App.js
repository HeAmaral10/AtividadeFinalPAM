// App.js
// Aplicativo simples de mapas com busca de endereços usando Google Maps Geocoding API.
// O usuário digita um local, o app centraliza o mapa nessa localização
// e posiciona um marcador no ponto encontrado.

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '@env'; // API Key vinda do arquivo .env

export default function App() {
  // Referência para o componente de mapa, permite animar a região
  const mapRef = useRef(null);

  // Texto digitado no campo de busca
  const [searchText, setSearchText] = useState('');

  // Região exibida no mapa (inicialmente São Paulo)
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  /**
   * handleSearch
   * Função responsável por buscar a localização digitada pelo usuário
   * usando a Google Geocoding API e centralizar o mapa nesse ponto.
   */
  async function handleSearch() {
    // Evita requisição se o campo estiver vazio
    if (!searchText.trim()) return;

    try {
      // Codifica o endereço para uso na URL
      const encodedAddress = encodeURIComponent(searchText.trim());

      // Monta a URL da requisição à Geocoding API
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      // Verifica se a resposta foi bem-sucedida e se existe ao menos um resultado
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;

        // Define uma nova região em torno da coordenada encontrada
        const newRegion = {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

        // Atualiza o estado da região
        setRegion(newRegion);

        // Anima suavemente o mapa até a nova região, se a referência existir
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
      } else {
        // Caso o endereço não seja encontrado
        console.log('Local não encontrado');
      }
    } catch (error) {
      // Tratamento de erro em caso de falha na requisição
      console.log('Erro ao buscar localização:', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Área de busca: campo de texto + botão */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar local (ex: São Paulo)"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={handleSearch} // permite buscar ao apertar Enter
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Mapa ocupando a área segura abaixo da barra de status */}
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
        >
          {/* Marcador na região atual do mapa */}
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Local atual"
            description="Centralizado pela busca ou padrão (São Paulo)"
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

// Estilos da aplicação
const styles = StyleSheet.create({
  // Garante que o conteúdo respeita a área segura (status bar, notch etc.)
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Container principal
  container: {
    flex: 1,
  },
  // Container da área de busca (campo + botão)
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 8,
    zIndex: 1, // mantém a barra de busca acima do mapa
  },
  // Estilos do campo de texto
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  // Botão de busca
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  // Texto interno do botão
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Mapa ocupa todo o espaço restante da tela
  map: {
    flex: 1,
  },
});
