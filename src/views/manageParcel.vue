<template>
<div >
<base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
  <div class="card shadow">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">
            Manage Parcel 
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>ID</th>
          <th>Organization</th>
          <th>Pick Up Time</th>
          <th>Status</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <router-link :to="{path:'/userDetails/'+row.id}"><span class="name mb-0 text-sm">{{row.register}}</span></router-link>
              </div>
            </div>
          </th>
          <td class="budget">
            {{row.organization}}
          </td>
          <td>
            {{row.timings.time}}
          </td>
          <td>
            <badge pill type="danger" v-if='row.status="Pending"'>Pending</badge>
            <badge pill type="primary" v-if='row.status=="Initiated"'>Initiated</badge>
            <badge pill type="success" v-if='row.status=="Delivered"'>Delivered</badge>
          </td>

          <td class="text-right">
            <base-button type="info" @click="modals.modal1=true">Initiate Pickup</base-button>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end">
      <base-pagination total="30"></base-pagination>
    </div>

  </div>
</base-header>
 <modal :show.sync="modals.modal1"
          gradient="white"
          modal-classes="modal-danger modal-dialog-centered">
          <div class="row" :key="indextr" v-for="(tr, indextr) in allTransport">                            
          <div class="py-20 col">
              <h4 >{{allTransport[indextr].transport}}</h4>
          </div>
          <div class="col" v-if="!allTransport[indextr].selected" @click="selected(tr)">
              <badge pill type="primary" >Select</badge>
          </div>
           <div class="col" v-if="allTransport[indextr].selected" @click="selected(tr)">
              <badge pill type="danger" >Unselect</badge>
          </div>
          </div>

          <template slot="footer">
               <base-button type="success" @click="modals.modal1 = false">Initiate</base-button>
              <base-button type="white" @click="modals.modal1 = false">Close</base-button>
          </template>
  </modal>
</div>
</template>

<script>
import firebase from '@/firebase_init.js';
let db = firebase.firestore();
  export default {
    name: 'projects-table',
    data() {
      return {
        modals:{
          modal1:false
        },
        allTransport:[],
        tableData: [] 
      }
    },
    methods:{
       selected(tr){
         tr.selected=!tr.selected
         console.log(tr)
       }
    },
    beforeMount(){
     db.collection("AllTransport").doc("transport").onSnapshot(allTransport=>{
            if (this.allTransport.length !== 0) this.allTransport = [];
            allTransport.data().allTransport.forEach((element,index)=>{
                let blankTrans={
                  id:index+1,
                  transport:element,
                  selected:false
                };
                this.allTransport.push(blankTrans)
                console.log(this.allTransport)
            })
        })
      db.collection("AllUsers").onSnapshot(user=>{
        if (this.tableData.length !== 0) this.tableData = [];
        user.forEach(doc=>{
         db.collection("AllUsers").doc(doc.id).update({
            id:doc.id
          })
          console.log(doc.data())
          this.tableData.push(doc.data())
        })
      })
    }
  }
</script>
<style>
</style>
