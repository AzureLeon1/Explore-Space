<template>
  <div style="width: 230px; text-align: left">
    &nbsp;&nbsp;&nbsp;&nbsp;
    <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px;">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"/>
    </a-button>
    <a-menu
      :defaultSelectedKeys="[]"
      :defaultOpenKeys="[]"
      mode="inline"
      theme="light"
      :inlineCollapsed="collapsed"
      @click="handleClick"
    >
      <a-sub-menu key="sub1">
        <span slot="title">
          <a-icon type="global"/>
          <span>Model</span>
        </span>
        <a-menu-item key="1">Earth</a-menu-item>
        <a-menu-item key="2">Earth-Moon System</a-menu-item>
        <a-menu-item key="3">Planet with Rings</a-menu-item>
        <a-menu-item key="10">Solar</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title">
          <a-icon type="desktop"/>
          <span>Real-Time Monitoring</span>
        </span>
        <a-menu-item key="4">Typhoon</a-menu-item>
        <a-menu-item key="5">Earthquake</a-menu-item>
        <a-menu-item key="6">Flight</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title">
          <a-icon type="bar-chart"/>
          <span>Data Visualization</span>
        </span>
        <a-menu-item key="7">Population</a-menu-item>
        <a-menu-item key="8">Top 500 Universities</a-menu-item>
        <a-menu-item key="9">Import and Export</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="about">
        <a-icon type="info-circle"/>
        <span>About</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "Navi",
  data() {
    return {
      collapsed: true
    };
  },
  watch: {
    '$route'() {
      console.log(this.$route.name);
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    handleClick(e) {
      switch (e.key) {
        case "1":
          this.$router.push({
            name: "Earth"
          });
          break;
        case "2":
          this.$router.push({
            name: "EmSystem"
          });
          break;
        case "3":
          this.$router.push({
            name: "PlanetWithRing"
          });
          break;
        case "4":
          this.$router.push({
            name: "PlanetWithRing"
          });
          break;
        case "5":
          this.$router.push({
            name: "PlanetWithRing"
          });
          break;
        case "6":
          this.$router.push({
            name: "PlanetWithRing"
          });
          break;
        case "7":
          console.log("test");
          this.$router.push({
            name: "Population"
          });
          break;
        case "8":
          this.$router.push({
            name: "University"
          });
          break;
        case "9":
          this.$router.push({
            name: "ImportExport"
          });
          break;
        case '10':
          this.$router.push({
            name: "Solar"
          })
      }
    }
  }
};
</script>
