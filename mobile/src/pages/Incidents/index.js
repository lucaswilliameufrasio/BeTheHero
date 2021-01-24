import React, { useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
} from "react-native";

import styles from "./styles";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";
import { RectButton } from "react-native-gesture-handler";

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, SetError] = useState(null);

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate("Detail", { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);
        try {
            const response = await api.get("incidents", {
                params: { page },
            });

            setIncidents([...incidents, ...response.data]);
            setTotal(response.headers["x-total-count"]);
            setPage(page + 1);
        } catch (error) {
            Alert.alert("Erro ao buscar dados...");
            SetError(error);
        }
        setLoading(false);
    }

    async function refreshIncidentsList() {
        setPage(0);
        setTotal(0);
        setIncidents([]);
        SetError(null);
        setRefreshing(true);
        await loadIncidents();
        setRefreshing(false);
    }

    async function reloadIncidentsList() {
        SetError(null);
        loadIncidents();
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia.
      </Text>

            {error ? (
                <View style={styles.errorContainer}>
                    <TouchableOpacity style={styles.errorButton} onPress={reloadIncidentsList}>
                        <Ionicons name="reload" size={16} color="#E02041" />
                        <Text style={styles.errorButtonText}>Recarregar</Text>
                    </TouchableOpacity>
                </View>
            ) :
                <FlatList
                    data={incidents}
                    style={styles.incidentList}
                    keyExtractor={(incident) => String(incident.id)}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing}
                    onRefresh={refreshIncidentsList}
                    onEndReached={loadIncidents}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item: incident }) => (
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.name}</Text>

                            <Text style={styles.incidentProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>

                            <Text style={styles.incidentProperty}>VALOR:</Text>
                            <Text style={styles.incidentValue}>
                                {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(incident.value)}
                            </Text>

                            <TouchableOpacity
                                style={styles.detailsButton}
                                onPress={() => navigateToDetail(incident)}
                                hitSlop={{ top: 18, left: 20, bottom: 18, right: 20 }}
                            >
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#E02041" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            }
        </View>
    );
}
