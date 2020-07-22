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
          <th>Status</th>
          <th>Pick Up Time</th>
          <th>Organization</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                 <span class="name mb-0 text-sm">{{row.regID}}</span>
              </div>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </th>
          <td class="budget">
            {{row.budget}}
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>
          <td>
            <div class="avatar-group">
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Ryan Tompson">
                <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Romina Hadid">
                <img alt="Image placeholder" src="img/theme/team-2-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Alexander Smith">
                <img alt="Image placeholder" src="img/theme/team-3-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Jessica Doe">
                <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg">
              </a>
            </div>
          </td>

          <td>
            <div class="d-flex align-items-center">
              <span class="completion mr-2">{{row.completion}}%</span>
              <div>
                <base-progress :type="row.statusType"
                               :show-percentage="false"
                               class="pt-0"
                               :value="row.completion"/>
              </div>
            </div>
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
        userObj:{},
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
    }
  }
</script>
<style>
</style>
