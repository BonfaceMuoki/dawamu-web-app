<template lang="">
    <div class="grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 ">
        <div class="hidden sm:block col-span-1 h-screen flex flex-1 justify-center items-center w-full bg-green-300" 
       
        >
                <div class="w-full h-screen text-center  flex flex-col justify-center items-center text-white px-4">
                    <div class="w-[500px] flex flex-col justify-center items-center">
                        <img src="/logo.png" width="300" height="300" />
                        <h1 class="text-5xl font-semibold mb-4 txt-bold ">Welcome to Dawamu Leadership School.</h1> 
                    </div>
                                     
                </div>
        </div>

        <div class="col-span-1 h-screen">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>