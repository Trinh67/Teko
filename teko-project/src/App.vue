<template>
  <div id="app">
    <ProductList 
      @showPopup="showPopupUpdate"
      @hanldeAlertErrSubmit="handleAlert"
      :ProListColors="Colors"
    />
    <Popup 
      @closePopup="closePopupUpdate"
      @hanldeAlertUpdate="handleAlert"
      v-if="isUpdate"
      :PopupInfo='PopupUpdateInfo'
      :PopupColors="ListColors"
    />
    <ToggleMess 
      v-if='isToggleMess'
      :Alert='Alert'
    />
  </div>
</template>

<script>
import ProductList from './views/ProductList.vue';
import Popup from './components/base/Popup.vue';
import ToggleMess from './components/base/ToggleMess.vue';
import colorServices from './services/colorServices'

export default ({
  name: 'App',
  data() {
    return {
      /**
       * Biến Alert
       * Create by: TXTrinh (13/06/2021)
       */
      isToggleMess: false,
      Alert: {Text: "Teko-project", Success: true},
      /**
       * Biến Popup
       * Create by: TXTrinh (13/06/2021)
       */
      isUpdate: false,
      PopupUpdateInfo: [],
      /**
       * Tùy biến màu sắc
       * Create by: TXTrinh (13/06/2021)
       */
      Colors: [],
      ListColors: {}
    }
  },
  components: {
    ProductList,
    Popup,
    ToggleMess,
  },
  methods: {
    /**
     * Tạo giá trị cho mảng hiển thị màu sắc
     * Create by: TXTrinh (13/06/2021)
     */
    errorColorList(){
      var ListColors = {};
      this.Colors.map(function (Color){
        ListColors[Color.id] = Color.name;
      })
      this.ListColors = ListColors;
    },
    /**
     * Mở Popup Update
     * Create by: TXTrinh (13/06/2021)
     */
    showPopupUpdate(UpdateInfo){
      this.PopupUpdateInfo = UpdateInfo;
      this.isUpdate = true;
    },
    /**
     * Đóng Popup
     * Create by: TXTrinh (13/06/2021)
     */
    closePopupUpdate(){
      this.isUpdate = false;
    },
    /**
     * Tạo ToggleMess
     * Create by: TXTrinh (13/06/2021)
     */
    handleAlert(Alert){
      this.isToggleMess = true;
      this.Alert = Alert;
      setTimeout(() => {
        this.isToggleMess = false
      }, 2500)
    },
  },
  /**
     * Load dữ liệu ban đầu
     * Create by: TXTrinh (13/06/2021)
     */
    async mounted(){
        this.Colors = await colorServices.getColors();
        this.errorColorList();
    }
});
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
<style>
@import "./styles/index.css";
</style>
