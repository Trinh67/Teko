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
            v-for="Product in ProductList"
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
            <td class="product-name">
                <input
                  type="text"
                  v-model="Product.name"
                  @change="validate(Product.id ,Product.name, 'productName')"
                /><br/>
                <small 
                    id="error-name" class="error-msg"
                    :class="{isHide:isHideErrorName[Product.id]}"
                >{{ErrorName}}</small>
            </td>
            <td>
                <input
                  type="text"
                  v-model="Product.sku"
                  @change="validate(Product.id, Product.sku, 'productSKU')"
                /><br/>
                <small 
                    id="error-name" class="error-msg"
                    :class="{isHide:isHideErrorSKU[Product.id]}"
                >{{ErrorSKU}}</small>
            </td>
            <td>
              <select class="input-color"
                v-model="Product.color"
                @change="validate(Product.id, Product.color, 'productColor')"
              >
                <option :value="null" disabled hidden class="null-value">Select Value</option>
                <option 
                  v-for="Color in ProListColors"
                  :key="Color.id"
                  :id="Color.id" 
                  :value='Color.id'
                > {{Color.name}} 
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
        @changePagingValue="setPagingValue()"
    />
    <!-- End Content Footer -->
  </div>
</template>

<script>
import '../styles/pages/productList.css';
import Paging from '../components/base/Paging.vue'
import productServices from '../services/productServices'

export default {
    name: "ProductList",
    props: ['ProListColors'],
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
            ProductList: [],
            ProductUpdate: [],
            
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
            /**
             * Thông báo
             * Create by: TXTrinh (13/06/2021)
             */
            Alert: {
                Text: "No data has been updated yet!",
                Success: false,
            },
            ErrorName: null,
            ErrorSKU: null,
            isHideErrorName: {},
            isHideErrorSKU: {},
        }
    },
    methods: {
        /**
         * Tạo giá trị cho mảng hiển thị lỗi tên
         * Crate by: TXTrinh (13/06/2021)
         */
        errorNameList(){
          var ListName = {};
          var ListSKU = {};
          this.Products.map(function (Product){
            ListName[Product.id] = true;
            ListSKU[Product.id] = true;
          })
          this.isHideErrorName = ListName;
          this.isHideErrorSKU = ListSKU;
        },
        /**
         * Sự kiện nhấn Submit
         * Create by: TXTrinh (12/06/2021) 
         */
        btnSubmitOnClick(){
            try {
              if(this.validateData()){
                this.Alert.Success = false;
                this.Alert.Text = "Data Error!";
                this.$emit('hanldeAlertErrSubmit', this.Alert);
              }
              else if(this.ProductUpdate.length > 0)
              {
                this.$emit('showPopup', this.ProductUpdate);
              }
              else this.$emit('hanldeAlertErrSubmit', this.Alert);
            } catch (error) {
              console.log(error);
            }
        },

        /**
         * Hàm Validate định dạng dữ liệu nhập vào
         * Created by: TXTrinh (13/06/2021)
         *  */ 
        validate(id, value, type) {
          let index = this.Products.findIndex(x => x.id === id);
          var checkExist = this.ProductUpdate.findIndex(function(o){
              return o.id === id;
          })
          switch (type) {
            case 'productName':  
            // Validate Name:
            { 
                if((value == null) || (value.trim()=='') || (value.length > 50)) {
                    this.isHideErrorName[id] = false;
                    this.ErrorName = "* Product Name is required, max length 50 characters"
                }
                else {
                    this.isHideErrorName[id] = true;
                    if (checkExist !== -1) this.ProductUpdate.splice(checkExist, 1);
                    this.ProductUpdate.push(this.Products[index]);
                }
                break;
            }
            case 'productSKU': 
            // Validate SKU
            {
                if((value == null) || (value.trim()=='') || (value.length > 20)) {
                    this.isHideErrorSKU[id] = false;
                    this.ErrorSKU = "* SKU is required, max length 20 characters"
                }
                else {
                    this.isHideErrorSKU[id] = true;
                    if (checkExist !== -1) this.ProductUpdate.splice(checkExist, 1);
                    this.ProductUpdate.push(this.Products[index]);
                }
                break;
            }
            case 'productColor':
            // Validate Color
            {
                if (checkExist !== -1) this.ProductUpdate.splice(checkExist, 1);
                this.ProductUpdate.push(this.Products[index]);
                break;
            }
            default:
            { 
                break;
            }
          }
        },
        /**
         * Kiểm tra toàn bộ dữ liệu, true-lỗi; false-hợp lệ
         * Created by: TXTrinh (13/06/2021)
         */
        validateData(){
            let arrErrorName = Object.values(this.isHideErrorName);
            let checkErrorName = arrErrorName.includes(false);
            let arrErrorSKU = Object.values(this.isHideErrorSKU);
            let checkErrorSKU = arrErrorSKU.includes(false); 
            // nếu không có lỗi thì không hiện cảnh báo
            if(checkErrorName || checkErrorSKU)
                return true;
            return false;
        },
        /**
         * Phân trang 
         * Create by: TXTrinh (13/06/2021)
         */
        setPagingValue(){
          this.PagingValue.productDataLength = this.Products.length;

          this.PagingValue.totalPage = Math.ceil(this.PagingValue.productDataLength/this.PagingValue.number);
          if(this.PagingValue.currentPage > this.PagingValue.totalPage) this.PagingValue.startPoint = 0;
          this.PagingValue.startListProduct = this.PagingValue.number*this.PagingValue.startPoint;
          if(this.PagingValue.number*(this.PagingValue.startPoint + 1) >= this.PagingValue.productDataLength) this.PagingValue.finishListProduct = this.PagingValue.productDataLength;
          else this.PagingValue.finishListProduct = this.PagingValue.number*(this.PagingValue.startPoint + 1);
          this.PagingValue.currentPage = this.PagingValue.startPoint + 1;

          let ListProBegin = this.Products.slice(0, this.PagingValue.startListProduct);
          this.ProductList = this.Products.slice(this.PagingValue.startListProduct, this.PagingValue.finishListProduct);
          let ListProEnd = this.Products.slice(this.PagingValue.finishListProduct, this.PagingValue.productDataLength);

          this.Products = ListProBegin.concat(this.ProductList.concat(ListProEnd));
        }
    },

    /**
     * Load dữ liệu ban đầu
     * Create by: TXTrinh (12/06/2021)
     */
    async mounted(){
        this.Products = await productServices.getProducts();
        this.setPagingValue();
        this.errorNameList();
    }
};
</script>

<style scoped>
.isHide{
    display: none;
}
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
    border-radius: 6px;
}

</style>