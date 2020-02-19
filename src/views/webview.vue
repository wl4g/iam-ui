<template>
    <div class="">
      <div id="wrap">
        <iframe :src="url"  style="width: 100%; height: 100%"></iframe>
      </div>

    </div>
</template>

<script>
export default {
  name: 'webview',
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.querySelector("#wrap").style.height = (winHeight - 125) + "px"

    if(this.$route.meta.linkhref){
      this.url = this.$route.meta.linkhref
    }
  },
  activated(){

  },
  methods: {

  },
  watch: {
    '$route' (to, from) {
      if(to.meta.linkhref) {
        this.url = to.meta.linkhref
      }
    }
  }
};
</script>

<style>
  .video-h5 {
    height: 100%;
    overflow-y: auto;
  }
  .video-h5 .item {
    margin-bottom: 20px;
  }
  .video-h5 .text {
    margin-top: 10px;
    padding-left: 10px;
  }
  .video-h5 .nodata {
    padding-top: 12px;
    text-align: center;
  }
  .video-h5 .nodata-img {
    margin-bottom: 12px;
  }

  .video-h5 .item .video-player .vjs-poster {
    background-size: cover;
  }
  .video-h5 .item .video-player .vjs-big-play-button {
    margin-left: -35px;
    width: 70px;
    border-radius: 50%;
    box-sizing: border-box;
  }

  .video-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.4);
  }
  .video-mask-box {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -15px 0 0 -15px;
    width: 30px;
    height: 30px;
  }
  .video-mask-animation {
    -webkit-animation: rotation 2s infinite;
    animation: rotation 2s infinite;
  }
  .video-mask-shape {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }
  .video-mask-shape.shape1 {
    left: 0;
    background-color: #193b48;
    -webkit-animation: animation2shape1 0.5s ease 0s infinite alternate;
    animation: animation2shape1 0.5s ease 0s infinite alternate;
  }
  .video-mask-shape.shape2 {
    right: 0;
    background-color: #19a68c;
    -webkit-animation: animation2shape2 0.5s ease 0s infinite alternate;
    animation: animation2shape2 0.5s ease 0s infinite alternate;
  }
  .video-mask-shape.shape3 {
    bottom: 0;
    background-color: #fda543;
    -webkit-animation: animation2shape3 0.5s ease 0s infinite alternate;
    animation: animation2shape3 0.5s ease 0s infinite alternate;
  }
  .video-mask-shape.shape4 {
    bottom: 0;
    right: 0;
    background-color: #f63d3a;
    -webkit-animation: animation2shape4 0.5s ease 0s infinite alternate;
    animation: animation2shape4 0.5s ease 0s infinite alternate;
  }
  @-webkit-keyframes animation2shape4 {
    from {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    to {
      -webkit-transform: translate(-20px, -20px);
      transform: translate(-20px, -20px);
    }
  }

  @keyframes animation2shape4 {
    from {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    to {
      -webkit-transform: translate(-20px, -20px);
      transform: translate(-20px, -20px);
    }
  }
  @-webkit-keyframes animation2shape3 {
    from {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    to {
      -webkit-transform: translate(20px, -20px);
      transform: translate(20px, -20px);
    }
  }

  @keyframes animation2shape3 {
    from {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    to {
      -webkit-transform: translate(20px, -20px);
      transform: translate(20px, -20px);
    }
  }
  @-webkit-keyframes animation2shape2 {
    from {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    to {
      -webkit-transform: translate(-20px, 20px);
      transform: translate(-20px, 20px);
    }
  }

  @keyframes animation2shape2 {
    from {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    to {
      -webkit-transform: translate(-20px, 20px);
      transform: translate(-20px, 20px);
    }
  }
  @-webkit-keyframes animation2shape1 {
    from {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    to {
      -webkit-transform: translate(20px, 20px);
      transform: translate(20px, 20px);
    }
  }

  @keyframes animation2shape1 {
    from {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    to {
      -webkit-transform: translate(20px, 20px);
      transform: translate(20px, 20px);
    }
  }
  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
