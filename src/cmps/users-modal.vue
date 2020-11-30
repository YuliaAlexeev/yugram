<template>
    <div class="screen" >
        <div class="screen-box" >
            <div class="screen-box-top">
                <slot class="screen-box-top-title" name="title"></slot>
                
                <slot name="button" class="close-btn">
                </slot>
            </div>
            <div class="screen-box-bottom">
                <slot name="users"></slot>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    //data() {
        // return {
        //     isShownModal: false,
        // };
    //},
    //   methods:{
    //     closeModal(){
    //         this.isShownModal = null;
    //     },
    //   }
}
</script>