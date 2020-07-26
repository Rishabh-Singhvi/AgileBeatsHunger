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
                        <div class="row" >
                            <div class="col-xl-4 order-xl-1" v-for="(pro,index) in allProduct" :key="index">
                            <card shadow type="secondary" >
                              <img :src="allProduct[index].proData.picture" style="height:200px;width:300px;border-radius:15px">
                              <h2 style="margin-top:5px">{{allProduct[index].proData.proName}}</h2>
                               <div class="row">
                                        <div style="max-width:100px;margin-top:15px">                                
                                            <base-button btn-small block type="" v-if="!allProduct[index].proData.added" style="background-color:#43464b;color:white;margin-left:20px;width:150px"  @click="addToCart(allProduct[index])">
                                                <i class="fa fa-shopping-cart" aria-hidden="true" ></i> Buy
                                            </base-button> 
                                            <base-button btn-small block type="" v-else disabled style="background-color:#43464b;color:white;margin-left:20px;width:150px">
                                                <i class="fa fa-shopping-cart" aria-hidden="true" ></i> Purchased
                                            </base-button>                                
                                        </div>
                                        <i class="fas fa-coins fa-2x"  style="margin-left:100px;margin-top:20px"></i>
                                        <h2 style="margin-left:15px;margin-top:20px">{{allProduct[index].proData.coins}}</h2>
                                </div>
                           </card>
                           <br>
                            </div>
                            <br>
                        </div>
                        <br>
                    </card>
                     <modal :show.sync="modals.modal1"
                            gradient="white"
                            modal-classes="modal-danger modal-dialog-centered">
                            <div class="row" btn-small>                            
                            <div class="py-20 col">
                                <h4 >Are You Sure you want to Buy?</h4>
                            </div>
                            </div>

                            <template slot="footer">
                                <base-button type="success"  @click="buy(currentProduct)">Buy</base-button>
                                <base-button type="white" @click="modals.modal1 = false">Close</base-button>
                            </template>
                    </modal>
                    <modal :show.sync="modals.modal2"
                            gradient="white"
                            modal-classes="modal-danger modal-dialog-centered">
                            <div class="row" btn-small>
                            <div class="py-20 col" >
                                <h4 >Insufficient balance</h4>
                            </div>
                            </div>
                            

                            <template slot="footer">
                                
                                <base-button type="white" @click="modals.modal2 = false">Close</base-button>
                            </template>
                    </modal>
                    <br>
                       
                
                      
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
           yourId:'',
           currentProduct:[],
           myProduct:[],
           coins:0,
           allProduct:[],
            modals:{
           modal2:false,
           modal1:false
        }
        }
    } ,
    methods:{
      addToCart(pro){
          let uid=localStorage.getItem('uid')
           db.doc("MyProducts/"+uid).onSnapshot(product=>{
               product.data().MyProducts.forEach(prid=>{
                   if(prid.id==pro.id){
                      if(prid.proData.coins<=this.coins){
                          this.modals.modal1=true
                          this.currentProduct=prid  
                      }
                      else{
                          this.modals.modal2=true
                      }
                   }
               })
           })
      },
      buy(fin){
          let currentCoins=0
          let uid=localStorage.getItem('uid')
           db.doc("MyProducts/"+uid).get().then(product=>{
               product.data().MyProducts.forEach(prid=>{
                   if(prid.id==fin.id){
                       if(prid.proData.coins<=this.coins){
                      currentCoins=this.coins-prid.proData.coins
                    //   console.log(fin.index)
                    //   this.allProduct[(fin.index)-1].proData.added=true
                    //   console.log(this.allProduct)
                      db.doc('Coins/'+uid).update({coins:currentCoins})
                      this.getcurCoins()
                    //   this.$notify("Item Purchased")
                    //    this.modals.modal1=false;
                      //this.getCoins();
                       }
                   }
               })
           })
             
           
      },
      getcurCoins(){
          let uid=localStorage.getItem('uid')
          db.doc('Coins/'+uid).get().then(snap=>{
             if(snap.data()){
                 this.coins=snap.data().coins
             }
         })
        //  db.doc("MyProducts/"+uid).set({
        //      MyProducts:this.allProduct
        //  })
          //window.location.reload()
        //   this.modals.modal1=false;
          this.$notify("Item Purchased")
          this.modals.modal1=false;
      }
    },
    beforeMount(){
        let uid=localStorage.getItem('uid')
        
         db.doc('Coins/'+uid).get().then(snap=>{
             if(snap.data()){
                 this.coins=snap.data().coins
             }
         })
         db.collection("AllProducts").onSnapshot(response=>{
             if(this.allProduct.length!==0) this.allProduct=[]
             let index=1
             response.forEach(doc=>{
                   let blankPro={
                       index:index,
                       id:doc.id,
                       proData:doc.data()
                   } 
                   index=index+1
                //    db.doc("MyProducts/"+uid).get().then(p=>{
                //        p.data().MyProducts.forEach(prod=>{
                //            if(prod.id==doc.id){
                //                console.log("hahahah")
                               
                //               blankPro.proData.added=prod.proData.added
                //            }
                //        })
                //    })
                   this.allProduct.push(blankPro)
                   console.log(this.allProduct)
                   db.doc("MyProducts/"+uid).set({MyProducts:this.allProduct})
             })
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
