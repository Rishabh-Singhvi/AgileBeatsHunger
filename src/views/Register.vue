<template>
    <div class="row justify-content-center" >
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <!-- <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                        <small>Sign up with</small>
                    </div>
                    <div class="btn-wrapper text-center">
                        
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                            <span class="btn-inner--text">Google</span>
                        </a>
                    </div>
                </div> -->
                <div class="card-body px-lg-5 py-lg-5">
                    <!-- <div class="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                    </div> -->
                    <form role="form">
                        
                         <div class="col-lg-14 text-center">
                                            <!-- <div class="row col-lg-6"> -->
                                            <span class="avatar avatar-lg rounded-circle">
                                             <img alt="Image placeholder" src="img/theme/foodicon.png" >
                                            </span>
                                            <h5>Register As</h5>
                                            <base-dropdown >
                                            <base-button slot="title" type="default" class="dropdown-toggle" v-if="type">
                                               {{type}}
                                            </base-button>
                                            <base-button slot="title" type="default" class="dropdown-toggle" v-else>
                                               Select 
                                            </base-button>
                                            <li>
                                                <a class="dropdown-item" @click="setType('User')">
                                                   User
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" @click="setType('Admin')" >
                                                   Admin
                                                </a>
                                            </li>
                                          
                                        </base-dropdown>
                                    <!-- </div> -->
                                        </div>
                                        <br>
                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Name"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="name">
                        </base-input>
                 
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

                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                         <div class="col-md-7">
                        <base-button v-if="creating" type="primary" class=" mb-10">
                            Creating...
                        </base-button>
                        <base-button v-else type="primary" class=" mb-10" @click=createAccount>
                            Create Account
                        </base-button>

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
                    <a href="#" class="text-light">
                        <small>Forgot password?</small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
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
    name: 'register',
    data() {
      return {
        creating:false,
        
        name: '',
        email: '',
        password: '',
        error:'',
        type:'',
        userData:{},
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
        //         return db.doc("users/"+user.uid).get()
        //         .then(doc => {
        //             if(!doc.exists){
        //                 return db.doc("users/"+ user.uid).set({
        //                     name : user.displayName,
        //                     email: user.email,
        //                     type:user.type,
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
        createAccount(){
            if(this.name!=''&&this.type!=''&&this.password!=''&&this.email!=''){
                this.creating = true;
            auth.createUserWithEmailAndPassword(this.email,this.password).then(user=>{
                console.log(user)
                let userData= {
                    name : this.name,
                    email: this.email,
                    type: this.type,
                    registeredEvents:[],
                    photoURL:''
                }
                db.doc("users/"+user.user.uid).set(userData).then(()=>{
                    console.log(userData)
                    localStorage.setItem('uid',user.user.uid)
                    localStorage.setItem('user',JSON.stringify(userData))
                    this.creating=false
                    this.$router.push('PickupDetails')
                })
            })
            .catch(err=>{
                this.creating=false
                this.error = err.message
                console.log(err)
            })
            auth.onAuthStateChanged(firebaseUser=>{
                if (firebaseUser) {
                        firebaseUser.sendEmailVerification().then(function() {
                            console.log('send Verification');
                            //document.getElementById("verifMessage").innerHTML = "Check your inbox for verification email!";
                        }, function(error) {
                            console.log(error);
                        });
                    } else {
                        console.log('not logged in');
                        //document.getElementById('btnLogout').style.display = 'none';
                    }
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
