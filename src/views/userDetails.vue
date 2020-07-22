<template>
    <div >
        <br><br>
        <card type="secondary">
        <h2 style="margin-top:15px;padding-left:10px;color:white;background-color:#03254c;text-align:center">USER DETAILS</h2>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex amargin-top:15px;margin-left:30px"
                     style="min-height: 500px; background-image: url(img/theme/sd.jpg; background-size: cover; backgroundmargin-top:15px;margin-left:30px top;">
          
            <span class="mask bg-gradient-success opacity-1"></span>
          
            <div class="container-fluid d-flex amargin-top:15px;margin-left:30px">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                       
                        
                    </div>
                </div>
            </div>

            
        </base-header>
        </card>
       
            <br>
             <div class="container-fluid mt--7">
            <div class="col-xl-12 order-xl-2 mb-5 mb-xl-0">
               <div class="row justify-content-center">
                          
                </div>          
                      
                    <div class="card card-profile shadow" style="background-image: url(img/theme/bharath-g-s-aLGiPJ4XRO4-unsplash.jpg; background-size: cover; backgroundmargin-top:15px;margin-left:30px top;">
                        <div class="row justimargin-top:15px;margin-left:30px">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                        <!-- <img v-if="picture" style="width:150px;height:150px" :src="picture" class="rounded-circle">
                                        <img v-else src="img/theme/.jpg" class="rounded-circle"> -->
                                    
                                </div>
                            </div>
                        </div>
                        <br>
                        <br>
 
                            <div class="col-xl-12 order-xl-1">
                   
                    
                        <div class="row" style="margin-left:40px">
                            <div class="col-xl-4 order-xl-1">
                              
                              <img src=img/theme/user.png style="max-height:40px;max-width:40px;margin-left:60px">
                              <h5 style="margin-top:15px;margin-left:60px">NAME</h5>
                              <h4 style="margin-top:15px;margin-left:60px">{{userObj.name}}</h4>                             
                           
                            </div>

                            <div class="col-xl-4 order-xl-1">
                           
                              <img src=img/theme/hotel.png style="max-height:40px;max-width:40px;margin-left:60px">
                              <h5 style="margin-top:15px;margin-left:40px">ORGANISATION</h5>
                              <h4 style="margin-top:15px;margin-left:40px">{{userObj.organization}}</h4>  
                           
                            </div>

                            <div class="col-xl-4 order-xl-1">
                           
                               <img src=img/theme/location.png style="max-height:40px;max-width:40px;margin-left:60px">
                              <h5 style="margin-top:15px;margin-left:50px">ADDRESS</h5>
                              <h4 style="margin-top:15px;margin-left:50px">{{userObj.address}}</h4>  
                           
                            </div>
                        </div>

                        <br>
                        <hr>
                        
                        <div class="row" style="margin-top:50px;margin-left:40px">
                            <div class="col-xl-4 order-xl-1">
                            
                              <img src=img/theme/datetime.jfif style="max-height:40px;max-width:40px;margin-left:60px">
                              <h5 style="margin-top:15px;margin-left:40px">DATE-TIME</h5>
                              <h4 style="margin-top:15px;margin-left:40px">{{userObj.timings.date}}</h4>  <h4 style="margin-top:15px;margin-left:40px">{{userObj.timings.time}}</h4>  
                           
                            </div>


                            <div class="col-xl-4 order-xl-1">
                    
                              <img src=img/theme/email.png style="max-height:40px;max-width:40px;margin-left:60px">
                              <h5 style="margin-top:15px;margin-left:60px">EMAIL</h5>
                              <h4 style="margin-top:15px;margin-left:60px">{{userObj.email}}</h4>  
                           
                            </div>

                             <div class="col-xl-4 order-xl-1">
                    
                              <img src=img/theme/phone.png style="max-height:40px;max-width:40px;margin-left:60px">
                              <h5 style="margin-top:15px;margin-left:50px">CONTACT</h5>
                              <h4 style="margin-top:15px;margin-left:50px">{{userObj.phoneNo}}</h4>  
                           
                            </div>
                        </div>
                           <br>
                        <hr>
                    <br>
                        
                       
                            
                              <div class="row">
                              <div class="col-xl-6 order-xl-1">
                                  <div class="row"  style="margin-left:40px">
                                        <img src=img/theme/foodicon.png style="max-height:40px;max-width:40px;margin-left:60px">                             
                                  </div>
                                  <h5 style="margin-top:15px;margin-left:80px">DESCRIPTION</h5>
                                  <h4 style="margin-top:15px;margin-left:80px">{{userObj.description}}</h4>  
                              </div>

                               <div class="col-xl-6 order-xl-1">
                                  <div class="row"  style="margin-left:40px">
                                        <img src=img/theme/del.png style="max-height:40px;max-width:40px;margin-left:60px">                             
                                  </div>
                                  <h5 style="margin-top:15px;margin-left:60px">DELIEVERY STATUS</h5>
                                 <badge pill type="danger" style="margin-top:15px;margin-left:60px" v-if='userObj.status="Pending"'>Pending</badge>
                                  <badge pill type="primary" style="margin-top:15px;margin-left:60px" v-if='userObj.status=="Initiated"'>Initiated</badge>
                                  <badge pill type="success" style="margin-top:15px;margin-left:60px" v-if='userObj.status=="Delivered"'>Delivered</badge>  
                              </div>                         
                              </div>            
                                    
                       </div>
                    </div>
                </div>
             </div>
        </div>

        

    
</template>
<script>
import firebase from '@/firebase_init.js';
let db = firebase.firestore();
export default {
  props:{
    id:String
  },
  data(){
    return{
       userObj:{}
    }
  },
  beforeMount(){
    let id=this.$route.params.id
    console.log(id)
    db.doc('AllUsers/'+id).get().then(response=>{
      this.userObj=response.data()
      console.log(this.userObj)
    })
  }
}
</script>
             
                           
<style>
img:hover {
  animation: shake 2s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>









