<template>
    <div class="paging-bar">
      <div class="paging-option">
        <div class="btn-select-page m-btn-firstpage" @click="FirstPageNumber"></div>
        <div class="btn-select-page m-btn-prev-page" @click="DecreasePageNumber"></div>
        <div class="m-btn-list-page">
          Trang 
          <input 
            type="number" 
            v-model="PagingValue.currentPage"
            id="current-page"
            @change="SetCurrentPage()"
            style="margin: 4px; height: 32px"
          />
           trên {{PagingValue.totalPage}}
        </div>
        <div class="btn-select-page m-btn-next-page" @click="IncreasePageNumber"></div>
        <div class="btn-select-page m-btn-lastpage" @click="LastPageNumber"></div>
      </div>
      <div class="paging-record-option">
        <select v-model="Paging.number" @change="SetValuePaging" class="input-number-record">
          <option :value='15'>15</option>
          <option :value='25'>25</option>
          <option :value='50'>50</option>
          <option :value='100'>100</option>
        </select>
      </div>
      <div class="paging-record-info">Hiển thị {{PagingValue.startListProduct}} - {{PagingValue.finishListProduct}} trên {{PagingValue.productDataLength}} kết quả</div>
    </div>
</template>
<script>
export default {
  name: "Pagination",
  data() {
    return {
        Paging: this.PagingValue,
    };
  },
  props: ["PagingValue"],
  methods: {
    /**
     * Load lại dữ liệu
     */
    reloadData(){
      try {
        this.$emit('reloadProList');
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Lọc dữ liệu khi nhập số page vào ô Input
     * Create By: TXTrinh (12/06/2021)
     */
    SetCurrentPage(){
      try {
        this.Paging.startPoint = this.Paging.currentPage - 1;
        console.log(this.Paging.startPoint);
        this.SetValuePaging();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Các hàm thay đổi startPoint để phân trang
     * Create By: TXTrinh (12/06/2021)
     */
    // Previous Page
    DecreasePageNumber(){
      try {
        if(this.Paging.startPoint == 0) return;
        this.Paging.startPoint--;
        this.SetValuePaging();
      } catch (error) {
        console.log(error);
      }
    },
    // First Page
    FirstPageNumber(){
      try {
        if(this.Paging.startPoint == 0) return;
        this.Paging.startPoint = 0;
        this.SetValuePaging();
      } catch (error) {
        console.log(error);
      }
    },
    // Next Page
    IncreasePageNumber(){
      try {
        if((this.Paging.startPoint + 1 == this.Paging.totalPage)) return;
        this.Paging.startPoint++;
        this.SetValuePaging();
      } catch (error) {
        console.log(error);
      }
    },
    // Last Page
    LastPageNumber(){
      try {
        if(this.Paging.startPoint + 1 == parseInt(this.Paging.productDataLength/this.Paging.number)) return;
        this.Paging.startPoint = parseInt(this.Paging.productDataLength/this.Paging.number);
        if(this.Paging.startPoint*this.Paging.number == this.Paging.productDataLength) this.Paging.startPoint--;
        this.SetValuePaging();
      } catch (error) {
        console.log(error);
      }
    },
    // SetValuePaging when change
    SetValuePaging(){
        this.Paging.totalPage = Math.ceil(this.Paging.productDataLength/this.Paging.number);
        if(this.Paging.currentPage > this.Paging.totalPage) this.Paging.startPoint = 0;
        this.Paging.startListProduct = this.Paging.number*this.Paging.startPoint + 1;
        if(this.Paging.number*(this.Paging.startPoint + 1) >= this.Paging.productDataLength) this.Paging.finishListProduct = this.Paging.productDataLength;
        else this.Paging.finishListProduct = this.Paging.number*(this.Paging.startPoint + 1);
        this.Paging.currentPage = this.Paging.startPoint + 1;
        this.$emit('reloadProList');
    }
  },
    
}
</script>