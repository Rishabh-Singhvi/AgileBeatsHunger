<template>
    <div  >

        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 400px; background-image: url(img/theme/food5.jpg); 
                     background-size: cover; background-position: center top;">
            <h1 style="text-align:center">
                    BOOK YOUR PICKUP    
            </h1>
            <div class="container-fluid d-flex align-items-center" style="min-height: 550px; background-image: url(img/theme/.jpg);
                     background-size: cover; background-position: center top;opacity:0.9">
                <div class="row" >
                    <div class="col-lg-7 col-md-10"  >
                        <!-- <h4 class="display-4 text-white">Create your Event</h4>
                        <p class="text-white mt-0 mb-5">Organise your event . You can create your event here</p> -->
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7" >
            <div class="row" >
        

                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary" >
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">PICKUP INFORMATION</h3>
                               </div>
                           </div>
                      </div>
                        <template>
                            <form @submit.prevent >
                                <h6 class="heading-small text-muted mb-4"></h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Name of Volunteer"
                                                        placeholder="Name"
                                                        input-classes="form-control-alternative"
                                                        v-model="userObj.name"
                                            />
                            
                                        </div>

                                         <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Organization"
                                                        placeholder="Title"
                                                        input-classes="form-control-alternative"
                                                        v-model="userObj.organization"
                                            />
                                            
                                        </div>
                                       
                                    </div>
                                   <div class="row"> 
                                    <div class="col-lg-6">
                                    <h4>Date of Packing the food</h4>
                                     <base-input addon-left-icon="ni ni-calendar-grid-58">
                                        <flat-picker slot-scope="{focus, blur}"
                                                    @on-open="focus"
                                                    @on-close="blur"
                                                    :config="{allowInput: true}"
                                                    class="form-control datepicker" 
                                                    v-model="userObj.timings.date">                                                                          
                                        </flat-picker>
                                    </base-input>
                                    </div>
                                    <div class="col-lg-3">
                                      <h4>Packing Time</h4>
                                       <vue-timepicker id="vue-timepicker" input-class="my-awesome-picker" v-model="userObj.timings.time"></vue-timepicker>
                                    </div>
                                    
                                  </div>
                                     <div >
                                       <h4>Description of Packed food</h4>
                                       <form>
                                        <textarea class="form-control form-control-alternative" rows="3" placeholder="Write a large text here ..." v-model="userObj.description"></textarea>
                                       </form>
                                     </div>
                                     <br>
                                    
                                </div>
                                <hr class="my-4" />
                                <h6 class="heading-small text-muted mb-4">Location</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <base-input alternative=""
                                                        label="Address"
                                                        placeholder="Address"
                                                        input-classes="form-control-alternative"
                                                        v-model="userObj.address"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                       
                                    </div>
                                </div>
                                
                                <hr class="my-4" />
                                <!-- Address -->
                                
                                <h6 class="heading-small text-muted mb-4">Contact Information</h6>
                                
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email ID"
                                                        placeholder="Email ID"
                                                        input-classes="form-control-alternative"
                                                        v-model="userObj.email"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Phone Number"
                                                        placeholder="Phone Number"
                                                        input-classes="form-control-alternative"
                                                        v-model="userObj.phoneNO"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>
                    <br>
                        <div class="col-md-3">
                        <base-button block type="" style="background-color:#4b2d2a;color:white" class=" mb-3" @click="mode">
                            Pick the Parcel
                        </base-button>

                        <modal :show.sync="modals.modal2"
                            gradient="danger"
                            modal-classes="modal-danger modal-dialog-centered">
                            <h6 slot="header" class="modal-title heading mt-1" id="modal-title-notification">Preview</h6>
                            <div class="py-3 text-center">
                                <i class="ni ni-circle-08 ni-3x"></i>
                                <h4 class="heading mt-4">Details</h4>
                                <p>Your Pickup details are :</p>
                            </div>
                            <span class="mb-4">Name :</span><span>{{userObj.name}} </span>
                            <br>
                            <span>Organization :</span><span>{{userObj.organization}} </span>
                            <br>
                            <span>Date :</span><span>{{userObj.timings.date}}</span>
                            <br>
                            <span>Time :</span><span>{{userObj.timings.time}}</span>
                            <br>
                            <span>Address :</span><span>{{userObj.address}}</span>
                            <br>
                            <span>Email :</span><span>{{userObj.email}}</span>
                            <br>
                            <span>Phone No. :</span><span>{{userObj.phoneNo}}</span>
                            

                            <template slot="footer">
                                <loading :active.sync="isLoading" 
                                    :can-cancel="true" 
                                    :on-cancel="onCancel"
                                    :is-full-page="fullPage"></loading>
                                <base-button type="white" @click="create">Pick the Parcel</base-button>
                                <base-button type="link"
                                            text-color="white"
                                            class="ml-auto"
                                            @click="modals.modal2 = false">
                                    Close
                                </base-button>
                            </template>
                        </modal>
                        <modal :show.sync="modals.modal1"
                            gradient="danger"
                            modal-classes="modal-danger modal-dialog-centered">
                            <h6 slot="header" class="modal-title heading mt-1" id="modal-title-notification">Preview</h6>
                            <div class="py-3 text-center">
                                <i class="ni ni-circle-08 ni-3x"></i>
                                <h4 class="heading mt-4"></h4>
                                <p>All fields are mandatory</p>
                            </div>
                            

                            <template slot="footer">
                                <base-button type="white" @click="modals.modal1 = false">Close</base-button>
                            </template>
                        </modal>
                   </div>
                      
                </div>
            </div>
        </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
<script>
import Loading from 'vue-loading-overlay';
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import VueTimepicker from 'vue2-timepicker'

import 'vue2-timepicker/dist/VueTimepicker.css'
import firebase from '@/firebase_init.js';
let db = firebase.firestore();
const auth = firebase.auth();
  export default {    
    components: {flatPicker,
    VueTimepicker,
    Loading
    },
    data(){
        return{
            isLoading:false,
            userObj:{
                'name':'',
                'organization':'',
                'timings':{
                    'date':'',
                    'time':''
                },
                'description':'',
                'address':'',
                'email':'',
                'phoneNo':''
            },
            modals:{
                modal2:false,
                modal1:false
            }
        }
    },
    methods:{
         mode(){
           if(this.userObj.name!=''&&this.userObj.organization!=''&&
           this.userObj.description!=''&&this.userObj.address!=''&&
           this.userObj.timings.date!=''&&this.userObj.timings.time!=''&&
           this.userObj.email!=''&&this.userObj.phoneNo!=''){
              this.modals.modal2=true
           }         
           else
           {
               this.modals.modal1=true
           }          
        },
        create(){
            this.isLoading = true;
            db.collection('AllUsers').add(this.userObj);
            this.isLoading = false;
        }
       
    }   
  };
  
</script>
<style>


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
