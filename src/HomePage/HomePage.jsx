import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import './App.css';
import csvDownload from 'json-to-csv-export'
import ReactDOM from "react-dom";
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
import Popup from "reactjs-popup";


class HomePage extends React.Component {
	
 constructor(props) {
      super(props)
      this.state = {
		        device_id : null, 
      timestamp : null,
      data1 : null,
      options1 : [],
      options2 : [],

        students: [
            { Device: 2, Time_stamp: 'Wasif', Result: 21, Download_CSV: 'wasif@email.com', Date_Time : '20-04-2020' , Device_Deatils: 'Nil'},
			
         ]
      }
   }
  
  componentDidMount() {
	  

     fetch('https://e01jb75ql8.execute-api.us-east-2.amazonaws.com/Test?device_id='+this.state.device_id+'&timestamp='+this.state.timestamp,{method: 'GET',headers: {
      "x-api-key": "GWxQN3E0pw67TtTnRY2KQ5EFYBNZeday27p3raxr",
	  
    }}) .then((response) => {

      return response.json();
  },function(err){
    console.log(err);
  }).then((data) =>{
    console.log(data); 
    const temp_data = JSON.parse(data.body).done.Items
    const data1 = []
    let i
    for(i in temp_data)
    {
      console.log(temp_data[i])
      data1.push(temp_data[i]) 
    }
    console.log(data1)
    this.setState({data1:data1})
    console.log(this.state);
    if(data1!=null)
    {
      let i
      for(i in data1)
      {
      let options1 = this.state.options1
      let options2 = this.state.options2
      options1.push(data1[i].Device_ID)
      options2.push(data1[i].timestamp)
       this.setState({options1:options1})
       this.setState({options2:options2})
    
      }
    }
    if(this.state.options1.length>0)
    {
      console.log(this.state)
    }

    
  });

  }


   renderTableHeader() {
      let header = Object.keys(this.state.students[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>

      })
   }
 popup (s) {
 <Popup trigger={<button>Trigger</button>} position="top left">
    {close => (
      <div>
        Content here
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup> }

 renderTableData() {
		let i
 		  let table;
  let buffer =[]

			for(i in this.state.data1)
			{
	            table = <tr>
				
                <td>{this.state.data1[i].Device_ID}</td>
               <td>{this.state.data1[i].timestamp}</td>
               <td>{<a href="#"  onClick={(event => this.popup(this.state.data1[i].Device_ID))}> {'Result'}
               </a>}</td>
               <td>{<a href="#"  onClick={(event => this.DeviceIdClickHandler(i))}> {this.state.data1[i].Device_ID}>
               csv file
               </a>}</td>
			   	<td>{<a href={'test'}> {'20-03-2020'} </a>}</td>
		       <td>{this.state.data1[i].Device_ID}</td>

               </tr>
               buffer.push(table)
		   
				
			} 
        
		return (
	     <div>

      {buffer}
			   
      </div>

	 )
      
	  
   }  
  DeviceIdClickHandler (i){
  event.preventDefault();
      console.log(event.target.value)

      let device_id = this.state.data1[i].Device_ID
      let timestamp = this.state.data1[i].timestamp
      let enviro_data = this.state.data1[i]["enviro data"].Result

      csvDownload(enviro_data)
      
};
      render() {
	   
	
      return (
         <div>	       
			   <p>
            <Link to="/login">Logout</Link>
                </p>
            <h1 id='title'>arkray</h1>
            <table id='students'>


                  <tr><td>{this.renderTableHeader()}</td></tr>
                  <tr><td>{this.renderTableData()}</td></tr>

				  
            </table>
			 
         </div>
      )
   } 


}



function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}


const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };