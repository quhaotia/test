import logo from './test2.png'
import './App.css';
import { Image, Card, Icon, Statistic } from 'semantic-ui-react'
import {Button} from 'antd'
import React, { useState,Component } from 'react';
import { create } from 'ipfs-http-client'
const IPFS = require('ipfs-core')
const CID =require('ipfs-http-client')
let web3 = require('./initWeb3');
let lotteryInstance = require('./abi')
let ipfs
class App extends Component{
  shownft = async () =>{
    let address = await lotteryInstance.methods.getnftowner().call()
    let nfthash = await lotteryInstance.methods.getnfthash().call()
    let account = await web3.eth.getAccounts()
    let have = false
    for(let i=0;i<100;i++)
    {
      if(address[i]==account)
      {
        alert(`${nfthash[i]}`)
        have = true
      }
    }
    if(have==false)alert('你并未拥有NFT代币')
  }
  view = async() =>{
    if(this.state.te2==false)
    this.setState({te2:true})
    else
    this.setState({te2:false,te21:false})
  }
  maker = async() =>{
    if(this.state.te1==false)
    this.setState({te1:true})
    else
    this.setState({te1:false})
  }
  onChange2 = async(e) => {
    this.setState({hash:e.target.value})
  }
  onChange3_1 = async(e) => {
    this.setState({sellhash:e.target.value})
  }
  onChange3_2 = async(e) => {
    this.setState({sellprice:e.target.value})
  }
  onChange3_3 = async(e) => {
    this.setState({selltime:e.target.value})
  }
  onChange4 = async(e) => {
    this.setState({bid:e.target.value})
  }
  onChange5 = async(e) => {
    this.setState({search:e.target.value})
  }
  onClick2 = async() => {
    if(this.state.te21==false)
    this.setState({te21:true})
    else
    this.setState({te21:false})
  }
  onClick3 = async() => {
    try
    {let account = await web3.eth.getAccounts()
    await lotteryInstance.methods.startauction(this.state.sellprice,this.state.sellhash,this.state.selltime).send({from:account[0],gas:3000000})
    alert(`开始拍卖`)}
    catch(e)
    {
      alert('error')
    }
  }
  onClick4 = async() => {
    if(this.state.bid>this.state.aucprice)
    {
      try{
        let account = await web3.eth.getAccounts();
        await lotteryInstance.methods.addbid().send({
          from:account[0],
          value:web3.utils.toWei(this.state.bid,'ether'),
          gas:'3000000'})
          alert(`竞标成功`)
      }catch(e)
      {
        alert(`error`)
      }
    }
    else
    alert(`出价过低`)
  }
  onClick5 = async() => {
    try{
      let account = await web3.eth.getAccounts()
      let k = await lotteryInstance.methods.search(this.state.search).send({from:account[0],gas:'3000000'})
      console.log(k)
      let num = await lotteryInstance.methods.getownnum().call()
      if(num==0)
      {
        alert('代币未铸造')
      }
      else
      {
        let add = await lotteryInstance.methods.getpath().call()
        for(let i=0;i<num;i++)
        {
          if(i==0)
          {
            alert(`铸造者：${add[i]}`)
          }
          else if(i<num-1)
          {
            alert(`经手人${i}:${add[i]}`)
          }
          else
          {
            alert(`持有人：${add[i]}`)
          }
        }
      }
      alert('done')
    }catch(error){
      alert('error')
    }
  }
  onChange = async(e) =>{
    const file = e.target.files[0]
    try{
      let account = await web3.eth.getAccounts()
      ipfs = await IPFS.create()
      const cid = await ipfs.add(file)
      let i = await lotteryInstance.methods.test().call()
      let ki = await lotteryInstance.methods.make(cid.path).send({from:account[0],gas:'3000000'});
      let j = await lotteryInstance.methods.test().call()
      if(i!=j)alert('铸币成功')
      else alert('铸币失败')
    }catch(error){
      alert('error')
    }
  }
  showauction = async() =>{
    return(
      <div>wdnmd</div>
    )
  }
  sell = async() =>{
    if(this.state.te3==false)
    this.setState({te3:true})
    else
    this.setState({te3:false})
  }
  test = async() =>{
    try{
      let a= await lotteryInstance.methods.getdoing().call()
    alert(`${a}`)
    }catch(e){
      alert('error')
    }
  }
  buy = async() =>{
    try
      {let account = await web3.eth.getAccounts()
      await lotteryInstance.methods.when().send({from:account[0],gas:3000000})
      this.setState({aucing:await lotteryInstance.methods.getdoing().call(),
      auchash:await lotteryInstance.methods.getsellhash().call(),
      aucprice:await lotteryInstance.methods.getprice().call(),
      auctime:await lotteryInstance.methods.gettime().call()})
      if(this.state.aucprice>1000000000000000000)
      {
        let p = this.state.aucprice/1000000000000000000;
        this.setState({aucprice:p})
      }
    }
      
      catch(e){
        alert('error')
      }
    if(this.state.aucing)
    {
      if(this.state.te4==false)
        this.setState({te4:true})
      else
        this.setState({te4:false})
    }
    if(this.state.aucing==false)
    {
      alert('竞标已结束')
      if(this.state.te4==true)
      this.setState({te4:false})

    }
      
    
  }
  claim = async() =>{
    try{
      let account = await web3.eth.getAccounts()
      await lotteryInstance.methods.doclaim().send({from:account[0],gas:3000000});
      alert('领取成功')
    }
    catch(e)
    {
      alert('领取失败')
    }
  }
  path = async() =>{
    if(this.state.te5==false)
        this.setState({te5:true})
      else
        this.setState({te5:false})
  }
  constructor() {
    super()
    this.state = {
        te1:false,
        te2:false,
        te21:false,
        te3:false,
        te4:false,
        te5:false,
        hash:'',
        sellhash:'',
        sellprice:0,
        selltime:0,
        aucing:false,
        auchash:'',
        aucprice:0,
        auctime:0,
        bid:0,
        search:'',
        nftnum:0
    }
}
 
