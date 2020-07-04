import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api.js";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      if (response.status === 200) {
        setProjects(response.data);
      }
      console.log("Load projects");
      projects.map(project => console.log(project));
    });
  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    console.log(`Like project: ${id}`);
    const response = await api.post(`repositories/${id}/like`);

    if (response.status === 200) {
      const index = projects.findIndex(project => 
        project.id === id
      );
      projects[index].likes = response.data.likes;

      setProjects([...projects]);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.background}>
        <Text style={styles.text}>Projetos</Text>
        <FlatList
          style={styles.container}
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <> 
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{project.title}</Text>

                <View style={styles.techsContainer}>
                  <>
                    {project.techs.map((tech) => {
                      return (
                        <Text key={tech} style={styles.tech}>
                          {tech}
                        </Text>
                      );
                    })}
                  </>
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${project.id}`}
                  >
                    {`${project.likes} ${project.likes <2 ? "curtida" : "curtidas"}`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(project.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${project.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        ></FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 8,
    alignSelf: "center",
    color: "#eef",
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
