document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views and the form submit function
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('form').onsubmit = send_email;
  // By default, load the inbox and the function to avoid empty forms
  load_mailbox('inbox');
  no_empty_compose();
});

function no_empty_compose(){
  const submit = document.querySelector('#send');
  const to = document.querySelector('#compose-recipients');
  const subject = document.querySelector('#compose-subject');
  const body = document.querySelector('#compose-body');
  submit.disabled = true;
  to.onkeyup = () => {
    if(to.value.length > 0 && subject.value.length > 0 && body.value.length > 0){
      submit.disabled = false;
    }
    else {
      submit.disabled = true;
    }
  }
  subject.onkeyup = () => {
    if(to.value.length > 0 && subject.value.length > 0 && body.value.length > 0){
      submit.disabled = false;
    }
    else {
      submit.disabled = true;
    }
  }
  body.onkeyup = () => {
    if(to.value.length > 0 && subject.value.length > 0 && body.value.length > 0){
      submit.disabled = false;
    }
    else {
      submit.disabled = true;
    }
  }
}

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function reply_email(recipient, subject, timestamp, body){
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  document.querySelector('#compose-recipients').value = recipient;
  console.log(subject.substring(0,2));
  if(subject.substring(0,3)=="Re:"){
    document.querySelector('#compose-subject').value = subject;
  }
  else {
    document.querySelector('#compose-subject').value = 'Re: '+ subject;
  }
  document.querySelector('#compose-body').value = 'On '+timestamp + ' ' + recipient + ' wrote: ' +body;
}

function send_email(){  
  const subject_field = document.querySelector('#compose-subject').value;
  const recipients_field = document.querySelector('#compose-recipients').value;
  const body_field = document.querySelector('#compose-body').value;
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients_field,
        subject: subject_field,
        body: body_field
    })
  })
  .then(response => response.json())
  .then(result => {
    // Print result
    console.log(result);
    // alert('bombetaaaa!');
    //const em = document.createElement('div');
    if(result.error){
      //em.innerHTML = result.error;
      //em.className = 'alert alert-danger';
      console.log("error if");
      alert(result.error);
    }
    else {
      //em.innerHTML = 'E-mail sent successfully';
      //em.className = 'alert alert-success';
      console.log("sent if");
      alert("E-mail sent!");
    }
    //document.querySelector('#emails-view').append(em);
  })
  .catch((error => {
    console.log('Error:', error);
    document.querySelector('#message-view').innerHTML = error;
  }));
  //document.getElementById("message").innerHTML = erro;
  setTimeout(function(){load_mailbox('sent');},100);
  return false;
  
}

function load_mailbox(mailbox) {  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`; 
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(data => {
    data.forEach(data => add_mails(data, mailbox));
    //data.forEach(add_mails);
  })
  .catch((error => {
    console.log('Error:', error);
  }));
}

function add_mails(email, mailbox){
  const em = document.createElement('div');
  em.className = 'emails';
  full_text = email['id'] + " From: " + email["sender"] + "   " + email["subject"] + "   " + email["timestamp"];
  
  em.innerHTML = full_text;// + email["read"] + email["archived"];
  if (email["read"]) em.style.background = "gray";
  em.addEventListener('click', () => load_mail(email["id"], mailbox));
  document.querySelector('#emails-view').append(em);
}

function load_mail(id, mailbox){
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  
  
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => add_mail(email, mailbox))
  .catch((error => {
    console.log('Error:', error);
  }));  
}

function add_mail(email, mailbox){
  //const em = document.querySelector('#emails-view');
  full_text = "<p class='inbox-text'><b> From: </b>" + email["sender"] + "<br><b> To: </b>"+ email["recipients"] +
  "<br><b> Subject: </b>" + email["subject"] + "<br><b> Timestamp: </b>" + email["timestamp"]
  + "</p><br>    <button id='reply' class='btn btn-sm btn-outline-primary m-1 reply-btn' id='inbox'>Reply</button><br><hr>"
   + email["body"];
  //if(email[""])
  //em.innerHTM
  //L = full_text; 
  //id = email["id"];  
  //document.querySelector('#reply').addEventListener('click', () => {
  //  console.log('Reply button clicked');
  //});
  //document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  update_read_status(true,email['id']);
  console.log(email["id"]); 
  console.log(full_text); 
  console.log(email);
  document.querySelector('#emails-view').innerHTML = full_text;
  if(mailbox =="inbox") document.querySelector('#emails-view').innerHTML += "<hr><br><button id='archive' class='btn btn-sm btn-outline-primary m-1' id='inbox'>Archive</button>";
  if(mailbox == "archive") document.querySelector('#emails-view').innerHTML += "<hr><br><button id='archive' class='btn btn-sm btn-outline-primary m-1' id='inbox'>Unarchive</button>";
  document.querySelector('#reply').addEventListener('click', () => reply_email(email["sender"], email["subject"], email["timestamp"], email["body"]));
  document.querySelector('#archive').addEventListener('click',() => update_archived_status(!email['archived'],email["id"]));
}

function update_read_status(s, id){
  fetch(`/emails/${id}`,{
    method: 'PUT',
    body: JSON.stringify({
      read: s
    })
  })
  .catch((error => {
    console.log('Error:', error);
  }));
}

function update_archived_status(s, id){
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      archived: s
    })
  })
  .catch((error => {
    console.log('Error: ', error);
  }));
  localStorage.clear();
  setTimeout(function(){load_mailbox('inbox');},100);
  return false;
}




