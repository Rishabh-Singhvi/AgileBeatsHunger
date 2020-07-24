<template>
<div>
 <base-header  type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Mask -->
            
            <!-- Header container -->
    <div class="table-wrapper">
      
    <table class="fl-table">
        <thead>
        <tr>
           <th>ID</th>
          <th>Organization</th>
          <th>Pick Up Time</th>
          <th>Status</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="i in arr" :key="i.id">
            <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <router-link :to="{path:'/userDetails/'+i.id}"><span class="name mb-0 text-sm">{{i.register}}</span></router-link>
              </div>
            </div>
          </th>
            <td class="budget" >
            {{i.organization}}
          </td>
          <td>
            {{i.timings.time}}
          </td>
          <td>
            
            <badge pill type="danger" v-if='i.status=="Pending"'>Pending</badge>
            <badge pill type="primary" v-if='i.status=="Initiated"'>Initiated</badge>
            <badge pill type="success" v-if='i.status=="Picked Up"'>Picked Up</badge>
          </td> 
          <td>
            <!-- <router-link :to="{path:'/userDetails/'+i.id}"> --><base-button type="info" v-if='i.status=="Pending"' @click="load(i.id)">Initiate</base-button> <!-- </router-link> -->
             <base-button type="primary" v-if='i.status=="Initiated"' @click="deliver(i)" >Picked Up?</base-button>
            <base-button type="success" v-if='i.status=="Picked Up"' disabled><i class="ni ni-check-bold"></i></base-button>
          </td>
        </tr>
        </tbody>
    </table>
 <div class="pagination">
    <div class="number" v-for="i in perPages()" :key="i" v-on:click="changePage(i)">{{i}}</div>
  </div>
  </div>
</base-header>
<modal :show.sync="modals.modal1"
        gradient="white"
        modal-classes="modal-danger modal-dialog-centered">
        <div class="row" :key="indextr" v-for="(tr, indextr) in allTransport" btn-small>                            
        <div class="py-20 col">
            <h4 >{{allTransport[indextr].transport}}</h4>
        </div>
            <div class="col" @click="select(tr)">
            <badge pill type="primary" v-if="!tr.selected" >Select</badge>
            <badge pill type="danger" v-if="tr.selected" >Unselect</badge>
        </div>
        </div>

        <template slot="footer">
            <base-button type="info"  @click="Initiate()">Initiate</base-button>
            <base-button type="white" @click="modals.modal1 = false">Close</base-button>
        </template>
</modal>
</div>
</template>
<script>
import firebase from '@/firebase_init.js';
let db = firebase.firestore();
export default {
    data(){
        return{
              modals:{
                modal1:false
                },
            currentPage: 1,
            elementsPerPage: 13,
            arr:[],
            allTransport:[],
            selPar:''
        }
    },
    computed:{
      get_arr() {
      var start = (this.currentPage-1) * this.elementsPerPage;
      var end = start + this.elementsPerPage;
      return this.arr.slice(start, end);
    } 
    },
     methods:{
     "perPages": function perPages() {
      return Math.ceil(this.arr.length / this.elementsPerPage);
    },
    "changePage": function changePage(page) {
      this.currentPage = page;
    },
    Initiate(){
        let trans=''
        this.allTransport.forEach(tr=>{
            if(tr.selected){
                trans=tr.transport
            }
        })
        db.doc("AllUsers/"+this.selPar).update({
            status:"Initiated",
            transPro:trans
        })
        this.$notify("Initiated")
        this.modals.modal1=false
         this.allTransport.forEach(tr=>{
            if(tr.selected){
                tr.selected=!tr.selected
            }
        })
    },
    deliver(i){
        db.doc("AllUsers/"+i.id).update({
            status:"Picked Up"
        })
    },
    select(tr){
        tr.selected=!tr.selected
    },
    load(i){
        this.modals.modal1=true
        this.selPar=i
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
        db.collection("AllUsers").onSnapshot(respo=>{
            if (this.arr.length !== 0) this.arr = [];
            respo.forEach(doc => {
                db.collection("AllUsers").doc(doc.id).update({
                    id:doc.id
                })
                 this.arr.push(doc.data())
                 console.log(this.arr)
            })
        })
    }
}
</script>

<style scoped>
  *{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
body{
    font-family: Helvetica;
    -webkit-font-smoothing: antialiased;
    background: rgba( 71, 147, 227, 1);
}
h2{
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    padding: 30px 0;
}
.pagination {
  font-family: 'Open Sans', sans-serif;
  text-align: right;
  width: 750px;
  padding: 8px;
}
.number {
  display: inline-block;
  padding: 4px 10px;
  color: #FFF;
  border-radius: 4px;
  background: #44475C;
  margin: 0px 5px;
  cursor: pointer;
}
.number:hover, .number.active {
  background: #717699;
}
input[type=text]{
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.table-wrapper{
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
    border-radius: 15px;
    font-size: 20px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 5px solid #f8f8f8;
    font-size: 20px;
}

.fl-table thead th {
    color: #ffffff;
    background: #4FC3A1;
}


.fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #324960;
}

.fl-table tr:nth-child(even) {
    background: #F8F8F8;
}

@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
    }
    .fl-table thead th {
        text-align: left;
        border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
        background: none;
    }
    .fl-table tr:nth-child(even) {
        background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
        background: #F8F8F8;
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tr td:nth-child(even) {
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tbody td {
        display: block;
        text-align: center;
    }
}

.view {
      padding:0px;
      border:1px solid #021a40;
      background-color:#9342f5;
      border-radius:15px;
      height: 40px;
} 
    .view:hover {
      background-position: 0;
       color: #fff;
  outline: 0;
    }

</style>