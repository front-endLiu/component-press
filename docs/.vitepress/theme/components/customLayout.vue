<script setup>
import { ref, onMounted } from 'vue';
import DefaultTheme from 'vitepress/theme';
import ParticleLine from '../utils/particleLine.js';

const { Layout } = DefaultTheme;
const canvas = ref(null);
onMounted(() => {
  new ParticleLine(canvas.value, { hoverEffect: true });
});
</script>

<template>
  <div class="custom-container">
    <canvas ref="canvas"></canvas>
    <Layout></Layout>
  </div>
</template>
