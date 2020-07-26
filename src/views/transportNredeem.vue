<template>
    <div >
         <br><br><br>
        
            <div class="row align-items-center"> 
            <div class="col-12">
                <h3 style="background-color:#03254c;color:white;text-align:center;padding-top:5px
                ;padding-bottom:5px">TRANSPORT AND REDEEM</h3>
            </div>
           </div>
        <base-header  class="pb-6 pb-8 pt-5 pt-md-8"  style="min-height: 400px;min-width: 400px; background-image: url(img/theme/trans1.jpg);
         background-size: cover; background-position: center top;">
          <div class="container-fluid d-flex align-items-center" style="min-height:300px;
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
            <card shadow type="secondary">
                 <div slot="header" class="bg-white border-0">
                           <div class="row align-items-center"> 
                            <div class="col-12">
                                <h3 >Add transport Provider</h3>
                            </div>
                              </div>
                        </div>
             <div class="row">
                <div class="col-md-10">
                   <base-input alternative placeholder="Add Transport Provider" v-model="transport"></base-input>
                </div>
                <div class="col-md-2">
                   <base-button type="" @click="addTransport" style="background-color:#3e3e3e;color:white"><i class="ni ni-fat-add "></i></base-button>
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
                <label for="file" v-if="!uploading" style="background-color:#3e3e3e"  >Upload Image</label>
                <base-button size="sm" v-if="uploading" disabled type="info" class="mr-4">Wait..Uploading</base-button>
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
             <base-button type="" @click="addProduct()" style="background-color:#3e3e3e;color:white" id="addpr" btn-small>Add</base-button>
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
                            <base-button slot="title" type="" @click="modals.modal1=true"
                             style="background-color:#3e3e3e;color:white">
                            Select Transport To Delete
                            </base-button>
                    </div>
                    <div class="col">
                            <base-button slot="title" type="" @click="modals.modal2=true" btn-small 
                            style="background-color:#3e3e3e;color:white">
                            Select Product To Delete
                            </base-button>
                    </div>
                </div>
                 <modal :show.sync="modals.modal1"
                            gradient="white"
                            modal-classes="modal-danger modal-dialog-centered">
                            <div class="row" :key="indextr" v-for="(tr, indextr) in allTransport" btn-small>                            
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
                            modal-classes="modal-danger modal-dialog-centered">
                            <div class="row" :key="index" v-for="(t, index) in allproduct" btn-small>
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
                stock:0,
                added:false
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
          if(this.transport!='')
          {
              transportref.update({
                allTransport: firebase.firestore.FieldValue.arrayUnion(this.transport)
              });
              this.$notify("Transport Added")
          }
          else
          alert("FIELD EMPTY-ADD TRANSPORT")
         
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
          if(this.proDetails.picture&&this.proDetails.proName!=''&&this.proDetails.proProvider!=''&&this.proDetails.coins!=''&&this.proDetails.stock!='')
          db.collection("AllProducts").add(this.proDetails)
          else
          alert("Fields are missing");
           let lbl = document.getElementById('addpr');
              lbl.innerText = "Added"; 
           this.$notify("product Added")
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
                
                //console.log(this.allproduct)
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