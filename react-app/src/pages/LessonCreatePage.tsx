import React, { useState } from 'react'
import './LessonCreatePage.scss'
import { useParams } from 'react-router-dom'
import './CourseCreatePage.scss'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik'
import { TextField, Select } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, MenuItem, FormControl, 
    InputLabel, Button, Box, Stepper, Step, StepLabel, CircularProgress} from '@material-ui/core'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { push } from 'connected-react-router';
import {useDropzone} from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: theme.spacing(1),
      minWidth: '50%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));



const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time))

const LessonCreatePage = () => {
    const param: { courseName: string} = useParams();
    const { courseName } = param;

    // const getLessonInfoByCourse = async (courseName: string) => {
    //     //console.log("user: ", userEmail);
    //     let queryRoute: string = "/lesson/summary/";
    //     const fetchRes = await fetch(
    //       `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${courseName}`
    //     );
    
    //     if (fetchRes.status === 500) throw new Error("伺服器發生問題");
    //     const result = await fetchRes.json();
    //     console.log(result)

    //     result.lessons.sort((a: ILesson, b: ILesson) => a.lesson_id - b.lesson_id);
    //     setLessons(result.lessons);
    //   };

    const dispatch = useDispatch();
    const classes = useStyles();
    const userEmail = useSelector((state: IRootState) => state.auth.email);
    
    const submitHandler = async (formData: FormData) => {
        const queryRoute = '/lesson/creation'
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${queryRoute}/${courseName}`, {
            method: 'POST',
            body: formData
        })
    }

    const firstValidationSchema = Yup.object().shape({
        lessonName: Yup.string()
        .min(4, '不如寫多啲')
        .max(20, '不如寫少啲')
        .required('必須填寫'),
        lessonIsTrial: Yup.string()
        .required('必須填寫')
    })

    const secondValidationSchema = Yup.object().shape({
        lessonDescription: Yup.string()
        .min(10, '不如寫多啲')
        .max(100, '不如寫少啲')
        .required('必須填寫')
    })

    const thirdValidationSchema = Yup.object().shape({
        lessonVideoUrl: Yup.string()
        .matches(/https/, '請提供完整網址')
        .required('必須填寫')
    })


    return (
        <div>
            <div className="course-creation-header">
                <Box paddingTop={2}>
                    <Button href="/instructor" variant="contained" color="secondary" size="large">Exit</Button>
                </Box>
            </div>

            <Card>
                <CardContent>
                    <FormikStepper 
                        initialValues={{
                            lessonName: '',
                            lessonDescription: '',
                            lessonIsTrial: '',
                            lessonVideoUrl: '',
                            files: [],
                            lessonQuestion: [],                 
                        }} 
                        onSubmit={async (values) => {

                            await sleep(1000)
                            const formData = new FormData()
                            formData.append('lessonName', values.lessonName)
                            formData.append('lessonDescription', values.lessonDescription)
                            formData.append('lessonIsTrial', values.lessonIsTrial)
                            formData.append('lessonVideoUrl', values.lessonVideoUrl)

                            if (values.files.length) {
                                for (let i = 0; i < values.files.length; i++) {
                                    formData.append('files', values.files[i])
                                }
                            }

                            submitHandler(formData)
                        }}
                    >

                            <FormikStep label="課堂名稱及類別" validationSchema={firstValidationSchema}>
                                <Box paddingBottom={2}>
                                    <Field 
                                        name="lessonName" 
                                        component={TextField} 
                                        placeholder="e.g. 十二篇範文點溫好？" 
                                        label="課堂名稱" 
                                        className={classes.formControl}
                                    />
                                </Box>
                                <Box paddingBottom={2}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="lessonIsTrial">允許試堂</InputLabel>
                                        <Field
                                            fullWidth
                                            name="lessonIsTrial" 
                                            component={Select} 
                                            inputProps={{
                                                id: 'lessonIsTrial',
                                            }}
                                        >
                                            <MenuItem value={'true'}>是</MenuItem>
                                            <MenuItem value={'false'}>否</MenuItem>
                                        </Field>
                                    </FormControl>
                                </Box>
                            </FormikStep>

                            <FormikStep label="課堂內容" validationSchema={secondValidationSchema}>
                                <Box paddingBottom={2}>
                                    <Field 
                                        className={classes.formControl}
                                        name="lessonDescription" 
                                        component={TextField} 
                                        placeholder="e.g. 分享如何可以由學校pre我lv.2到最後攞5*" 
                                        label="課堂內容" 
                                    />
                                </Box>

                            </FormikStep>

                            <FormikStep label="課堂影片及教材" validationSchema={thirdValidationSchema}>
                                <Box paddingBottom={2}>
                                    <Field 
                                        className={classes.formControl}
                                        name="lessonVideoUrl" 
                                        component={TextField} 
                                        placeholder="https://youtu.be/6A_HQhYwlrI" 
                                        label="課堂影片及材料" 
                                    />
                                </Box>
                                
                            </FormikStep>

                    </FormikStepper>
                </CardContent>
            </Card>
        </div>
    )

}

export default LessonCreatePage

export interface FormikStepProps 
extends Pick<FormikConfig<FormikValues>, "children" | 'validationSchema'> {
    label: string;
}

export function FormikStep({ children }: FormikStepProps) {
    return <div>{children}</div>
}

export function FormikStepper({children, ...props}: FormikConfig<FormikValues>) {
    const dispatch = useDispatch();
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;
    const [completed, setCompleted] = useState(false);
    const classes = useStyles();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
    const files = acceptedFiles.map(file => (
        <li key={file.name}>
        {file.name}
        </li>
    ));

    function isLastStep() {
        return step === childrenArray.length - 1
    }

    function showFile(files: any[]) {
        if (!files.length) {
            return null;
        }

        return (
            <div>
                <div>Dropped files:</div>
                <ul>
                    {
                        files.map((file, i) => 
                            <li key={i}>
                                <div>{file.name}</div>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }

    return (
        <Formik 
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
            if (isLastStep()){
                await props.onSubmit(values, helpers)
                setCompleted(true);
                helpers.resetForm();
                setStep(0);
                await sleep(2000)
                dispatch(push('/instructor'))
            } else {
                setStep(step => step + 1)
            }}}
        >
        
        {({ isSubmitting, setFieldValue, values }) => (
            <Form autoComplete="off">
                {/* Stepper for each step of the form */}
                <Stepper className={classes.formControl} alternativeLabel activeStep={step}>
                    {childrenArray.map((child, index) => (
                    <Step key={child.props.label} completed={step > index || completed}>
                        <StepLabel>{child.props.label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                
                {/* current step and related form input */}
                {!completed && currentChild}

                {/* file upload area */}
                {step === 2 && 
                    <section className="container">
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <span>拖曳或選擇檔案上傳，如需上傳多個檔案，請一次選擇多個檔案</span>
                    </div>
                    <aside>
                        <h4 style={{marginTop: '10px'}}>Files</h4>
                        <ul>{files}</ul>
                    </aside>
                    </section>
                }

                {/* back button */}
                {step > 0 ? (
                    <Button disabled={isSubmitting} onClick={() => setStep(step => step - 1)}>
                        Back
                    </Button>
                ) : null}

                {/* Next if not the last step, else become submit button */}
                {!completed && <Button 
                    startIcon={isSubmitting ? <CircularProgress size="1rem"/> : null} 
                    disabled={isSubmitting} 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    onClick={() => {
                        setFieldValue('files', acceptedFiles)
                        console.log(values)
                    }}
                >
                    {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
                </Button>}

                {completed && <div>成功建立課堂<i className="fas fa-check-circle"></i></div>}
            </Form>
        )}
            

        </Formik>
    )
}