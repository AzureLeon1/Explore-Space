<template>
  <div style="width: 230px; text-align: left">
    &nbsp;&nbsp;&nbsp;&nbsp;
    <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px;">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
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
        <span slot="title"><a-icon type="global" /><span>Model</span></span>
        <a-menu-item key="1">Earth</a-menu-item>
        <a-menu-item key="2">Earth-Moon System</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="desktop" /><span>Real-Time Monitoring</span></span>
        <a-menu-item key="3">Typhoon</a-menu-item>
        <a-menu-item key="4">Earthquake</a-menu-item>
        <a-menu-item key="5">Flight</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="bar-chart" /><span>Data Visualization</span></span>
        <a-menu-item key="6">Population</a-menu-item>
        <a-menu-item key="7">Top 500 Universities</a-menu-item>
        <a-menu-item key="8">Import and export</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="about">
        <a-icon type="info-circle" />
        <span>About</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "Navi",
  data () {
    return {
      collapsed: true,
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    handleClick(e) {
      // console.log(e);
      console.log(e.key)
      switch(e.key) {
        case '1':
          this.$router.push({
            name: 'cesiumContainer'
          })
          break
        case '6':
          console.log("test");
          this.$router.push({
            name: 'Population'
          })
      }
    }
  },
}
</script>
