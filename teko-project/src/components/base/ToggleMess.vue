<template>
    <div id="snackbar"></div>
</template>
<script>
export default {
    name: 'ToggleMess', 
    props: ['Alert'],
    mounted(){
        /**
         * Thông báo cho người dùng
         * Created by: TXTrinh (16/03/2021)
        */
        const x = document.getElementById("snackbar");
        x.innerHTML = this.Alert.Text;
        if(this.Alert.Success == false) x.className = "showError";
        else x.className = "showCorrect";
        setTimeout(() => {
            x.className = x.className.replace("showCorrect", "");
            x.className = x.className.replace("showError", "");
        }, 2000);
        if(this.Alert.Success == true) {
            setTimeout(() => {this.$emit('reloadData')}, 0);
        }
    }
}
</script>
<style scoped>
#snackbar {
    visibility: hidden;
    min-width: 250px;
    max-width: 400px;
    margin-left: -125px;
    background-color: rgba(0, 148, 7, 0.753);
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 5;
    right: 2%;
    top: 40px;
    font-size: 18px;
}
#snackbar::after {
    content: "";
    position: absolute;
    right: -29px;
    top: 15px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 29px solid rgba(0, 148, 7, 0.753);
    border-bottom: 10px solid transparent;
}
#snackbar.showCorrect {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
#snackbar.showError{
    background-color: #cf0000;
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
#snackbar.showError::after{
    border-left: 29px solid #cf0000;
}
  
</style>