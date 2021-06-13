<template>
  <div>
    <!-- Dialog -->
    <div
      class="m-dialog dialog-detail"
      title="Popup"
    >
      <div class="dialog-modal"></div>
      <!-- Dialog Content -->
      <div class="dialog-content">
      <!-- Dialog Header -->
        <div class="dialog-header">
          <div class="dialog-header-title">Re - upload Error Products</div>
          <div class="dialog-header-close">
            <div 
              v-on:click="btnCancelOnClick" class="icon-cancel">
            </div>
          </div>
        </div>
      <!-- Dialog Body -->
        <div class="dialog-body">
            <div class="product-list"
              v-for="Product in PopupInfo"
              :key="Product.id"
              :id="Product.id"
            >
              <div class="product-item">
                <div class="product-image">
                  <img :src="Product.image" alt="image"/>
                </div>
                <div class="product-info">
                  <span class="product-name">{{Product.name}}</span>
                  <span class="row">
                    <p class="row-title">ID: </p>
                    <p class="product-value">{{Product.id}}</p>
                  </span>
                  <span class="row">
                    <p class="row-title">SKU: </p>
                    <p class="product-value product-sku">{{Product.sku}}</p>
                  </span>
                  <span class="row">
                    <p class="row-title">Color: </p>
                    <p class="product-value">{{PopupColors[Product.color]}}</p>
                  </span>
                </div>
              </div>
            </div>
        </div>
      <!-- Dialog Footer -->
        <div class="dialog-footer">
          <button 
            id="btnSubmit" 
            class="m-btn"
            v-on:click="updateAction"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../styles/pages/popups/popup.css"
export default {
  name: "Popup",
  props: ['PopupInfo', 'PopupColors'],
  data() {
    return {
        Alert: {
            Text: "Update products failed!",
            Success: false,
        },
    }
  },
  methods: {
    /**
     * Đóng dialog
     * Created By: TXTrinh (16/03/2021)
     */
    btnCancelOnClick() {
      try {
        this.$emit('closePopup');
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xóa hàng hóa
     */
    updateAction(){
      try {
        this.Alert.Success = true;
        this.Alert.Text = "Update products sucessful!";

        this.$emit("hanldeAlertUpdate", this.Alert);
        this.$emit('closePopup');
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
.product-list{
  width: 94%;
  height: 140px;
  margin-left: 3%;
  margin-top: 8px;
}
.product-item{
  display: flex;
  width: 100%;
  height: 140px;
  border-bottom: 1px solid #ccc;
}
.product-item .product-image{
  width: 25%;
  height: 100%;
}
.product-image img{
  width: 90%;
  margin-left: 5%;
}
.product-item .product-info{
  width: 75%;
  height: 80%;
  padding: 8px;
  font-size: 16px;
}
.product-item .product-info .product-name{
  font-size: 18px;
}
.row{
  display: flex;
  height: 24px;
}
.row .row-title{
  color: #6d6d6d;
}
.row .product-value{
  padding-left: 8px;
}
.row .product-sku{
  color: #f70000;
}
</style>