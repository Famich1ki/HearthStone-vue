<template>
  <div id="app">
    <div class="background"></div>
    <div class="content">
      <SearchBar />
    </div>
  </div>
</template>

<script>
  import SearchBar from './components/SearchBar.vue';

  export default {
    components: {
      SearchBar,
    }
  }
</script>

<style scoped>
  #app {
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/background.jpg') no-repeat center center fixed;
    background-size: cover;
    z-index: -1;
  }

  .content {
    position: relative;
    padding-top: 100px; /* 留出顶端空间 */
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
