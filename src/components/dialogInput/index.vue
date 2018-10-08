<template>
    <div class="dialogInput">
        <span class="el-input__prefix">
            <i class="el-input__icon el-icon-search"></i>
        </span>
        <input v-model="value" class="input" readonly/>
        <!-- 用来实现删除，目前该组件太多地方使用，不建议加删除操作 -->
        <!-- <span class="el-input__suffix" @click.prevent.stop="handleClear">
            <i class="el-input__icon el-icon-circle-close"></i>
        </span> -->
    </div>
</template>

<script>
    export default {
        props: {
            val: String
        },
        watch: {
            val(e) {
                this.value = e;
            }
        },
        data() {
            return{
                value: ''
            }
        },
        methods: {
            handleClear() {
                this.value = '';
                this.$emit('changeName')
            }
        },
        created() {
            this.value = this.val;
        },
    }
</script>

<style scoped>
.dialogInput{
    position: relative;
    font-size: 12px;
    display: inline-block;
    width: 174px;
    height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
}
.dialogInput .input{
    background: transparent;
    border: 0;
    height: 40px;
    outline: none;
    /* padding: 30px; */
    width: 143px;
    position: absolute;
    left: 0;
    top: 0px;
    color: #666;
    font-size: 12px;
    padding-left: 30px;
}
.el-input__suffix{
    cursor: pointer;
    pointer-events: initial;
}
</style>