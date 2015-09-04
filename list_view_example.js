Customers = new Mongo.Collection("customers");


Customers.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  phoneNumber: {
    type: String,
    label: "Phone Number",
    optional : true,
  },
  address: {
    type: String,
    label: "Address",
    optional : true
  }
}));



if (Meteor.isClient) {
  
  Template.listViewExample.helpers({
     data : function(){
        return Customers;
      }
  });

  Template.listViewExample.events({
    'click #addCustomer' : function(event){
      Modal.show('addCustomerModal');
    }
  });

  AutoForm.hooks({
    insertCustomerModalForm : {
      onSuccess : function (formType, result) {
        Modal.hide('addCustomerModal');
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    ListView.publish(Customers);
  });
}
