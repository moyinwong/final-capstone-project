import React, { useState, Children } from 'react'
import './CourseCreatePage.scss'
// import { Button } from 'react-bootstrap'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik'
import { TextField, Select, SimpleFileUpload } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, MenuItem, FormControl, InputLabel, Button } from '@material-ui/core'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const CourseCreatePage = () => {
    const classes = useStyles();

    const firstValidationSchema = Yup.object().shape({
        courseTitle: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    })

    const secondValidationSchema = Yup.object().shape({
        courseCategory: Yup.string().required('Required')
    })

    const thirdValidationSchema = Yup.object().shape({
        coursePrice: Yup.number()
        .min(0, 'Min price is 0')
        .required('Required'),
        courseDescription: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
        coursePrerequisite: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    })

    const fourthValidationSchema = Yup.object().shape({
        file: Yup.mixed().required('A file is required')
    })
  
    return (
        <div>
            <div className="course-creation-header">
                {/* <img className="website-logo" src={require("../logo.png")} /> */}
                <Button href="/instructor" variant="contained" color="secondary" size="large">Exit</Button>
            </div>

            <Card>
                <CardContent>
                    <FormikStepper 
                        initialValues={{
                            courseTitle: '',
                            courseCategory: '',
                            coursePrice: '',
                            courseDescription: '',
                            coursePrerequisite: '',
                            file: null,
                            
                        }} 
                        onSubmit={() => {}}
                    >

                            <FormikStep validationSchema={firstValidationSchema}>
                                <Field name="courseTitle" component={TextField} placeholder="e.g. 中文5**攻略" label="課程名稱" />
                            </FormikStep>
                            <FormikStep validationSchema={secondValidationSchema}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="courseCategory">課程類別</InputLabel>
                                    <Field 
                                        name="courseCategory" 
                                        component={Select} 
                                        inputProps={{
                                            id: 'courseCategory',
                                        }}
                                    >
                                        <MenuItem value={1}>中文</MenuItem>
                                        <MenuItem value={2}>英文</MenuItem>
                                        <MenuItem value={3}>數學</MenuItem>
                                        <MenuItem value={4}>通識</MenuItem>
                                        <MenuItem value={5}>物理</MenuItem>
                                        <MenuItem value={6}>化學</MenuItem>
                                        <MenuItem value={7}>生物</MenuItem>
                                        <MenuItem value={8}>經濟</MenuItem>
                                        <MenuItem value={9}>歷史</MenuItem>
                                        <MenuItem value={10}>企會財</MenuItem>
                                        <MenuItem value={11}>ICT</MenuItem>
                                        <MenuItem value={12}>視覺藝術</MenuItem>
                                        <MenuItem value={13}>M1</MenuItem>
                                        <MenuItem value={14}>M2</MenuItem>
                                        <MenuItem value={15}>其他</MenuItem>
                                    </Field>
                                </FormControl>
                            </FormikStep>
                            <FormikStep validationSchema={thirdValidationSchema}>
                                <Field name="coursePrice" type="number" component={TextField} placeholder="100" label="課程價錢" />
                                <Field name="courseDescription" component={TextField} placeholder="e.g. 帶你中文拎5**！" label="課程大綱" />
                                <Field name="coursePrerequisite" component={TextField} placeholder="e.g. 中六程度中文" label="課程要求" />
                            </FormikStep>
                            {/* <input id="file" name="file" type="file" onChange={(event) => {
                                let target = event.currentTarget as HTMLInputElement;
                                let files = target.files

                                if(!files || !files[0]) {
                                    return
                                }

                                props.setFieldValue("file", files[0]);
        
                            }} /> */}
                            <div>
                                <Field component={SimpleFileUpload} name="file" label="上戴課程封面" />
                            </div>




                    </FormikStepper>
                </CardContent>
            </Card>
        </div>
    )
}

export default CourseCreatePage

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, "children" | 'validationSchema'> {}

export function FormikStep({ children }: FormikStepProps) {
    return <div>{children}</div>
}

export function FormikStepper({children, ...props}: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children) 
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;
    console.log(currentChild)

    function isLastStep() {
        return step === childrenArray.length - 1
    }

    return (
        <Formik 
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
            if (isLastStep()){
                await props.onSubmit(values, helpers)
            } else {
                setStep(step => step + 1)
            }}}
        >


        <Form autoComplete="off">
            {currentChild}
            {step > 0 ? <Button onClick={() => {
                setStep(step => step - 1)
                console.log(step)
                }}>Back</Button> : null}
            <Button type="submit" onClick={() => {
                console.log(step)
                }}>{isLastStep() ? 'Submit' : 'Next'}</Button>
        </Form>


        </Formik>
    )
}