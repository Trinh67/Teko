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
          <div class="dialog-header-title">Xóa dữ liệu</div>
          <div class="dialog-header-close">
            <div 
              v-on:click="btnCancelOnClick" class="btn-toolbar-icon icon-cancel">
            </div>
          </div>
        </div>
      <!-- Dialog Body -->
        <div class="dialog-body">
            <div class="icon-warn"></div>
            <div id="title-warn">
                Bạn có chắc chắn muốn xóa <strong>{{ PopupDelInfo.content }}</strong> khỏi
                danh sách hàng hóa?
            </div>
        </div>
      <!-- Dialog Footer -->
        <div class="dialog-footer">
          <button 
            id="btnDelete" 
            class="m-btn m-btn-default"
          >
            <div class="btn-toolbar-icon icon-delete"></div>
            <span 
              class="btn-text" 
              v-on:click="deleteAction"
            >
            Xóa
            </span>
          </button>
          <button 
            id="btnCancel" 
            class="m-btn m-btn-default m-btn-cancel" 
            v-on:click="btnCancelOnClick"
          >
            <div class="btn-toolbar-icon icon-cancel"></div>
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productServices from '../../service/productService'
import { EventBus } from '../../even-bus/EventBus.js'
export default {
  name: "PopupDel",
  props: ['PopupDelInfo'],
  data() {
    return {
        Alert: {
            Text: "Xóa thất bại",
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
        this.$emit('closePopupDel', true);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xóa hàng hóa
     */
    async deleteAction(){
      try {
        const code = await productServices.deleteProduct(this.PopupDelInfo.ListProDelete);
        if(code == 200){
          this.Alert.Success = true;
          this.Alert.Text = "Xóa hàng hóa thành công!"
        }
        this.$emit("hanldeAlertDel", this.Alert);
        this.$emit('closePopupDel', true);
        EventBus.$emit('reloadData');
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
.m-dialog {
  z-index: 3 !important;
}
.dialog-content{
  z-index: 4;
}
.dialog-header {
  position: relative;
  height: 45px;
  line-height: 60px;
  padding-bottom: 16px;
  padding-left: 16px;
  border-radius: 4px;
  display: flex;
  font-size: 20px;
  font-weight: bold;
  background-color: #e9ebee;
}
.dialog-header-title{
  padding-left: 8px;
}
.dialog-header-close {
  position: absolute;
  right: 16px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #a5a5a5;
  cursor: pointer;
  top: 16px;
  align-items: center;
  border: none;
  font-size: 30px;
  line-height: 24px;
}
.dialog-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.4;
  z-index: 3;
}

.dialog-content {
  position: fixed;
  border-radius: 5px;
  width: 600px;
  height: 200px;
  background-color: #fff;
  left: calc(50% - 300px);
  top: calc(50% - 300px);
}
.dialog-body {
  display: flex;
  height: 80px;
  padding: 0px 16px 16px 16px;
  font-size: 15px;
}
div.icon-warn{
  width: 90px;
  height: 80px;
  margin-top: 12px;
  background-image : url('../../assets/icons/iconfinder_ic_help_48px_3669173.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
#title-warn{
  padding: 24px 16px 16px 16px;
}
.dialog-footer {
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #e9ebee;
  border-radius: 0 0 5px 5px;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 24px;
  box-sizing: border-box;
  margin-top: 16px;
}
.dialog-footer button {
  height: 35px;
  width: auto;
  color: #2B3173;
  font-weight: bold;
  border-radius: 4px;
  font-size: 15px;
  padding-left: 0px!important;
  margin-right: 4px;
  margin-left: 4px!important;
  border: 1px solid #e9ebee;
}
#btnCancel:hover{
  border: 1px solid #2B3173;
  background-color: #ffffff;
}
#btnDelete{
  color: #ffffff;
  background-color: #e40303;
}
#btnDelete:hover{
  background-color: #ff1d1d;
}
.btn-toolbar-icon {
  width: 10px;
}
#btnCancel div{
  margin-left: 8px!important;
  padding-left: 4px!important;
}
</style>