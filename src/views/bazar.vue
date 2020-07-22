<template>
    <div  >
        <br><br><br>
        
        <div class="col-xl-12 order-xl-1" >
                   
                    <card shadow type="secondary">
                        <h2 style="text-align:center;background-color:#03254c;color:white;">
                           REDEEM YOUR COINS   
                        </h2>
                        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                          style="min-height: 300px; background-image: url(img/theme/mart.jpg);opacity:0.9; 
                          background-size: cover; background-position: center top;margin-bottom:50px;margin-top:0px;border-radius:5px">
                                
                    
                                <div class="container-fluid d-flex align-items-center" style="min-height:325px;
                                        background-size: cover; background-position: center top;opacity:0.9">
                                    <div class="row" >
                                        
                                        <div class="col-lg-7 col-md-10"  >
                                            <!-- <h4 class="display-4 text-white">Create your Event</h4>
                                            <p class="text-white mt-0 mb-5">Organise your event . You can create your event here</p> -->
                                        </div>
                                    </div>
                                </div>
                     </base-header>
                    </card>
        </div>
        
        
        <div class="col-xl-12 order-xl-1" >
             <br>
             <div style="margin-left:1000px;padding-top:5px;padding-bottom:1px;padding-left:5px">
                
             </div>
             <br>
            <div class="row" >
        
                  
                <div class="col-xl-12 order-xl-1">
                     
                    <card shadow type="secondary" >
                         <div style="background-color:#43464b;color:white;margin-left:900px;padding-top:5px;padding-left:5px;margin-right:50px;border-radius:15px">
                                                CURRENT BALANCE : {{coins}}
                                                <i class="fas fa-coins"></i>
                         </div> 
                         <br>
                        <div class="row">
                            <div class="col-xl-4 order-xl-1">
                            <card shadow type="secondary" >
                              <img src=img/theme/q.jpg style="max-height:300px;max-width:300px;border-radius:15px">
                              <h2 style="margin-top:5px">TEA LEAVES-5kg</h2>
                               <div class="row">
                                        <div style="max-width:100px;margin-top:15px">                                
                                            <base-button btn-small block type="" style="background-color:#43464b;color:white;margin-left:20px"  @click="mode">
                                                <i class="fa fa-shopping-cart" aria-hidden="true"></i> BUY
                                            </base-button>                               
                                        </div>
                                        <i class="fas fa-coins fa-2x"  style="margin-left:100px;margin-top:20px"></i>
                                        <h2 style="margin-left:15px;margin-top:20px">100</h2>
                                </div>
                           </card>
                            </div>

                            <div class="col-xl-4 order-xl-1">
                           <card shadow type="secondary" >
                              <img src=img/theme/t.jpg style="max-height:300px;max-width:300px;border-radius:15px">
                               <h2 style="margin-top:5px">BREAD-10 LOAVES</h2>
                                <div class="row">
                                        <div style="max-width:100px;margin-top:15px">                                
                                            <base-button btn-small block type="" style="background-color:#43464b;color:white;margin-left:20px"  @click="mode">
                                                <i class="fa fa-shopping-cart" aria-hidden="true"></i> BUY
                                            </base-button>                               
                                        </div>
                                        <i class="fas fa-coins fa-2x"  style="margin-left:100px;margin-top:20px"></i>
                                        <h2 style="margin-left:15px;margin-top:20px">100</h2>
                                </div>
                           </card>
                            </div>

                            <div class="col-xl-4 order-xl-1">
                           <card shadow type="secondary" >
                               <img src=img/theme/r.jpg style="max-height:300px;max-width:300px;border-radius:15px">
                               <h2 style="margin-top:5px">BROWN SUGAR-5 kgs</h2>
                                <div class="row">
                                        <div style="max-width:100px;margin-top:15px">                                
                                            <base-button btn-small block type="" style="background-color:#43464b;color:white;margin-left:20px"  @click="mode">
                                                <i class="fa fa-shopping-cart" aria-hidden="true"></i> BUY
                                            </base-button>                               
                                        </div>
                                        <i class="fas fa-coins fa-2x"  style="margin-left:100px;margin-top:20px"></i>
                                        <h2 style="margin-left:15px;margin-top:20px">100</h2>
                                </div>
                           </card>
                            </div>
                        </div>
                    </card>
                    <br>
                        <div class="col-md-3">
                        <base-button btn-small block type="" style="background-color:#43464b;color:white" class=" mb-3" @click="mode">
                            PLACE ORDER
                        </base-button>
                        </div>
                       
                
                      
                </div>
            </div>
        </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
<script>
// import Loading from 'vue-loading-overlay';
//     // Import stylesheet
// import 'vue-loading-overlay/dist/vue-loading.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import VueTimepicker from 'vue2-timepicker'

import 'vue2-timepicker/dist/VueTimepicker.css'
 import firebase from '@/firebase_init.js';

let db = firebase.firestore();
// const auth = firebase.auth();
  export default {    
    components: {flatPicker,
    VueTimepicker,
    },
    data(){
        return{
           coins:0
        }
    } ,
    beforeMount(){
        let uid=localStorage.getItem('uid')
         db.doc('Coins/'+uid).get().then(snap=>{
             if(snap.data()){
                 this.coins=snap.data().coins
             }
         })
    }  
  };
  
</script>
<style>

/* .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}



.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
} */
#vue-timepicker{
  width: 100%;
  padding: 6px 6px;
  margin: 5px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

</style>
