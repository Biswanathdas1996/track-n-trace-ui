import React from "react"
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { TextField } from "formik-material-ui"



const initialValues = {
  name: "",
  email: "",
  phone: "",
  region: "",
  regioncode: "",
 
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  region: Yup.string().required("Required"),
  regioncode: Yup.string().required("Required"),
   
    
})



 const DistributerForm = () => {
 
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item md={6}>
        <Card >
         
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={1} justify="center">
                    
                      <Grid item xs={12} sm={12} md={12}>
                        <Field
                          label="Name"
                          variant="outlined"
                          fullWidth
                          name="name"
                          value={values.name}
                          component={TextField}
                        />
                        </Grid>
                         <Grid item xs={12} sm={12} md={12}>
                         <Field
                          label="Email"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={values.email}
                          component={TextField}
                        />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                         <Field
                          label="Phone No."
                          variant="outlined"
                          fullWidth
                          name="phone"
                          value={values.phone}
                          component={TextField}
                        />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                         <Field
                          label="Region"
                          variant="outlined"
                          fullWidth
                          name="region"
                          value={values.region}
                          component={TextField}
                        />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                         <Field
                          label="Region Code"
                          variant="outlined"
                          fullWidth
                          name="regioncode"
                          value={values.regioncode}
                          component={TextField}
                        />
                        </Grid>
                        
                         <Grid item xs={12} sm={12} md={12}>
                        <CardActions>
		                    <Button
		                      
		                      variant="contained"
		                      color="primary"
		                      type="Submit"
		                      >
		                      
		                      Add New Distributer 
		                    </Button>
                  </CardActions>
                      </Grid>
                    </Grid>
                  </CardContent>
                  
                </Form>
              )
            }}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  )
}
export default DistributerForm
