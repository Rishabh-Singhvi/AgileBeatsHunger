<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        <div class="container-fluid mt--7">
            <card shadow type="secondary">
                 <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Add transport Provider</h3>
                                </div>
                            </div>
                        </div>
             <div class="row">
                <div class="col-md-10">
                   <base-input alternative placeholder="Add Transport Provider" v-model="transport"></base-input>
                </div>
                <div class="col-md-2">
                   <base-button type="info" @click="addTransport"><i class="ni ni-fat-add"></i></base-button>
                </div>
             </div>
            </card>
            <br>
            <card shadow type="secondary">
                 <div slot="header" class="bg-white border-0">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">Add Product to Bazzar</h3>
                        </div>
                    </div>
                </div>
            <div class="row">
                <div class="col-lg-2">
               <input type="file" id="file" @change="previewImage" accept="image/*">
                <label for="file" v-if="!uploading" >Upload Image</label>
                <base-button size="sm" v-if="uploading" disabled type="info" class="mr-4">Uploading</base-button>
                <base-button size="sm" v-if="proDetails.picture" disabled type="danger" class="mr-4">Uploaded</base-button>
                </div>
                <div class="col-lg-5">
                    <base-input alternative=""
                                label="Product Name"
                                placeholder="Product Name"
                                input-classes="form-control-alternative"
                                v-model="proDetails.proName"
                    />
                </div>
                 <div class="col-lg-5">
                    <base-input alternative=""
                                label="Provider"
                                placeholder="Provider"
                                input-classes="form-control-alternative"
                                v-model="proDetails.proProvider"
                    />
                </div>
            </div>
            <div class="row">
                 <div class="col-lg-6">
                    <base-input alternative=""
                                label="Coins"
                                placeholder="Coins"
                                input-classes="form-control-alternative"
                                v-model="proDetails.coins"
                    />
                </div>
                 <div class="col-lg-6">
                    <base-input alternative=""
                                label="Stock"
                                placeholder="Stock"
                                input-classes="form-control-alternative"
                                v-model="proDetails.stock"
                    />
                </div>
            </div>
             <base-button type="info" @click="addProduct()" >Add</base-button>
            </card>
            <br>

            <card shadow type="secondary">
               <div slot="header" class="bg-white border-0">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">Delete Transport or Product</h3>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                            <base-button slot="title" type="primary" @click="modals.modal1=true">
                            Select Transport To Delete
                            </base-button>
                    </div>
                    <div class="col">
                            <base-button slot="title" type="primary" @click="modals.modal2=true">
                            Select Product To Delete
                            </base-button>
                    </div>
                </div>
                 <modal :show.sync="modals.modal1"
                            gradient="white"
                            modal-classes="modal-danger modal-dialog-centered">
                            <div class="row" :key="indextr" v-for="(tr, indextr) in allTransport">                            
                            <div class="py-20 col">
                                <h4 >{{allTransport[indextr]}}</h4>
                            </div>
                             <div class="col" @click="delTrans(indextr)">
                                <badge pill type="danger" >Delete</badge>
                            </div>
                            </div>

                            <template slot="footer">
                                <base-button type="white" @click="modals.modal1 = false">Close</base-button>
                            </template>
                    </modal>
                    <modal :show.sync="modals.modal2"
                            gradient="white"
                            modal-classes="modal-danger">
                            <div class="row" :key="index" v-for="(t, index) in allproduct" style="float:left;clear:both">
                            <div class="py-20 col" >
                                <h4 >{{allproduct[index].proName}}</h4>
                            </div>
                            <div class="col" @click="delPro(allproduct[index].id,index)">
                                <badge pill type="danger" >Delete</badge>
                            </div>
                            </div>
                            

                            <template slot="footer">
                               
                                <base-button type="white" @click="modals.modal2 = false">Close</base-button>
                            </template>
                    </modal>
            </card>
        </div>
    </div>
</template>
<script>
//import Loading from 'vue-loading-overlay';
import firebase from '@/firebase_init.js';
let db = firebase.firestore();
export default {
    data(){
        return{
            uploading:false,
            imageData: null,
            uploadValue: 0,
            transport:'',
            allTransport:[],
            allproduct:[],
            proDetails:{
                picture:null,
                proName:'',
                proProvider:'',
                coins:0,
                stock:0
            },
            modals:{
           modal2:false,
           modal1:false
        },
        }
    },
    // components: {
    //         Loading,
            
    //     },
    methods:{
        delPro(x,index){
            console.log(x)
            this.allproduct.splice(index,1)
            db.collection("AllProducts").doc(x).delete()
        },
        delTrans(index){
             let transportref = db.collection("AllTransport").doc("transport");
            transportref.update({
            allTransport: firebase.firestore.FieldValue.arrayRemove(this.allTransport[index])
          });
        },
        addTransport(){
          let transportref = db.collection("AllTransport").doc("transport");
          transportref.update({
            allTransport: firebase.firestore.FieldValue.arrayUnion(this.transport)
          });
        },
        previewImage(event) {
            this.uploadValue=0;
            this.proDetails.picture=null;
            this.imageData = event.target.files[0];
            this.onUpload()
    },
        onUpload(){
            this.uploading=true
            this.picture=null;
            let storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.proDetails.picture =url;
                }).then(()=>{
                   this.uploading=false
                   console.log(this.picture)
                })
        })
      },
      addProduct(){
          db.collection("AllProducts").add(this.proDetails)
      }
    
    },
    beforeMount(){
        
        db.collection("AllTransport").doc("transport").onSnapshot(allTransport=>{
            if (this.allTransport.length !== 0) this.allTransport = [];
            allTransport.data().allTransport.forEach(transport=>{
                this.allTransport.push(transport)
            })
        })
        db.collection("AllProducts").onSnapshot(snapshot=>{
            let product={}
            if(this.allproduct.length!==0) this.allproduct=[]
            snapshot.forEach(doc=>{
                product=doc.data()
                product['id']=doc.id
                this.allproduct.push(product)
                
                console.log(this.allproduct)
            })
        })
    }
}
</script>
<style scoped>
[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

[type="file"] + label {
  background: #526168;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
	font-family: 'Rubik', sans-serif;
	font-size: inherit;
  font-weight: 500;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 25px;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;
}
</style>