<template>
    <div style="min-height: 100px;min-width: 100px; background-image: url(img/theme/food.jpg); background-size: cover; background-position: center top;" >
       
      <br> <br> <br> <br>
      
  <template>
  <section>
    <div class="mb-7">
      <mdb-row class="mb-4">
            <mdb-col>                             
                 <div style="min-height: 450px;min-width: 400px;">
                     <div style="font-size:50px;color:black;opacity:0.7;text-align:center;font-family:serif">BEAT THE HUNGER</div> 
                     <h1 style="color:black;opacity:0.7;text-align:center;font-family:georgia">"We know that a peaceful world cannot exist one-third 
                        rich and two-thirds hungry."</h1>
                         <h2 style="color:black;opacity:0.7;text-align:right;font-family:georgia;margin-right:80px">-Jimmy Karter</h2>
    
                          <div class="text-center py-3">
                          <ul class="list-unstyled list-inline mb-0">
                            <li class="list-inline-item" v-if="!uid"> <router-link :to="{path:'/register'}" >
                            <a @click="start" class="btn  btn-rounded" style="background-color:#000000;color:white;">Get Started</a></router-link></li>
                          </ul>
                          </div>
                      
                    <!-- <br><br><br> -->
                         <carousel-3d >
                <slide :index="0" style="background-image: url(img/theme/k.jpg); background-size: cover; background-position: center top;opacity:0.7">
                
                </slide>
                <slide :index="1"  style="background-image: url(img/theme/l.jpg); background-size: cover; background-position: center top;opacity:0.7">
                    
                </slide>
                 <slide :index="2"  style="background-image: url(img/theme/10.jpeg); background-size: cover; background-position: center top;opacity:0.7">
                    
                </slide>
                <slide :index="3"  style="background-image: url(img/theme/45.jpg); background-size: cover; background-position: center top;opacity:0.7">
                    
                </slide>
                 <slide :index="4"  style="background-image: url(img/theme/e.jpg); background-size: cover; background-position: center top;opacity:0.7">
            
                </slide>
                </carousel-3d>


              

                 </div>  
                 
            </mdb-col>          
    </mdb-row>      
 </div>
 </section>
 </template>           
                   
   
    
    
  <mdb-footer color="stylish-color-dark" class="page-footer font-small pt-4 mt-4">

   
   
    <div class="text-center">
      <ul class="list-unstyled list-inline">
        <li class="list-inline-item"><a class="btn-floating  btn-fb mx-1"><i class="fab fa-facebook" style="color:#ffffff"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating  btn-tw mx-1"><i class="fab fa-twitter" style="color:#ffffff"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating  btn-gplus mx-1"><i class="fab fa-google-plus" style="color:#ffffff"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating  btn-li mx-1"><i class="fab fa-linkedin-in" style="color:#ffffff"> </i></a></li>
      
      </ul>
    </div>
   
    <div class="footer-copyright text-center py-3">
    
               
     
 </div> 
 </mdb-footer>
</div>

</template>



<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
export default{
    components:{
        Carousel3d,
        Slide
    }
}
</script>



<style scoped>


</style>


 


    


