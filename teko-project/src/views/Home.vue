<template>
  <div class="content">
    <!-- Content -->
    <div
        class="grid grid-product"
    >
        <table
            id="tbListData"
        >
        <caption>Jason - Re - upload Error Products</caption>
        <button
            title="Gửi"
            id="btn-submit"
            class="m-btn"
            @click="btnSubmitOnClick"
        >
            <div class="m-btn-submit btn-toolbar-icon"></div>Submit
        </button>
        <thead>
          <tr class="table__row">
            <th
              id="productId"
            >
              <div class="">ID</div>              
            </th>
            <th
              id="errorDescription"
            >
              <div class="">Error Description</div>              
            </th>
            <th
                id="productImage"
            >
                <div class="">Product Image</div>              
            </th>
            <th
                id="productName"
            >
                <div class="">Product Name</div>
            </th>
            <th
                id="productSku"
            >
                <div class="">SKU</div>              
            </th>
            <th
                id="productColor"
            >
              <div class="">Color</div>
            </th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr
            class="table__row"
            v-for="Product in Products"
            :key="Product.id"
            :id="Product.id"
          >
            <td>
                <label>{{ Product.id }}</label>
            </td>
            <td>
                <label>{{ Product.errorDescription }}</label>
            </td>
            <td>
                <img :src="Product.image" style="width:30%;" alt="image"/>
            </td>
            <td>
                <input
                  type="text"
                  v-model="Product.name"
                  @blur="validate('productName')"
                />
            </td>
            <td>
                <input
                  type="text"
                  v-model="Product.sku"
                  @blur="validate('productSku')"
                />
            </td>
            <td>
              <select class="input-color"
                v-model="Product.color"
              >
                <option :value="null" disabled hidden class="null-value">Select Value</option>
                <option 
                v-for="Color in Colors"
                :key="Color.id"
                :id="Color.id" 
                :value='Color.id'> {{Color.name}} 
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- End Content -->
    <!-- Content footer -->
    <Paging 
        :PagingValue="PagingValue"
    />
    <!-- End Content Footer -->
  </div>
</template>

<script>
import '../styles/pages/home.css';
import Paging from '../components/base/Paging.vue'
import productServices from '../services/productServices'
import colorServices from '../services/colorServices'
export default {
    name: "Home",
    components: {
        Paging,
    },
    data() {
         return {
            /**
             * Dữ liệu sản phẩm
             * Create by: TXTrinh (12/06/2021)
             */
            Products:[],
            /**
             * Dữ liệu màu sắc
             * Create by: TXTrinh (12/06/2021)
             */
            Colors:[],
            /**
             * Dữ liệu phân trang
             * Create by: TXTrinh (12/06/2021)
             */
            PagingValue: {
                productDataLength: 100,
                startPoint: 0,
                totalPage: 3,
                startListProduct: 1,
                finishListProduct: 15,
                currentPage: 1,
                number: 10
            },
        }
    },
    methods: {
        btnSubmitOnClick(){
            alert("Submit on click");
        }
    },

    /**
     * Load dữ liệu ban đầu
     * Create by: TXTrinh (12/06/2021)
     */
    async mounted(){
        this.Products = await productServices.getProducts();
        this.Colors = await colorServices.getColors();
    }
}
 
</script>

<style scoped>
#productId {
    min-width: 2vw;
}
#errorDescription{
    min-width: 15vw;
}
#productImage{
  min-width: 20vw;
}
#productName{
  min-width: 25vw;
}
#productSku{
    min-width: 10vw;
}
#productColor{
    min-width: 11vw;
}

#btn-submit{
    display: flex;
    position: absolute;
    z-index: 1;
    right: 8px;
    top: 4px;
    font-size: 14px;
    border-radius: 8px;
}

</style>