  render(){
    return(
      <div style={{ paddingLeft: '40%', paddingTop: '2%' }}>
        <Card>
          <img 
          src ={logo}/>
          <br/>
          <Button
          onClick = {this.test}
          className = 'but1'
          >
            社会主义伟大尝试
          </Button>


          <br/>
          <Button
          onClick = {this.maker}
          className = 'but2'
          >
            铸币
          </Button>


          <br/>
          <Button
          onClick = {this.shownft}
          className = 'but3'
          >
            我有哪些NFT
          </Button>


          <br/>
          <Button
          onClick = {this.view}
          className = 'but4'
          >
            NFT代币预览
          </Button>


          <br/>
          <Button
          onClick = {this.sell}
          className = 'but4'
          >
            出售NFT
          </Button>


          <br/>
          <Button
          onClick = {this.buy}
          className = 'but4'
          >
            参与竞拍
          </Button>


          <br/>
          <Button
          onClick = {this.claim}
          className = 'but4'
          >
            领取
          </Button>


          <br/>
          <Button
          onClick = {this.path}
          className = 'but4'
          >
            查询记录
          </Button>


          {
            this.state.te1&&<br/>
          }
          {this.state.te1&&<input
        type="file"
        name='file1'
        onChange={this.onChange}
      />}


      {
            this.state.te2&&<br/>
          }
          {this.state.te2&&<input
        type="text"
        name='file2'
        onChange={this.onChange2}
      />}


      {this.state.te2&&<Button
          onClick = {this.onClick2}
          className = 'but4'
          >
            预览
          </Button>
          }


          {
            this.state.te21&&<br/>
          }
          {
            this.state.te21&&<img src = {'http://localhost:8080/ipfs/'+this.state.hash}/>
          }


          {
            this.state.te3&&<br/>
          }
          {this.state.te3&&<input
        type="text"
        onChange={this.onChange3_1}
      />}


      {
            this.state.te3&&<br/>
          }
          {this.state.te3&&<input
        type="number"
        onChange={this.onChange3_2}
      />}

{
            this.state.te3&&<br/>
          }
          {this.state.te3&&<input
        type="number"
        onChange={this.onChange3_3}
      />}


      {this.state.te3&&<Button
          onClick = {this.onClick3}
          className = 'but4'
          >
            确认出售
          </Button>}

          {
            this.state.te4&&<br/>
          } 

      {this.state.te4&&this.state.aucing&&
      <Card>
        <Card>
          当前拍卖商品hash：{this.state.auchash}
          </Card>

          <br/>
          <Card>
          当前拍卖商品价格：{this.state.aucprice}
          </Card>

          <br/>
          <Card>
          当前拍卖剩余时间：{this.state.auctime}
          </Card>

          <br/>
          <Card>
          商品预览：
          <br/>
          <img src = {'http://localhost:8080/ipfs/'+this.state.auchash}/>
          </Card>

        <input
        type="number"
        onChange={this.onChange4}
      />


      <Button
      onClick = {this.onClick4}
      className = 'but4'
      >
        竞标
      </Button>
      </Card>
      }

      {
            this.state.te5&&<br/>
          }
          {this.state.te5&&<input
        type="text"
        name='file2'
        onChange={this.onChange5}
      />}


      {this.state.te5&&<Button
          onClick = {this.onClick5}
          className = 'but4'
          >
            查询
          </Button>
          }
        </Card>
      </div>
      
    );
  }
}

export default App;
