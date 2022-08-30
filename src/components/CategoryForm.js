import React from "react"
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl,
} from '@mui/material';

import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { TextField } from "formik-material-ui"




const initialValues = {
  categoryname: "",
  
}




const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/


const validationSchema = Yup.object().shape({
  categoryname: Yup.string().required("Required"),
  
    
})



 const CategoryForm = () => {
 
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item md={6}>
        <Card >
         <CardHeader title="">Add New Category</CardHeader>
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
                          label="Category Name"
                          variant="outlined"
                          fullWidth
                          name="categoryname"
                          value={values.categoryname}
                          component={TextField}
                        />
                        <CardActions>
		                    <Button
		                      disabled={!dirty || !isValid}
		                      variant="contained"
		                      color="primary"
		                      type="Submit"
		                      >
		                      
		                      Add New Category
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
export default CategoryForm
