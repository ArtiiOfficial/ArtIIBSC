import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';

//import avatar from "assets/img/faces/marc.jpg";
import isEmpty from '../../lib/isEmpty';

import {  getemailTemplate,updateEmailTemplate } from '../../actions/users';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

// toaster config
toast.configure();
let toasterOption = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}


const initialFormValue = {
  'identifier': "",
  'subject': "",
  'content': "",
}

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [userdet, setUser] = useState();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});

  const { Id } = useParams();
   // //console.lo(userId,"asdfdsfdsfdsf");


  // function
  const onChange = (e) => {
    e.preventDefault();
    //console.lo(e.target); 
    const { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
    //console.lo(formValue);
    //setValidateError(formData)
  }
  const onchangeeditor = (e) => {
    let formData = { ...formValue, ...{ ["content"]: e } }
    setFormValue(formData)
    //console.lo(formValue);
  }

    const {
      identifier,
      subject,
      content,
    } = formValue

  const handleFormSubmit = async (e) => {
    ////console.lo("saran");
    e.preventDefault();
    //console.lo(formValue);

    let reqData = {
      identifier,
      subject,
      content,
      Id
    }
    //console.lo(reqData,"ddd");
    let { error, result} = await updateEmailTemplate(reqData);
    //console.lo(error);
    if (isEmpty(error)) {
      toast.success(result, toasterOption); 
      history.push('/emailTemplateList');
    } else {
      setValidateError(error);
    }
  }

  const getEmailTemplateData = async () => {

    
    var test = await getemailTemplate(Id);
    //console.lo("emailTemplate",test);

    let formdata = {};
    formdata['identifier'] = test.userValue.identifier;
    formdata['subject'] = test.userValue.subject;
    formdata['content'] = test.userValue.content;
    setFormValue(formdata)
   
  }

  useEffect(() => {
    //logout(history)
    getEmailTemplateData();
  }, [])

 const back = async () => {
     window.location.href='/fteqdsfqrasdw/emailTemplateList';
    }
  return (
    <div>
     <button className="btn btn-success mr-3" onClick={() => back()}>Back</button>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>EmailTemplate update</h4>
                <p className={classes.cardCategoryWhite}>Update your pages</p>
              </CardHeader>
              <CardBody>
                <GridContainer>                 
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Identifier"
                        onChange={onChange}
                        id="identifier"
                        value={identifier || ''}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                      {
                          validateError.identifier && <span className={classes.textDanger}>{validateError.identifier}</span>
                      }
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Subject"
                        onChange={onChange}
                        id="subject"
                        value={subject || ''}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                      {
                          validateError.subject && <span className={classes.textDanger}>{validateError.subject}</span>
                      }
                    </GridItem>
                    
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <p className={classes.cardCategoryWhite}>Create a new user</p>
                    <Editor apiKey='5vk89nvvi2zckrb2lp2ctyyolewhq1v3pzdiwb7at68h40a5'
                      initialValue="<p>This is the initial content of the editor</p>"
                      value={content} 
                      onEditorChange={onchangeeditor}
                      id="content"
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                          'undo redo code | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help'
                      }}
                    />
                   
                    {
                      validateError.content && <span className={classes.textDanger}>{validateError.content}</span>
                    }
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">Update</Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>       
      </GridContainer>
    </div>
  );
}
