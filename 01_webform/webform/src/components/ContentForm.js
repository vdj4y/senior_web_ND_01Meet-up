import React, { Component } from 'react';
import Navbar from "./Navbar";
import FormGroup from "./FormGroup";
import {Validation} from "../helper/helper"
const $ = require("jquery");


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        guests: [{firstName: "", lastName:""}]
      }
  }
  addGuest(e){
    e.preventDefault();
    var newGuests = this.state.guests;
    newGuests.push({firstName: "", lastName: ""});
    this.setState({guests: newGuests})
  }
  removeGuest(idx){
    var newGuests = this.state.guests;
    if(newGuests.length <= 1){
      return;
    }
    newGuests.splice(idx, 1);
    this.setState({guests: newGuests})
  }
  validateRequired(e){
    e.preventDefault();
    validateGuestList();
    const arr = ["eventName", "eventHost", "eventLocation"];
    Validation.validateRequired($, e, arr, 'registration');
  }
  validateEmpty(e){
    Validation.validateEmpty($, e);    
  }

   render() {
      const props = this.props;
      return(
          <div>
              <Navbar />
              <div className="container">
                <form name="registration" method="POST" action="/" 
                      style={{maxWidth: "400px", margin: "0 auto"}}>
                <div className="">
                      <FormGroup label="Event Name" id="eventName"
                                 type="text"
                                 required={true} 
                                 offFocus={this.validateEmpty.bind(this)}
                                 autofocus={true}/>
                      <EventType />

                      <FormGroup label="Event Host" id="eventHost"
                                 autocomplete="name"
                                 offFocus={this.validateEmpty.bind(this)}
                                 required={true} />
                      <FormGroup label="Event Location" id="eventLocation"
                                 autocomplete="address"
                                 offFocus={this.validateEmpty.bind(this)}
                                 required={true} />
                      <EventDate label="startDate" 
                                 required={true}/>
                      <GuestList guests={this.state.guests}
                                 validate={this.validateEmpty.bind(this)}
                                 addGuest={this.addGuest.bind(this)}
                                 remove={(idx) => this.removeGuest.call(this, idx)}
                                 />
                      <Message />
                  <div className="form-actions">               
                    <input type="submit" className="btn btn-primary" 
                           onClick={this.validateRequired.bind(this)}/>
                  </div>
                </div>
                </form>
              </div>
          </div>
      );
    }
}

const EventDate = (props) => {
  return(
      <div>

      </div>
  )
}


const EventType = (props) => {
  //props.onchange: function()
  return(
    <div className="form-group">
        <label htmlFor="eventType">Event Type</label>
        {/*<input name="eventType" className="form-control" id="eventType" list="eventType" placeholder="Event Type"/> */}
        <select name="eventType" className="selectpicker form-control" data-live-search="true" value="Party">
            <option value="Party">Party</option>
            <option value="Meeting">Meeting</option>
            <option value="Conference Talk">Conference Talk</option>
            <option value="Sports Game">Sports Game</option>
            <option value="Others">Others</option>
        </select>
    </div>
  )
}

const Message = (props) => (
  <div className="form-group">
    <label htmlFor="message">Message (optional): </label>
    <textarea className="form-control" name="message" id="message" placeholder="messages"></textarea>
  </div>
)

const FirstAndLast = (props) => {
  function validate(e){
    const value = e.target.value;
    const id = "#"+e.target.id;
    if(value === ""){
      $(id).addClass("error")
      $(id).attr("placeholder", "Please fill the form")
    } else{
      $(id).removeClass("error");
    }
  }
  //props.validate: function()
  //props.index: number
  //props.remove: function()
  return(
    <li className="row" style={{maxWidth: "700px", listStyleType: "none"}}>
       <FormGroup placeholder="first name"
              className="form-control" id={"guestFirstName"+props.index }
              style={{width: "45%", display: "inline-block"}}
              helpStyle={{display: "none"}}
              required={true}
              autoComplete="fname"
              offFocus={ (e) => validate(e) }/>
        <FormGroup placeholder="last name"
              className="form-control" id={"guestLastName"+props.index }
              style={{width: "45%", display: "inline-block"}}
              helpStyle={{display: "none"}}
              required={true}
              autoComplete="lname"
              offFocus={ (e) => validate(e) }/>   
         <button className="btn btn-danger" 
                  style={{padding: "3px 6px", marginLeft: "10px", display: "inline-block"}}
                  onClick={ (e) => {
                    e.preventDefault();
                    props.remove(props.index)
                  }}
                  >X</button> 
    </li>
  )
}

const GuestList = (props) => {
  //props.guests: Array
  //props.validate: function()
  //props.addGuest: function()
  //props.remove: function()
  const guests = (props.guests.length <= 0) ? "" : 
                  props.guests.map((g,index) => (
                    <FirstAndLast key={index} index={index}
                                  validate={props.validate} 
                                  remove={props.remove}
                                  />
                  ))

  return(
    <div className="form-group">
      <label>Guest List</label>
      <div className="btn-group">
        <button className="btn btn-primary" 
                style={{padding: "5px 8px", marginLeft: "10px"}}
                onClick={ props.addGuest }
                >+</button>
      </div>
      <span id={"help-guestList"} className="help-block" style={{display: 'none', color:"red"}}>
        provide at least one guest
      </span>
      <ol id="guestListParent" style={{paddingTop: 10}}>
        {guests}
      </ol>
    </div>
  )

}

// ----------------
//     HELPER
// ----------------


function validateGuestList(){
  var firstName = $("#guestFirstName0")
  if( $("#guestFirstName0")[0].value === "" || $("#guestLastName0")[0].value === "" ){
      $("#help-guestList").show()
    } else {
      $("#help-guestList").hide()
    }
}

export default App;