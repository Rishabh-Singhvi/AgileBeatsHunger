<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <!-- <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                        <div class="btn-wrapper text-center">
                            
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div>
                    </div> -->
                    <div class="card-body px-lg-5 py-lg-5">
                        <!-- <div class="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div> -->
                        <form role="form">
                            <div class="text-center">
                             <div class="avatar avatar-lg rounded-circle">
                                 <img alt="Image placeholder" src="img/theme/foodicon.png" style="max-height:75px;max-width:75px">
                              </div>
                            </div>
                             <h3 style="text-align:center">LOGIN</h3>
                             <br>
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <br>
                                  <div class="col-md-7">
                                      
                        <base-button v-if="!Logingin" type="primary" class=" mb-10" @click="loginEmail">
                            Login
                        </base-button>
                        <base-button v-else disabled type="primary" class=" mb-10">
                            Logingin...
                        </base-button>
                        <div class="vld-parent">
                         
                        </div>
                        
                        <modal :show.sync="modals.modal2"
                            gradient="danger"
                            modal-classes="modal-danger modal-dialog-centered">
                            <h6 slot="header" class="modal-title heading mt-1" id="modal-title-notification">Alert</h6>
                            <div class="py-3 text-center">
                                <i class="ni ni-circle-08 ni-3x"></i>
                                
                                <p>All Fields Are Mandatory</p>
                            </div>
                            <template slot="footer">
                                <base-button type="link"
                                            text-color="white"
                                            class="ml-auto"
                                            @click="modals.modal2 = false">
                                    Close
                                </base-button>
                            </template>
                        </modal>
                       
                       </div>
                            <base-alert type="warning" v-if="error">
                                <strong>{{error}}</strong>
                            </base-alert>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div>
                
            </div>
        </div>
</template>
<script>

import firebase from '@/firebase_init.js';
let db = firebase.firestore();
const auth = firebase.auth();
  export default {
        name: 'login',
        data() {
            return {
                Logingin: false,
               // fullPage: true,
                email: '',
                password: '',
                error:'',
                modals:{
                modal2:false
                },
            }        
        },
        
        methods:{
            setType(type){
            this.type=type
            console.log(this.type)
            },
            // loginGoogle(){
            //     var provider = new firebase.auth.GoogleAuthProvider();
            //     auth.signInWithPopup(provider)
            //     .then(snapshot=>{
            //         let user = snapshot.user
            //         console.log(user)
            //         return db.doc("users/"+user.uid).get()
            //         .then(doc => {
            //             if(!doc.exists){
            //                 return db.doc("users/"+ user.uid).set({
            //                     name : user.displayName,
            //                     email: user.email,
            //                     registeredEvents:[],
            //                     photoURL:user.photoURL
            //                 })
            //             }
            //             else {
            //                 console.log(doc.data())
            //                 localStorage.setItem('uid',doc.id)
            //                 localStorage.setItem('user',JSON.stringify(doc.data()))
            //             }
            //         })
            //     })
            //     .then(()=>{
            //         this.$router.push('dashboard')
            //     })
            // },
            loginEmail(){
                if(this.password!=''&&this.email!=''){
                    this.Logingin = true
                auth.signInWithEmailAndPassword(this.email,this.password).then(snap=>{
                    let user = snap.user
                    console.log(user)
                    return db.doc("users/"+user.uid).get()
                    .then(doc => {
                        if(!doc.exists){
                            return db.doc("users/"+ user.uid).set({
                                name : user.displayName,
                                email: user.email,
                                registeredEvents:[],
                                photoURL:user.photoURL
                            })
                        }
                        else {
                            console.log(doc.data())
                            localStorage.setItem('uid',doc.id)
                            localStorage.setItem('user',JSON.stringify(doc.data()))
                        }
                })
                }).then(()=>{
                    this.Logingin=false
                    this.$router.push('BeatHunger')
                })
                .catch(err=>{
                    this.Logingin=false
                    this.error = err.message
                    console.log(err)
                })
                }
                else{
                    this.modals.modal2=true
                }
            }
        }
  }
</script>
<style>
</style>
