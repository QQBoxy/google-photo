<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const oauthUri = ref("");
const jsonStr = ref("");

async function handleGetPhotos() {
  console.log("handleGetPhotos");
  const response = await axios({
    method: 'get',
    url: "https://photoslibrary.googleapis.com/v1/albums",
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
  }).catch((error) => {
    console.log("error", error.response.data);
  });
  console.log("response", response.data);
  jsonStr.value = JSON.stringify(response.data, null, 2);
}

onMounted(() => {
  oauthUri.value = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/photoslibrary&include_granted_scopes=true&response_type=token&state=done&redirect_uri=${location.origin}${location.pathname}&client_id=764000446997-oh1jnp47hbkgllc5280rjevgedlhvvdc.apps.googleusercontent.com`;
});
</script>

<template>
  Step 1: <a :href="oauthUri">OAuth 2.0</a><br />
  <br />
  Step 2: <button v-on:click="handleGetPhotos">Get Photos</button>
  <br />
  <br />
  <textarea v-model="jsonStr" rows="20" cols="100"></textarea>
</template>

<style></style>